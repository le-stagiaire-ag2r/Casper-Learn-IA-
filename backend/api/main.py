"""
API FastAPI pour Casper Learn IA
Expose le RAG engine via REST API
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
import os
import sys
from pathlib import Path

# Ajouter le parent au path pour les imports
sys.path.append(str(Path(__file__).parent.parent.parent))

from backend.llm.rag_engine import CasperRAG
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialiser FastAPI
app = FastAPI(
    title="Casper Learn IA API",
    description="API pour l'assistant d'apprentissage Casper Network",
    version="1.0.0"
)

# CORS pour permettre les requêtes depuis le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En production: restreindre aux domaines autorisés
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialiser le RAG engine (global)
rag_engine: Optional[CasperRAG] = None


# Pydantic Models
class QuestionRequest(BaseModel):
    question: str = Field(..., description="User's question", min_length=1)
    language: str = Field("en", description="Language code (en, fr, es, de, it, pt, cn, jp, kr)")
    n_context: int = Field(5, description="Number of contexts to retrieve", ge=1, le=10)


class Source(BaseModel):
    title: str
    url: str
    relevance: float


class AnswerResponse(BaseModel):
    answer: str
    sources: List[Source]
    success: bool = True


class HealthResponse(BaseModel):
    status: str
    version: str
    rag_initialized: bool


class SearchRequest(BaseModel):
    query: str = Field(..., min_length=1)
    n_results: int = Field(5, ge=1, le=20)


class SearchResult(BaseModel):
    content: str
    title: str
    url: str
    relevance: float


class SearchResponse(BaseModel):
    results: List[SearchResult]
    total: int


# Routes
@app.on_event("startup")
async def startup_event():
    """Initialize RAG engine on startup"""
    global rag_engine

    logger.info("🚀 Starting Casper Learn IA API...")

    try:
        # Load environment variables
        from dotenv import load_dotenv
        load_dotenv()

        # Try Groq first (free and fast)
        groq_key = os.getenv("GROQ_API_KEY")
        openai_key = os.getenv("OPENAI_API_KEY")
        use_groq = os.getenv("USE_GROQ", "true").lower() == "true"

        if use_groq and groq_key:
            rag_engine = CasperRAG(groq_api_key=groq_key, use_groq=True)
            logger.info("✅ RAG Engine initialized with Groq API")
        elif openai_key:
            rag_engine = CasperRAG(openai_api_key=openai_key, use_groq=False)
            logger.info("✅ RAG Engine initialized with OpenAI API")
        else:
            raise ValueError("No API key found. Set GROQ_API_KEY or OPENAI_API_KEY")

    except Exception as e:
        logger.error(f"❌ Error initializing RAG: {e}")
        logger.warning("⚠️ API started in degraded mode (no RAG)")


@app.get("/", response_model=HealthResponse)
async def root():
    """Health check"""
    return {
        "status": "ok",
        "version": "1.0.0",
        "rag_initialized": rag_engine is not None
    }


@app.get("/health", response_model=HealthResponse)
async def health():
    """Endpoint de santé détaillé"""
    return {
        "status": "healthy" if rag_engine else "degraded",
        "version": "1.0.0",
        "rag_initialized": rag_engine is not None
    }


@app.post("/ask", response_model=AnswerResponse)
async def ask_question(request: QuestionRequest):
    """
    Pose une question à l'assistant IA

    Args:
        request: Question et paramètres

    Returns:
        Réponse générée avec sources
    """
    if not rag_engine:
        raise HTTPException(
            status_code=503,
            detail="RAG engine non initialisé - vérifier OPENAI_API_KEY"
        )

    try:
        logger.info(f"📥 Question reçue: {request.question}")

        result = rag_engine.generate_response(
            question=request.question,
            n_context=request.n_context,
            language=request.language
        )

        return {
            "answer": result['answer'],
            "sources": [
                {
                    "title": src['title'],
                    "url": src['url'],
                    "relevance": src['relevance']
                }
                for src in result['sources']
            ],
            "success": True
        }

    except Exception as e:
        logger.error(f"❌ Erreur génération réponse: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/search", response_model=SearchResponse)
async def search_docs(request: SearchRequest):
    """
    Recherche sémantique dans la documentation

    Args:
        request: Requête de recherche

    Returns:
        Résultats de recherche classés par pertinence
    """
    if not rag_engine:
        raise HTTPException(
            status_code=503,
            detail="RAG engine non initialisé"
        )

    try:
        contexts = rag_engine.retrieve_context(
            query=request.query,
            n_results=request.n_results
        )

        results = [
            {
                "content": ctx['content'],
                "title": ctx['metadata'].get('title', 'Sans titre'),
                "url": ctx['metadata'].get('url', ''),
                "relevance": ctx['relevance_score']
            }
            for ctx in contexts
        ]

        return {
            "results": results,
            "total": len(results)
        }

    except Exception as e:
        logger.error(f"❌ Erreur recherche: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/stats")
async def get_stats():
    """Retourne les statistiques de la base de connaissances"""
    if not rag_engine:
        raise HTTPException(status_code=503, detail="RAG engine non initialisé")

    try:
        count = rag_engine.collection.count()

        return {
            "total_documents": count,
            "collection_name": rag_engine.collection.name,
            "embedding_model": "all-MiniLM-L6-v2",
            "llm_model": "gpt-4-turbo-preview"
        }

    except Exception as e:
        logger.error(f"❌ Erreur stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
