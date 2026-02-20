from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Newsletter Subscription Model
class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    name: Optional[str] = None
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    source: str = "waitlist"

class NewsletterSubscribe(BaseModel):
    email: EmailStr
    name: Optional[str] = None

class NewsletterResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None


# Routes
@api_router.get("/")
async def root():
    return {"message": "AetherX API - Where Intelligence Meets Imagination"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Newsletter Endpoints
@api_router.post("/newsletter/subscribe", response_model=NewsletterResponse)
async def subscribe_newsletter(input: NewsletterSubscribe):
    # Check if email already exists
    existing = await db.newsletter_subscriptions.find_one({"email": input.email}, {"_id": 0})
    
    if existing:
        return NewsletterResponse(
            success=False,
            message="This email is already on the waitlist!",
            id=existing.get('id')
        )
    
    subscription = NewsletterSubscription(
        email=input.email,
        name=input.name
    )
    
    doc = subscription.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    
    await db.newsletter_subscriptions.insert_one(doc)
    
    return NewsletterResponse(
        success=True,
        message="Welcome to the AetherX waitlist! You'll be the first to know when we launch.",
        id=subscription.id
    )

@api_router.get("/newsletter/count")
async def get_subscription_count():
    count = await db.newsletter_subscriptions.count_documents({})
    return {"count": count}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
