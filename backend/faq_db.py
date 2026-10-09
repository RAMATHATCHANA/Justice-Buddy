import sqlite3
import os

FAQ_DB_PATH = "backend/legal_faq.db"

def init_faq_db():
    """Initialize SQLite FAQ database with legal knowledge base"""
    conn = sqlite3.connect(FAQ_DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS faqs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            keywords TEXT NOT NULL,
            category TEXT
        )
    ''')
    
    cursor.execute("SELECT COUNT(*) FROM faqs")
    if cursor.fetchone()[0] == 0:
        initial_faqs = [
            (
                "How to file RTI?",
                "To file an RTI (Right to Information) request: 1) Write an application to the Public Information Officer (PIO) of the concerned department 2) Pay a fee of ₹10 3) Submit in person or by post 4) You will receive information within 30 days",
                "rti,right to information,file,application,pio",
                "RTI"
            ),
            (
                "Where to find public prosecutor?",
                "Public prosecutors can be found at the district court complex. Visit the court office during working hours (10 AM - 5 PM) and ask for the Public Prosecutor's chamber. You can also contact the District Legal Services Authority for assistance.",
                "public prosecutor,court,district court,legal aid",
                "Court"
            ),
            (
                "How to file FIR?",
                "To file an FIR (First Information Report): 1) Go to the nearest police station 2) Provide details of the incident orally or in writing 3) The police must register your FIR - it's your legal right 4) Get a copy of the FIR for your records 5) If police refuse, you can approach the Superintendent of Police or file it online",
                "fir,first information report,police,complaint,crime",
                "Criminal"
            ),
            (
                "What is bail procedure?",
                "Bail procedure: 1) File a bail application before the appropriate court 2) For bailable offenses, bail is a right 3) For non-bailable offenses, court has discretion 4) You need to provide sureties and bonds 5) A lawyer can help prepare and present your bail application",
                "bail,arrested,custody,release,bond,surety",
                "Criminal"
            ),
            (
                "How to get legal aid?",
                "Free legal aid is available through: 1) District Legal Services Authority (DLSA) 2) State Legal Services Authority (SLSA) 3) National Legal Services Authority (NALSA) 4) Visit your district court and ask for the legal aid cell 5) Eligible persons include women, children, SC/ST, persons with disabilities, and those with annual income below ₹3 lakhs",
                "legal aid,free lawyer,poor,help,dlsa,nalsa",
                "Legal Aid"
            ),
            (
                "What are consumer rights?",
                "Consumer rights in India include: 1) Right to Safety 2) Right to Information 3) Right to Choose 4) Right to be Heard 5) Right to Redressal 6) Right to Consumer Education. You can file complaints in Consumer Forums for defective products or deficient services.",
                "consumer,rights,complaint,product,defective,forum",
                "Consumer"
            ),
            (
                "How to file divorce?",
                "To file for divorce: 1) Consult a family lawyer 2) Prepare petition with grounds (cruelty, adultery, desertion, etc.) 3) File in family court of your jurisdiction 4) Serve notice to spouse 5) Attend counseling sessions if ordered 6) Court hearings and evidence 7) Final decree. Mutual consent divorce is faster (6+ months) vs contested (2+ years)",
                "divorce,marriage,separation,family court,mutual consent",
                "Family"
            ),
            (
                "What is anticipatory bail?",
                "Anticipatory bail is pre-arrest bail granted when you anticipate arrest. File application under Section 438 CrPC in Sessions Court or High Court. Court considers: nature of accusation, your antecedents, potential for evidence tampering. If granted, you get protection from arrest but must comply with conditions.",
                "anticipatory bail,arrest,pre-arrest,438,crpc",
                "Criminal"
            ),
            (
                "How to register property?",
                "Property registration process: 1) Draft sale deed with lawyer 2) Verify property documents and title 3) Pay stamp duty and registration fees 4) Visit Sub-Registrar office with all parties 5) Present documents and witnesses 6) Pay fees 7) Biometric verification 8) Get registered document. Required: PAN, Aadhaar, property documents, sale deed, NOC if applicable",
                "property,registration,sale deed,sub registrar,stamp duty",
                "Property"
            ),
            (
                "What is a case status CNR?",
                "CNR (Case Number Record) is a unique 16-digit identifier for every case filed in Indian courts. Format: AADD00000000YYYY (AA=State, DD=District). You can track case status online at eCourts portal using CNR number. It shows case details, next hearing date, orders, and current status.",
                "cnr,case number,track,ecourts,status,hearing",
                "Court"
            )
        ]
        
        cursor.executemany(
            "INSERT INTO faqs (question, answer, keywords, category) VALUES (?, ?, ?, ?)",
            initial_faqs
        )
        conn.commit()
    
    conn.close()

def search_faq(query):
    """Search FAQ database for best match"""
    conn = sqlite3.connect(FAQ_DB_PATH)
    cursor = conn.cursor()
    
    query_lower = query.lower()
    
    cursor.execute("SELECT question, answer, keywords FROM faqs")
    faqs = cursor.fetchall()
    
    best_match = None
    highest_score = 0
    
    for question, answer, keywords in faqs:
        score = 0
        keyword_list = keywords.lower().split(',')
        
        for keyword in keyword_list:
            if keyword.strip() in query_lower:
                score += 2
        
        if question.lower() in query_lower or query_lower in question.lower():
            score += 5
        
        if score > highest_score:
            highest_score = score
            best_match = (question, answer)
    
    conn.close()
    
    if best_match and highest_score > 0:
        return {
            "question": best_match[0],
            "answer": best_match[1],
            "confidence": min(highest_score / 10, 1.0)
        }
    
    return None
