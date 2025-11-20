#!/usr/bin/env python3
"""
Indexation de la documentation dans ChromaDB
Crée une base vectorielle pour la recherche sémantique
"""

import json
import chromadb
from chromadb.config import Settings
from chromadb.utils import embedding_functions
from pathlib import Path
from typing import List, Dict
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DocumentIndexer:
    """Indexe les documents dans ChromaDB pour recherche sémantique"""

    def __init__(self, collection_name: str = "casper_docs"):
        # Initialiser ChromaDB
        self.client = chromadb.PersistentClient(
            path="./data/chromadb",
            settings=Settings(anonymized_telemetry=False)
        )

        # Utiliser un modèle d'embeddings (peut être changé pour OpenAI)
        self.embedding_function = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2"  # Modèle léger et efficace
        )

        # Créer ou récupérer la collection
        try:
            self.collection = self.client.get_collection(
                name=collection_name,
                embedding_function=self.embedding_function
            )
            logger.info(f"📚 Collection '{collection_name}' récupérée")
        except:
            self.collection = self.client.create_collection(
                name=collection_name,
                embedding_function=self.embedding_function,
                metadata={"description": "Documentation Casper Network"}
            )
            logger.info(f"✨ Collection '{collection_name}' créée")

    def chunk_text(self, text: str, chunk_size: int = 1000, overlap: int = 200) -> List[str]:
        """Découpe le texte en chunks avec overlap"""
        chunks = []
        start = 0

        while start < len(text):
            end = start + chunk_size
            chunk = text[start:end]

            # Essayer de couper à une phrase complète
            if end < len(text):
                last_period = chunk.rfind('.')
                last_newline = chunk.rfind('\n')
                cut_point = max(last_period, last_newline)

                if cut_point > chunk_size * 0.5:  # Au moins 50% du chunk
                    chunk = chunk[:cut_point + 1]
                    end = start + cut_point + 1

            chunks.append(chunk.strip())
            start = end - overlap

        return chunks

    def load_documents(self, json_path: str = "data/docs/cspr_cloud_docs.json") -> List[Dict]:
        """Charge les documents depuis le JSON"""
        with open(json_path, 'r', encoding='utf-8') as f:
            docs = json.load(f)

        logger.info(f"📂 {len(docs)} documents chargés depuis {json_path}")
        return docs

    def index_documents(self, docs: List[Dict]):
        """Indexe les documents dans ChromaDB"""
        logger.info("🔨 Début de l'indexation...")

        documents = []
        metadatas = []
        ids = []
        chunk_id = 0

        for doc_idx, doc in enumerate(docs):
            # Chunker le contenu
            chunks = self.chunk_text(doc['content'])

            logger.info(f"[{doc_idx + 1}/{len(docs)}] {doc['title']}: {len(chunks)} chunks")

            for chunk_idx, chunk in enumerate(chunks):
                if len(chunk.strip()) < 50:  # Ignorer les chunks trop courts
                    continue

                chunk_id += 1
                documents.append(chunk)
                ids.append(f"doc_{doc_idx}_chunk_{chunk_idx}")
                metadatas.append({
                    'url': doc['url'],
                    'title': doc['title'],
                    'chunk_index': chunk_idx,
                    'total_chunks': len(chunks),
                    'source': 'cspr_cloud'
                })

            # Indexer aussi les exemples de code séparément
            for code_idx, code_example in enumerate(doc.get('code_examples', [])):
                if len(code_example.strip()) < 20:
                    continue

                chunk_id += 1
                documents.append(f"Code example:\n{code_example}")
                ids.append(f"doc_{doc_idx}_code_{code_idx}")
                metadatas.append({
                    'url': doc['url'],
                    'title': f"{doc['title']} - Code Example",
                    'type': 'code',
                    'source': 'cspr_cloud'
                })

        # Ajouter à ChromaDB par batches
        batch_size = 100
        for i in range(0, len(documents), batch_size):
            batch_docs = documents[i:i + batch_size]
            batch_ids = ids[i:i + batch_size]
            batch_meta = metadatas[i:i + batch_size]

            self.collection.add(
                documents=batch_docs,
                ids=batch_ids,
                metadatas=batch_meta
            )

            logger.info(f"  Batch {i // batch_size + 1}: {len(batch_docs)} documents indexés")

        logger.info(f"✅ Indexation terminée: {len(documents)} chunks au total")

    def search(self, query: str, n_results: int = 5) -> List[Dict]:
        """Recherche sémantique dans les documents"""
        results = self.collection.query(
            query_texts=[query],
            n_results=n_results
        )

        return {
            'documents': results['documents'][0],
            'metadatas': results['metadatas'][0],
            'distances': results['distances'][0]
        }

    def get_stats(self) -> Dict:
        """Retourne des statistiques sur la collection"""
        count = self.collection.count()
        return {
            'total_documents': count,
            'collection_name': self.collection.name
        }


def main():
    """Point d'entrée principal"""
    indexer = DocumentIndexer()

    # Charger les documents
    docs = indexer.load_documents()

    # Indexer
    indexer.index_documents(docs)

    # Stats finales
    stats = indexer.get_stats()
    logger.info(f"📊 {stats['total_documents']} documents dans la base vectorielle")

    # Test de recherche
    logger.info("\n🔍 Test de recherche:")
    results = indexer.search("How to query account balance?", n_results=3)

    for idx, (doc, meta, dist) in enumerate(zip(
        results['documents'],
        results['metadatas'],
        results['distances']
    ), 1):
        logger.info(f"\n[{idx}] {meta['title']} (distance: {dist:.3f})")
        logger.info(f"    URL: {meta['url']}")
        logger.info(f"    Preview: {doc[:150]}...")


if __name__ == "__main__":
    main()
