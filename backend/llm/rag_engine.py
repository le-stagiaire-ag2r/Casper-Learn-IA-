"""
RAG Engine pour Casper Learn IA
Utilise LangChain + ChromaDB pour générer des réponses contextuelles
"""

import os
from typing import List, Dict, Optional
from langchain.prompts import ChatPromptTemplate
from langchain.schema import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.embeddings import SentenceTransformerEmbeddings
import chromadb
from chromadb.config import Settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class CasperRAG:
    """RAG Engine pour apprendre Casper"""

    def __init__(
        self,
        openai_api_key: Optional[str] = None,
        use_local_llm: bool = False,
        chroma_path: str = "./data/chromadb"
    ):
        """
        Initialise le RAG engine

        Args:
            openai_api_key: Clé API OpenAI (optionnel si use_local_llm=True)
            use_local_llm: Utiliser un LLM local (Ollama, etc.)
            chroma_path: Chemin vers la base ChromaDB
        """
        self.use_local_llm = use_local_llm

        # Initialiser l'embedding function
        self.embedding_function = SentenceTransformerEmbeddings(
            model_name="all-MiniLM-L6-v2"
        )

        # Initialiser ChromaDB
        self.chroma_client = chromadb.PersistentClient(
            path=chroma_path,
            settings=Settings(anonymized_telemetry=False)
        )

        # Charger la collection
        try:
            self.collection = self.chroma_client.get_collection("casper_docs")
            logger.info("✅ Collection ChromaDB chargée")
        except Exception as e:
            logger.error(f"❌ Erreur chargement collection: {e}")
            raise

        # Initialiser le LLM
        if use_local_llm:
            # Utiliser Ollama ou autre LLM local
            # TODO: Implémenter
            raise NotImplementedError("Local LLM pas encore implémenté")
        else:
            # Utiliser OpenAI
            api_key = openai_api_key or os.getenv("OPENAI_API_KEY")
            if not api_key:
                raise ValueError("OpenAI API key requise")

            self.llm = ChatOpenAI(
                model="gpt-4-turbo-preview",
                temperature=0.3,  # Plus déterministe pour l'enseignement
                api_key=api_key
            )

        # Template de prompt système
        self.system_prompt = """Tu es un expert en développement sur Casper Network, une blockchain Proof-of-Stake.
Ta mission est d'aider les développeurs à apprendre Casper de manière claire et pédagogique.

CONTEXTE FOURNI:
{context}

RÈGLES:
1. Réponds UNIQUEMENT basé sur le contexte fourni ci-dessus
2. Si tu ne trouves pas la réponse dans le contexte, dis-le clairement
3. Donne des exemples de code quand c'est pertinent
4. Explique les concepts complexes de manière simple
5. Référence les URLs de documentation quand disponibles
6. Utilise le français pour communiquer (sauf pour le code)
7. Structure tes réponses avec des titres et des listes quand approprié

Question de l'utilisateur: {question}

Réponds de manière complète et pédagogique:"""

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

    def generate_response(self, question: str, n_context: int = 5) -> Dict:
        """
        Génère une réponse à la question en utilisant RAG

        Returns:
            Dict avec 'answer', 'sources', 'contexts'
        """
        logger.info(f"🤔 Question: {question}")

        # 1. Récupérer le contexte
        contexts = self.retrieve_context(question, n_results=n_context)
        formatted_context = self.format_context(contexts)

        logger.info(f"📚 {len(contexts)} contextes récupérés")

        # 2. Créer le prompt
        prompt = self.system_prompt.format(
            context=formatted_context,
            question=question
        )

        # 3. Générer la réponse avec le LLM
        messages = [
            SystemMessage(content="Tu es un assistant expert en Casper Network."),
            HumanMessage(content=prompt)
        ]

        response = self.llm.invoke(messages)
        answer = response.content

        logger.info(f"✅ Réponse générée ({len(answer)} caractères)")

        # 4. Extraire les sources
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
            'contexts': contexts
        }

    def chat(self, question: str) -> str:
        """Interface simple de chat"""
        result = self.generate_response(question)
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
