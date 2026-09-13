import sys
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager

# Add parent directory to sys.path so we can import src
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.predict import predict_email, load_models

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load models on startup
    models_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "models")
    try:
        load_models(models_dir)
        print("Models loaded successfully.")
    except Exception as e:
        print(f"Error loading models: {e}")
    yield
    # Clean up on shutdown if necessary

app = FastAPI(title="MailShield API", lifespan=lifespan)

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmailRequest(BaseModel):
    subject: str = ""
    body: str = ""

class UrlStats(BaseModel):
    url_count_extracted: int
    http_count: int
    https_count: int
    ip_url_count: int
    short_url_count: int
    suspicious_url_count: int
    avg_url_length: float
    max_url_length: int
    unique_domain_count: int

class AnalysisResponse(BaseModel):
    prediction: str
    decision_score: float
    url_count: int
    suspicious_url_count: int
    url_stats: dict # Keep it dict for simplicity or map to UrlStats

@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze_email(request: EmailRequest):
    if not request.subject.strip() and not request.body.strip():
        raise HTTPException(status_code=400, detail="Subject and body cannot both be empty")
        
    try:
        models_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "models")
        result = predict_email(request.subject, request.body, models_dir=models_dir)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
