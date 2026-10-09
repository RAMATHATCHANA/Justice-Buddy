# JusticeBuddy - Legal Assistant Web App ⚖️

A full-stack legal assistant application for India with eCourts case tracking, multilingual chatbot, and WhatsApp notifications.

## Features

### 🔹 1. eCourts Case Status Tracking
- Track court cases using CNR number
- Automatic status monitoring every 30 minutes
- WhatsApp notifications via Twilio when case status changes
- Mock eCourts API integration (ready for real API)

### 🔹 2. Multilingual Legal Chatbot
- Supports 5 languages: English, Tamil (தமிழ்), Hindi (हिंदी), Telugu (తెలుగు), Kannada (ಕನ್ನಡ)
- Intent classification and FAQ knowledge base
- Google Translate API for language detection and translation
- Offline fallback using SQLite database

### 🔹 3. Modern React Frontend
- **Home**: Welcome page with feature overview
- **Case Tracker**: Form to submit case details for tracking
- **Chatbot**: Interactive Q&A interface
- **Admin Panel**: Dashboard showing all tracked cases
- Tailwind CSS for responsive, mobile-friendly design

### 🔹 4. WhatsApp Integration
- Real-time alerts via Twilio WhatsApp API
- Automatic notifications on case status changes
- User phone number storage with case data

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Primary database for case tracking
- **SQLite** - FAQ knowledge base
- **APScheduler** - Background task scheduler
- **Twilio** - WhatsApp notifications
- **Google Translate API** - Multilingual support
- **SQLAlchemy** - ORM for database operations

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

## Installation

### Prerequisites
- Python 3.11+
- Node.js 20+
- PostgreSQL database
- Twilio account (for WhatsApp)

### Backend Setup

1. Install Python dependencies:
```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv apscheduler twilio googletrans==4.0.0rc1 pydantic python-multipart
```

2. Set up environment variables (already configured in Replit):
- `DATABASE_URL` - PostgreSQL connection string
- `TWILIO_ACCOUNT_SID` - Twilio Account SID
- `TWILIO_AUTH_TOKEN` - Twilio Auth Token
- `TWILIO_WHATSAPP_FROM` - Twilio WhatsApp number (e.g., whatsapp:+14155238886)

### Frontend Setup

1. Install Node dependencies:
```bash
cd frontend
npm install
```

## Running the Application

### Backend
```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5000`
The backend API will be available at `http://localhost:8000`

## API Endpoints

### Case Tracking
- `POST /track_case` - Start tracking a case
  - Body: `{ cnr_number, state, district, court_name, filing_year, phone_number }`
  
- `GET /cases` - Get all tracked cases

### Chatbot
- `POST /process` - Process legal query
  - Body: `{ message }`

### Health
- `GET /health` - Check API health and scheduler status

## Database Schema

### PostgreSQL (case_tracker table)
- `id` - Primary key
- `cnr_number` - Case Number Record (unique)
- `state`, `district`, `court_name`, `filing_year` - Court details
- `phone_number` - WhatsApp number for notifications
- `current_status` - Latest case status
- `last_checked` - Last status check timestamp
- `notification_sent` - Whether notification was sent

### SQLite (faqs table)
- `id` - Primary key
- `question` - FAQ question
- `answer` - FAQ answer
- `keywords` - Comma-separated keywords for matching
- `category` - FAQ category (RTI, Criminal, Civil, etc.)

## Features in Detail

### Background Scheduler
- Runs every 30 minutes automatically
- Checks all tracked cases for status updates
- Sends WhatsApp notifications when status changes
- Updates database with latest information

### Multilingual Support
- Automatic language detection
- Translation to/from English for processing
- Responses in user's original language
- Supports: English, Tamil, Hindi, Telugu, Kannada

### Mock eCourts API
The app includes a mock eCourts API that simulates real case data. To integrate with the official eCourts API:
1. Obtain API credentials from eCourts
2. Replace `mock_ecourts_api()` function in `backend/utils.py`
3. Update API endpoint and authentication

## Legal FAQs Included

The SQLite knowledge base includes information about:
- RTI (Right to Information) filing
- FIR (First Information Report) registration
- Bail procedures
- Legal aid access
- Consumer rights
- Divorce procedures
- Property registration
- Case status tracking
- And more...

## WhatsApp Notification Format

```
🔔 JusticeBuddy Alert

Your case TNMA020012342015 status has changed:

Old Status: Case Filed - Pending First Hearing
New Status: Arguments in Progress

Court: District Court Chennai, Chennai

Visit JusticeBuddy for details.
```

## Security Notes

- All sensitive credentials are stored in environment variables
- Database connections use connection pooling
- CORS enabled for frontend-backend communication
- Input validation on all forms
- SQL injection protection via SQLAlchemy ORM

## Deployment

The app is ready for deployment on Replit. Make sure to:
1. Set all required environment variables
2. Configure Twilio WhatsApp sandbox or production number
3. Update CORS origins if deploying to custom domain

## Future Enhancements

- Real eCourts API integration
- User authentication and login
- Advanced NLP with spaCy/transformers
- Document upload and OCR
- Email notifications
- SMS alerts
- Case document management
- Payment integration for legal services
- Multi-user support with roles
- Case history and analytics

## Support

For issues or questions about JusticeBuddy, please contact your District Legal Services Authority (DLSA) for free legal aid.

---

**Made with ⚖️ for Justice**
