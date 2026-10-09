import os
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# Use SQLite for local development if DATABASE_URL is not set or PostgreSQL is not available
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    # Use SQLite for local development
    DATABASE_URL = "sqlite:///./backend/case_tracker.db"
    print("[INFO] Using SQLite database for local development. Set DATABASE_URL environment variable for PostgreSQL.")

# Create engine with appropriate settings
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL, pool_pre_ping=True, pool_recycle=300)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class CaseTracker(Base):
    __tablename__ = "case_tracker"
    
    id = Column(Integer, primary_key=True, index=True)
    cnr_number = Column(String, unique=True, index=True, nullable=False)
    state = Column(String, nullable=False)
    district = Column(String, nullable=False)
    court_name = Column(String, nullable=False)
    filing_year = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    current_status = Column(String, default="Pending")
    last_checked = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    notification_sent = Column(Boolean, default=False)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
