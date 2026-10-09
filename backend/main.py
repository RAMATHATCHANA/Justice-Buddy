import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from twilio.rest import Client
import atexit

from backend.models import CaseTracker, init_db, get_db
from backend.faq_db import init_faq_db, search_faq
from backend.utils import (
    mock_ecourts_api, 
    detect_language, 
    translate_text, 
    classify_intent, 
    get_intent_response
)

app = FastAPI(title="JusticeBuddy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_WHATSAPP_FROM = os.getenv("TWILIO_WHATSAPP_FROM", "whatsapp:+14155238886")

twilio_client = None
if TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN:
    twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

class TrackCaseRequest(BaseModel):
    cnr_number: str
    state: str
    district: str
    court_name: str
    filing_year: str
    phone_number: str

class ChatRequest(BaseModel):
    message: str

def send_whatsapp_notification(phone_number, message):
    """Send WhatsApp notification via Twilio"""
    if not twilio_client:
        print(f"[MOCK] WhatsApp to {phone_number}: {message}")
        return {"status": "mock", "message": "Twilio not configured"}
    
    try:
        to_number = phone_number if phone_number.startswith("whatsapp:") else f"whatsapp:{phone_number}"
        
        msg = twilio_client.messages.create(
            from_=TWILIO_WHATSAPP_FROM,
            body=message,
            to=to_number
        )
        return {"status": "sent", "sid": msg.sid}
    except Exception as e:
        print(f"WhatsApp error: {e}")
        return {"status": "error", "error": str(e)}

def check_case_updates():
    """Background job to check case status updates"""
    print(f"[{datetime.now()}] Running case status check...")
    
    from backend.models import SessionLocal
    db = SessionLocal()
    
    try:
        cases = db.query(CaseTracker).all()
        
        for case in cases:
            new_data = mock_ecourts_api(
                case.cnr_number,
                case.state,
                case.district,
                case.court_name,
                case.filing_year
            )
            
            new_status = new_data["status"]
            
            if new_status != case.current_status:
                print(f"Status changed for {case.cnr_number}: {case.current_status} -> {new_status}")
                
                old_status = case.current_status
                case.current_status = new_status
                case.last_checked = datetime.utcnow()
                case.notification_sent = False
                
                # Use ASCII-only text to avoid console encoding issues on some Windows setups.
                message = f"[ALERT] JusticeBuddy Alert\n\nYour case {case.cnr_number} status has changed:\n\nOld Status: {old_status}\nNew Status: {new_status}\n\nCourt: {case.court_name}, {case.district}\n\nVisit JusticeBuddy for details."
                
                result = send_whatsapp_notification(case.phone_number, message)
                
                if result["status"] in ["sent", "mock"]:
                    case.notification_sent = True
                
                db.commit()
            else:
                case.last_checked = datetime.utcnow()
                db.commit()
                
    except Exception as e:
        print(f"Error checking cases: {e}")
    finally:
        db.close()

scheduler = BackgroundScheduler()
scheduler.add_job(func=check_case_updates, trigger="interval", minutes=30, id="case_checker")

@app.on_event("startup")
def startup_event():
    """Initialize database and start scheduler"""
    init_db()
    init_faq_db()
    scheduler.start()
    print("JusticeBuddy started - Database initialized, Scheduler running")

@app.on_event("shutdown")
def shutdown_event():
    """Stop scheduler on shutdown"""
    scheduler.shutdown()

@app.post("/track_case")
def track_case(request: TrackCaseRequest, db: Session = Depends(get_db)):
    """Track a case using CNR number and send WhatsApp notifications on updates"""
    
    existing_case = db.query(CaseTracker).filter(
        CaseTracker.cnr_number == request.cnr_number
    ).first()
    
    if existing_case:
        return {
            "status": "already_tracked",
            "message": "This case is already being tracked",
            "case": {
                "cnr": existing_case.cnr_number,
                "current_status": existing_case.current_status,
                "last_checked": existing_case.last_checked
            }
        }
    
    case_data = mock_ecourts_api(
        request.cnr_number,
        request.state,
        request.district,
        request.court_name,
        request.filing_year
    )
    
    new_case = CaseTracker(
        cnr_number=request.cnr_number,
        state=request.state,
        district=request.district,
        court_name=request.court_name,
        filing_year=request.filing_year,
        phone_number=request.phone_number,
        current_status=case_data["status"],
        last_checked=datetime.utcnow(),
        notification_sent=False
    )
    
    db.add(new_case)
    db.commit()
    db.refresh(new_case)
    
    welcome_message = f"JusticeBuddy Case Tracking Activated\n\nCNR: {request.cnr_number}\nCourt: {request.court_name}\nDistrict: {request.district}\nState: {request.state}\n\nCurrent Status: {case_data['status']}\n\nYou'll receive WhatsApp alerts when your case status changes. Checks happen every 30 minutes."
    
    send_whatsapp_notification(request.phone_number, welcome_message)
    
    return {
        "status": "success",
        "message": "Case tracking activated",
        "case_data": case_data,
        "tracking_id": new_case.id
    }

@app.get("/cases")
def get_all_cases(db: Session = Depends(get_db)):
    """Get all tracked cases (Admin Panel)"""
    cases = db.query(CaseTracker).all()
    
    return {
        "total": len(cases),
        "cases": [
            {
                "id": case.id,
                "cnr_number": case.cnr_number,
                "state": case.state,
                "district": case.district,
                "court_name": case.court_name,
                "filing_year": case.filing_year,
                "phone_number": case.phone_number,
                "current_status": case.current_status,
                "last_checked": case.last_checked,
                "created_at": case.created_at,
                "notification_sent": case.notification_sent
            }
            for case in cases
        ]
    }

@app.post("/process")
def process_query(request: ChatRequest):
    """Process multilingual legal queries with intent classification and FAQ fallback"""
    
    user_message = request.message
    
    detected_lang = detect_language(user_message)
    
    if detected_lang != "en":
        english_query = translate_text(user_message, target_lang="en", source_lang=detected_lang)
    else:
        english_query = user_message
    
    intent = classify_intent(english_query)
    
    response_text = None
    source = None
    
    if intent != "unknown":
        response_text = get_intent_response(intent)
        source = "intent_classifier"
    
    if not response_text:
        faq_result = search_faq(english_query)
        
        if faq_result and faq_result["confidence"] > 0.2:
            response_text = faq_result["answer"]
            source = f"faq_database (confidence: {faq_result['confidence']:.2f})"
        else:
            response_text = "I apologize, but I don't have specific information about that. Please try asking about: RTI filing, FIR registration, bail procedures, legal aid, divorce process, consumer rights, or case tracking. You can also visit your nearest District Legal Services Authority (DLSA) for free legal help."
            source = "fallback"
    
    if detected_lang != "en":
        localized_response = translate_text(response_text, target_lang=detected_lang, source_lang="en")
    else:
        localized_response = response_text
    
    return {
        "query": user_message,
        "detected_language": detected_lang,
        "intent": intent,
        "response": localized_response,
        "source": source,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "scheduler_running": scheduler.running,
        "twilio_configured": twilio_client is not None
    }

if os.path.exists("frontend/dist"):
    app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")
