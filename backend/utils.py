import random
from deep_translator import GoogleTranslator
from datetime import datetime
import re

LANGUAGE_CODES = {
    "tamil": "ta",
    "hindi": "hi",
    "telugu": "te",
    "kannada": "kn",
    "english": "en"
}

# Common words/patterns for language detection
LANGUAGE_PATTERNS = {
    "hi": [r'[\u0900-\u097F]', r'है|को|में|से|का|की|के'],  # Devanagari script
    "ta": [r'[\u0B80-\u0BFF]', r'உள்ள|ஆக|முதல்|இல்'],  # Tamil script
    "te": [r'[\u0C00-\u0C7F]', r'లో|కు|నుండి|యొక్క'],  # Telugu script
    "kn": [r'[\u0C80-\u0CFF]', r'ಲಿ|ಗೆ|ನಿಂದ|ಯ'],  # Kannada script
}

def detect_language(text):
    """Detect language of input text using script detection"""
    try:
        # Check for non-ASCII characters (likely Indic languages)
        if not any(ord(char) > 127 for char in text):
            return "en"  # Likely English if no special characters
        
        # Check for specific language scripts
        for lang_code, patterns in LANGUAGE_PATTERNS.items():
            for pattern in patterns:
                if re.search(pattern, text):
                    return lang_code
        
        # If contains Indic script but can't identify, default to Hindi
        if any('\u0900' <= char <= '\u097F' for char in text):
            return "hi"
        if any('\u0B80' <= char <= '\u0BFF' for char in text):
            return "ta"
        if any('\u0C00' <= char <= '\u0C7F' for char in text):
            return "te"
        if any('\u0C80' <= char <= '\u0CFF' for char in text):
            return "kn"
        
        return "en"  # Default to English
    except Exception as e:
        print(f"Language detection error: {e}")
        return "en"

def translate_text(text, target_lang="en", source_lang="auto"):
    """Translate text to target language using deep-translator"""
    try:
        # If source and target are the same, return original
        if source_lang and source_lang != "auto" and source_lang == target_lang:
            return text
        
        # Use auto-detection if source_lang is None or "auto"
        if source_lang in [None, "auto"]:
            translator = GoogleTranslator(source='auto', target=target_lang)
        else:
            translator = GoogleTranslator(source=source_lang, target=target_lang)
        
        result = translator.translate(text)
        return result
    except Exception as e:
        print(f"Translation error: {e}")
        return text

def mock_ecourts_api(cnr_number, state, district, court_name, filing_year):
    """
    Mock eCourts API - simulates fetching case status
    In production, replace with real eCourts API integration
    """
    statuses = [
        "Case Filed - Pending First Hearing",
        "Case Admitted - Next Hearing Scheduled",
        "Arguments in Progress",
        "Reserved for Judgment",
        "Judgment Pronounced - Case Closed",
        "Case Dismissed",
        "Case Withdrawn"
    ]
    
    next_hearings = [
        "2025-11-15",
        "2025-12-01",
        "2025-11-25",
        "2026-01-10",
        None
    ]
    
    mock_data = {
        "cnr": cnr_number,
        "status": random.choice(statuses),
        "court": f"{court_name}, {district}, {state}",
        "filing_date": f"{filing_year}-03-15",
        "next_hearing": random.choice(next_hearings),
        "petitioner": "Sample Petitioner",
        "respondent": "Sample Respondent",
        "case_type": "Civil/Criminal",
        "last_updated": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    }
    
    return mock_data

def classify_intent(query):
    """Basic intent classification using keywords"""
    query_lower = query.lower()
    
    intents = {
        "rti": ["rti", "right to information", "information act"],
        "fir": ["fir", "first information", "police complaint", "report crime"],
        "bail": ["bail", "release", "custody", "arrested"],
        "divorce": ["divorce", "separation", "marriage", "family court"],
        "consumer": ["consumer", "complaint", "defective", "product", "service"],
        "legal_aid": ["legal aid", "free lawyer", "poor", "help", "dlsa"],
        "property": ["property", "registration", "sale deed", "land"],
        "case_status": ["case status", "cnr", "hearing", "track case", "ecourts"]
    }
    
    for intent, keywords in intents.items():
        for keyword in keywords:
            if keyword in query_lower:
                return intent
    
    return "unknown"

def get_intent_response(intent):
    """Get predefined response for known intent"""
    responses = {
        "rti": "To file an RTI request, write to the Public Information Officer (PIO) with ₹10 fee. You'll get information within 30 days.",
        "fir": "Visit the nearest police station to file FIR. Police must register it - it's your right. Get a copy for your records.",
        "bail": "For bail, file application in appropriate court. Bailable offenses grant automatic bail; non-bailable require court discretion.",
        "divorce": "File divorce petition in family court with grounds. Mutual consent is faster (6+ months) than contested (2+ years).",
        "consumer": "File consumer complaint in Consumer Forum for defective products or services. You have right to redressal.",
        "legal_aid": "Get free legal aid from District Legal Services Authority (DLSA) at your district court.",
        "property": "Register property at Sub-Registrar office. Need sale deed, stamp duty payment, and all parties present.",
        "case_status": "Track case using CNR number on eCourts portal. It shows hearing dates and status."
    }
    
    return responses.get(intent, None)
