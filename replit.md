# JusticeBuddy - Legal Assistant Web App

## Overview
JusticeBuddy is a full-stack legal assistant application designed for India. It provides eCourts case tracking with WhatsApp notifications, a multilingual legal chatbot supporting 5 Indian languages, and an admin dashboard for case management.

## Project Architecture

### Backend (FastAPI)
- **Location**: `/backend` directory
- **Framework**: FastAPI with Python 3.11
- **Database**: 
  - PostgreSQL for case tracking data
  - SQLite for FAQ knowledge base
- **Key Features**:
  - Case tracking with mock eCourts API
  - APScheduler for background status checks (every 30 minutes)
  - Twilio integration for WhatsApp notifications
  - Multilingual chatbot with Google Translate
  - SQLite FAQ fallback for offline support
  - Static file serving for production deployment

### Frontend (React + Vite + DaisyUI)
- **Location**: `/frontend` directory
- **Framework**: React 19 with Vite build tool
- **Styling**: Tailwind CSS + DaisyUI component library + Custom CSS
- **Theme Support**: Blue Pastel/Light/Dark themes with moon toggle (☽)
- **Default Theme**: Blue Pastel (soft blue theme) - applied via CSS
- **Authentication**: Custom login system with localStorage session management
- **Logo**: Custom JusticeBuddy logo displayed in navbar (20px × 20px) and login page
- **Pages**:
  - Login: Authentication page with username/password (required before accessing app)
  - Home: Welcome page with 3 horizontally aligned hoverable feature cards
  - Track Case: LEFT-ALIGNED form (max-width ~1/2 screen) with red asterisks for required fields
  - Chatbot: CENTER-ALIGNED interface with padding on both sides
  - How It Works: Informational page explaining DoJ chatbot, eCourts tracking, WhatsApp alerts
  - Admin Panel: Dashboard showing all tracked cases with stats
- **Navigation**: Top-right horizontal layout with clean links, moon icon (☽) for theme toggle, user avatar dropdown with logout

### Database Schema

**PostgreSQL - case_tracker table**:
- CNR number, state, district, court details
- Phone number for WhatsApp alerts
- Current status and last checked timestamp

**SQLite - faqs table**:
- Legal questions and answers
- Keywords for search matching
- Categories (RTI, Criminal, Consumer, etc.)

## Recent Changes (November 1, 2025)

### Logo Size
- Logo set to 20px × 20px across all pages (navbar and login)
- Logo appears next to JusticeBuddy header text
- Maintains circular shape with rounded-full class

### Blue Pastel Theme CSS Implementation
- Added direct CSS styling in `frontend/src/index.css` with !important flags
- Blue pastel colors now properly applied across entire application:
  - Background: #E8F4F8 (light blue)
  - Navbar: #D4E9F2 (soft blue)
  - Primary: #6BAADD (blue)
  - Secondary: #A8D5E2 (light blue)
  - Buttons, cards, badges all themed with blue pastel colors
- Theme persists even when DaisyUI theme switching is used
- Body background set to blue pastel by default

### Deployment Configuration
- Fixed deployment run command to use correct module path: `uvicorn backend.main:app`
- Added frontend static file serving in production (serves built React app from backend)
- Created centralized API configuration that uses relative paths in production
- Backend now serves frontend on port 5000 in production deployment
- Health check endpoint available at `/health` (removed `/` to allow frontend serving)
- Database and FAQ database initialize during startup
- Security: Fixed directory traversal vulnerability with StaticFiles mount

### Authentication & Login System
- Added custom login page with username/password authentication
- Implemented route protection - all routes require authentication
- Users must login before accessing any page of the application
- Logout functionality via user avatar dropdown in navbar
- Session management using localStorage
- Demo credentials: username: demo / password: demo123
- Proper credential validation with error messages

### Logo Integration
- Added custom JusticeBuddy logo (justice scales with laurel wreath design)
- Logo displayed in navbar on all protected pages (20px × 20px size)
- Logo shown prominently on login page
- Logo set as favicon

### UI/UX Updates
- Updated navbar with smaller logo image next to "JusticeBuddy" text
- Added user avatar dropdown with username and logout option
- Maintained horizontal spacing (gap-4) in navbar
- All pages properly themed with blue pastel colors via CSS
- Login page centered card design with logo
- Responsive design maintained

### Previous Updates
- Frontend redesign with DaisyUI component library
- Added theme toggle functionality
- Created Navbar component with theme switcher
- Redesigned all pages with DaisyUI cards, buttons, and forms
- Updated Home page with hover animations on feature cards
- Redesigned Track Case form with DaisyUI form controls and alerts
- Updated Chatbot with WhatsApp-style chat bubbles
- Created How It Works page with detailed explanations
- Updated Admin Panel with DaisyUI stats, tables, and badges
- All pages properly spaced with pt-10 px-6 for clean layout
- Mobile-responsive design maintained

### Initial Setup
- FastAPI backend with PostgreSQL database
- SQLite FAQ database with 10+ legal FAQs
- Complete implementation of all 4 core features
- Background scheduler for case monitoring
- Twilio WhatsApp integration configured
- Mock eCourts API implementation

## User Preferences
- Blue pastel theme as default (soft blue colors) - enforced via CSS
- Login required to access application
- Logo displayed on every page (20px × 20px)
- Light/Dark mode toggle on top-right (moon icon ☽)
- Track Case: LEFT-ALIGNED input box (width ~1/3 to 1/2)
- Chatbot: CENTERED UI with padding on both sides
- Clean horizontal navbar on top-right
- No unnecessary emojis/icons except moon toggle
- Red asterisks for required fields
- Hover animations on feature cards
- Responsive design with proper padding
- Mock functions used where real API keys not available

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection (configured)
- `TWILIO_ACCOUNT_SID` - Twilio Account SID (configured)
- `TWILIO_AUTH_TOKEN` - Twilio Auth Token (configured)
- `TWILIO_WHATSAPP_FROM` - Twilio WhatsApp number
- `SESSION_SECRET` - Session secret for authentication (configured)

## Deployment
- **Target**: Autoscale (suitable for stateless web applications)
- **Build Command**: `cd frontend && npm run build`
- **Run Command**: `uvicorn backend.main:app --host 0.0.0.0 --port 5000`
- **Port**: 5000 (frontend and backend served from same port in production)
- **Health Checks**: Available at `/health` endpoint
- **Static Files**: Frontend served from `frontend/dist` using StaticFiles mount
- **Security**: Directory traversal protection via StaticFiles

## Workflows (Development)
- Frontend: Vite dev server on port 5000 (bound to 0.0.0.0)
- Backend: Uvicorn server on port 8000

## Key Integrations
- Twilio connector for WhatsApp (configured)
- PostgreSQL database blueprint (installed)
- Google Translate for multilingual support

## Supported Languages
- English
- Tamil (தமிழ்)
- Hindi (हिंदी)
- Telugu (తెలుగు)
- Kannada (ಕನ್ನಡ)

## Tech Stack Summary
- **Frontend**: React 19 + Vite + Tailwind CSS + DaisyUI + Custom CSS
- **Backend**: FastAPI + Python 3.11
- **Database**: PostgreSQL (case tracking) + SQLite (FAQ knowledge base)
- **Notifications**: Twilio WhatsApp API
- **Scheduler**: APScheduler (30-minute intervals)
- **Translation**: Google Translate API
- **Authentication**: Custom localStorage-based session management
- **Deployment**: Uvicorn (port 5000) + Static file serving
