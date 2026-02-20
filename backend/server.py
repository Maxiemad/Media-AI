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
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# LLM Key
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

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

# Chatbot Models
class ChatMessage(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    response: str
    session_id: str

# Chat history storage
class ChatHistory(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    role: str  # 'user' or 'assistant'
    content: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Launch config
class LaunchConfig(BaseModel):
    launch_date: str
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


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

@api_router.get("/newsletter/subscribers")
async def get_subscribers():
    """Get list of subscribers (admin endpoint)"""
    subscribers = await db.newsletter_subscriptions.find({}, {"_id": 0}).to_list(1000)
    for sub in subscribers:
        if isinstance(sub.get('subscribed_at'), str):
            sub['subscribed_at'] = datetime.fromisoformat(sub['subscribed_at'])
    return {"subscribers": subscribers, "total": len(subscribers)}

# Chatbot Endpoints
@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_bot(input: ChatMessage):
    """AI-powered chatbot endpoint"""
    try:
        # Get chat history for context
        history = await db.chat_history.find(
            {"session_id": input.session_id},
            {"_id": 0}
        ).sort("timestamp", 1).to_list(20)
        
        # Build system message
        system_message = """You are AetherX Assistant, an AI helper for the AetherX product launch website. 
AetherX is a revolutionary AI-powered creative platform that combines neural architecture with quantum-inspired algorithms.

Key facts about AetherX:
- Tagline: "Where Intelligence Meets Imagination"
- Features: Neural Architecture, Quantum Core, Creative Engine, Instant Response, Universal Language support (100+ languages), Secure by Design
- 3+ years of R&D, 50M+ parameters
- Currently in pre-launch phase with a waitlist

Be helpful, enthusiastic, and encourage users to join the waitlist for early access. Keep responses concise and engaging.
If asked about pricing, features, or launch date, mention that details will be shared with waitlist members first."""

        # Initialize chat
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=input.session_id,
            system_message=system_message
        ).with_model("openai", "gpt-4o-mini")
        
        # Add history context to the chat
        for msg in history[-10:]:  # Last 10 messages for context
            if msg['role'] == 'user':
                await chat.send_message(UserMessage(text=msg['content']))
            # Assistant messages are handled by the chat library
        
        # Send new message
        user_message = UserMessage(text=input.message)
        response = await chat.send_message(user_message)
        
        # Store user message
        user_history = ChatHistory(
            session_id=input.session_id,
            role="user",
            content=input.message
        )
        user_doc = user_history.model_dump()
        user_doc['timestamp'] = user_doc['timestamp'].isoformat()
        await db.chat_history.insert_one(user_doc)
        
        # Store assistant response
        assistant_history = ChatHistory(
            session_id=input.session_id,
            role="assistant",
            content=response
        )
        assistant_doc = assistant_history.model_dump()
        assistant_doc['timestamp'] = assistant_doc['timestamp'].isoformat()
        await db.chat_history.insert_one(assistant_doc)
        
        return ChatResponse(
            response=response,
            session_id=input.session_id
        )
        
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        # Fallback response
        fallback_responses = [
            "Thanks for your interest in AetherX! We're launching soon. Join our waitlist to get early access and be the first to experience the future of AI-powered creativity.",
            "AetherX combines neural architecture with quantum-inspired algorithms for unprecedented creative capabilities. Sign up for our waitlist to stay updated!",
            "Great question! Our team is working hard on AetherX. Join the waitlist below to get exclusive early access and updates.",
        ]
        import random
        return ChatResponse(
            response=random.choice(fallback_responses),
            session_id=input.session_id
        )

@api_router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    history = await db.chat_history.find(
        {"session_id": session_id},
        {"_id": 0}
    ).sort("timestamp", 1).to_list(100)
    
    return {"history": history, "session_id": session_id}

@api_router.delete("/chat/history/{session_id}")
async def clear_chat_history(session_id: str):
    """Clear chat history for a session"""
    result = await db.chat_history.delete_many({"session_id": session_id})
    return {"deleted": result.deleted_count, "session_id": session_id}

# Launch Configuration
@api_router.get("/launch/config")
async def get_launch_config():
    """Get launch configuration"""
    config = await db.launch_config.find_one({}, {"_id": 0})
    if not config:
        # Default: 30 days from now
        default_date = datetime.now(timezone.utc) + timedelta(days=30)
        return {"launch_date": default_date.isoformat()}
    return config

@api_router.post("/launch/config")
async def set_launch_config(launch_date: str):
    """Set launch date (admin endpoint)"""
    config = LaunchConfig(launch_date=launch_date)
    doc = config.model_dump()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.launch_config.delete_many({})
    await db.launch_config.insert_one(doc)
    
    return {"success": True, "launch_date": launch_date}


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

# Import timedelta for launch config
from datetime import timedelta

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
