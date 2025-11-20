"""
RAG Engine for Casper Learn IA
Uses LangChain + ChromaDB to generate contextual responses
"""

import os
from typing import List, Dict, Optional
from langchain.embeddings import SentenceTransformerEmbeddings
import chromadb
from chromadb.config import Settings
import logging
from .groq_client import GroqClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class CasperRAG:
    """RAG Engine for learning Casper Network"""

    def __init__(
        self,
        groq_api_key: Optional[str] = None,
        openai_api_key: Optional[str] = None,
        use_groq: bool = True,
        chroma_path: str = "./data/chromadb"
    ):
        """
        Initialize RAG engine

        Args:
            groq_api_key: Groq API key (FREE, recommended)
            openai_api_key: OpenAI API key (optional, for GPT-4)
            use_groq: Use Groq (default) or OpenAI
            chroma_path: Path to ChromaDB database
        """
        self.use_groq = use_groq

        # Initialize embedding function
        self.embedding_function = SentenceTransformerEmbeddings(
            model_name="all-MiniLM-L6-v2"
        )

        # Initialize ChromaDB
        self.chroma_client = chromadb.PersistentClient(
            path=chroma_path,
            settings=Settings(anonymized_telemetry=False)
        )

        # Load collection
        try:
            self.collection = self.chroma_client.get_collection("casper_docs")
            logger.info("✅ ChromaDB collection loaded")
        except Exception as e:
            logger.error(f"❌ Error loading collection: {e}")
            raise

        # Initialize LLM
        if use_groq:
            # Use Groq (FREE, fast)
            api_key = groq_api_key or os.getenv("GROQ_API_KEY")
            if not api_key:
                raise ValueError(
                    "GROQ_API_KEY not found. Get your free key at https://console.groq.com"
                )
            self.llm = GroqClient(api_key=api_key)
            logger.info("🚀 Using Groq API (Mixtral-8x7b)")
        else:
            # Use OpenAI
            try:
                from langchain_openai import ChatOpenAI
                api_key = openai_api_key or os.getenv("OPENAI_API_KEY")
                if not api_key:
                    raise ValueError("OpenAI API key required")

                self.llm = ChatOpenAI(
                    model="gpt-4-turbo-preview",
                    temperature=0.3,
                    api_key=api_key
                )
                logger.info("🤖 Using OpenAI GPT-4")
            except ImportError:
                raise ImportError("langchain_openai not installed. Run: pip install langchain-openai")

        # System prompt templates by language
        self.system_prompts = {
            "en": """You are an expert in Casper Network development, a Proof-of-Stake blockchain.
Your mission is to help developers learn Casper in a clear and pedagogical way.

PROVIDED CONTEXT:
{context}

RULES:
1. Answer ONLY based on the context provided above
2. If you can't find the answer in the context, say so clearly
3. Provide code examples when relevant
4. Explain complex concepts simply
5. Reference documentation URLs when available
6. Structure your responses with headings and lists when appropriate
7. Be concise but comprehensive

User question: {question}

Provide a complete and pedagogical answer:""",

            "fr": """Tu es un expert en développement sur Casper Network, une blockchain Proof-of-Stake.
Ta mission est d'aider les développeurs à apprendre Casper de manière claire et pédagogique.

CONTEXTE FOURNI:
{context}

RÈGLES:
1. Réponds UNIQUEMENT basé sur le contexte fourni ci-dessus
2. Si tu ne trouves pas la réponse dans le contexte, dis-le clairement
3. Donne des exemples de code quand c'est pertinent
4. Explique les concepts complexes de manière simple
5. Référence les URLs de documentation quand disponibles
6. Structure tes réponses avec des titres et des listes quand approprié
7. Sois concis mais complet

Question de l'utilisateur: {question}

Réponds de manière complète et pédagogique:""",

            "es": """Eres un experto en desarrollo de Casper Network, una blockchain Proof-of-Stake.
Tu misión es ayudar a los desarrolladores a aprender Casper de manera clara y pedagógica.

CONTEXTO PROPORCIONADO:
{context}

REGLAS:
1. Responde SOLO basándote en el contexto proporcionado arriba
2. Si no encuentras la respuesta en el contexto, dilo claramente
3. Proporciona ejemplos de código cuando sea relevante
4. Explica conceptos complejos de manera simple
5. Referencia URLs de documentación cuando estén disponibles
6. Estructura tus respuestas con títulos y listas cuando sea apropiado

Pregunta del usuario: {question}

Proporciona una respuesta completa y pedagógica:"""
        }

        # Add more languages (simplified - can be expanded)
        self.system_prompts["de"] = self.system_prompts["en"]  # German
        self.system_prompts["it"] = self.system_prompts["en"]  # Italian
        self.system_prompts["pt"] = self.system_prompts["en"]  # Portuguese
        self.system_prompts["cn"] = self.system_prompts["en"]  # Chinese
        self.system_prompts["jp"] = self.system_prompts["en"]  # Japanese
        self.system_prompts["kr"] = self.system_prompts["en"]  # Korean

    def retrieve_context(self, query: str, n_results: int = 5) -> List[Dict]:
        """Récupère le contexte pertinent depuis ChromaDB"""
        results = self.collection.query(
            query_texts=[query],
            n_results=n_results
        )

        contexts = []
        for doc, meta, dist in zip(
            results['documents'][0],
            results['metadatas'][0],
            results['distances'][0]
        ):
            contexts.append({
                'content': doc,
                'metadata': meta,
                'relevance_score': 1 - dist  # Convert distance to similarity
            })

        return contexts

    def format_context(self, contexts: List[Dict]) -> str:
        """Formate le contexte récupéré pour le prompt"""
        formatted = []

        for idx, ctx in enumerate(contexts, 1):
            meta = ctx['metadata']
            content = ctx['content']
            score = ctx['relevance_score']

            formatted.append(f"""
[Source {idx}] {meta.get('title', 'Sans titre')}
URL: {meta.get('url', 'N/A')}
Pertinence: {score:.2%}

{content}
{'─' * 80}
""")

        return "\n".join(formatted)

    def generate_response(
        self,
        question: str,
        n_context: int = 5,
        language: str = "en"
    ) -> Dict:
        """
        Generate a response to the question using RAG

        Args:
            question: User's question
            n_context: Number of context chunks to retrieve
            language: Language code (en, fr, es, de, it, pt, cn, jp, kr)

        Returns:
            Dict with 'answer', 'sources', 'contexts'
        """
        logger.info(f"🤔 Question: {question} (lang: {language})")

        # 1. Retrieve context
        contexts = self.retrieve_context(question, n_results=n_context)
        formatted_context = self.format_context(contexts)

        logger.info(f"📚 {len(contexts)} contexts retrieved")

        # 2. Get prompt template for language
        prompt_template = self.system_prompts.get(language, self.system_prompts["en"])

        # 3. Create prompt
        prompt = prompt_template.format(
            context=formatted_context,
            question=question
        )

        # 4. Generate response with LLM
        if self.use_groq:
            # Use Groq client
            messages = [
                {"role": "system", "content": "You are an expert assistant for Casper Network development."},
                {"role": "user", "content": prompt}
            ]
            answer = self.llm.chat_completion(messages)
        else:
            # Use OpenAI/LangChain
            from langchain.schema import HumanMessage, SystemMessage
            messages = [
                SystemMessage(content="You are an expert assistant for Casper Network development."),
                HumanMessage(content=prompt)
            ]
            response = self.llm.invoke(messages)
            answer = response.content

        logger.info(f"✅ Response generated ({len(answer)} characters)")

        # 5. Extract sources
        sources = [
            {
                'title': ctx['metadata'].get('title'),
                'url': ctx['metadata'].get('url'),
                'relevance': ctx['relevance_score']
            }
            for ctx in contexts
        ]

        return {
            'answer': answer,
            'sources': sources,
            'contexts': contexts,
            'language': language
        }

    def chat(self, question: str, language: str = "en") -> str:
        """Simple chat interface"""
        result = self.generate_response(question, language=language)
        return result['answer']


def test_rag():
    """Fonction de test"""
    # Nécessite OPENAI_API_KEY dans l'environnement
    rag = CasperRAG()

    questions = [
        "Comment interroger le solde d'un compte sur Casper?",
        "Qu'est-ce que le CEP-18?",
        "Comment utiliser l'API REST de CSPR.cloud?",
    ]

    for q in questions:
        print(f"\n{'=' * 80}")
        print(f"Q: {q}")
        print(f"{'=' * 80}")

        result = rag.generate_response(q)

        print(f"\n{result['answer']}\n")

        print(f"\n📚 Sources:")
        for src in result['sources']:
            print(f"  - {src['title']} ({src['relevance']:.1%})")
            print(f"    {src['url']}")


if __name__ == "__main__":
    test_rag()
