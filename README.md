# Casper-Learn-IA 🚀

**Assistant IA intelligent pour apprendre Casper Network**

Une application d'apprentissage interactive utilisant l'IA (RAG + LLM) pour enseigner le développement sur Casper Network. Indexe automatiquement toute la documentation CSPR.cloud et répond aux questions de manière contextuelle.

## 🎯 Fonctionnalités

- **Chatbot IA Intelligent** : Répond aux questions sur Casper en utilisant RAG (Retrieval-Augmented Generation)
- **Base de connaissances complète** : Documentation CSPR.cloud indexée avec recherche sémantique
- **Exemples de code** : Extraction automatique d'exemples depuis la documentation
- **Sources vérifiables** : Chaque réponse cite ses sources avec liens directs
- **API REST** : Backend FastAPI pour intégrations faciles
- **Interface web** : Chat interface simple et intuitive

## 🏗️ Architecture

```
Backend : FastAPI + LangChain + ChromaDB
LLM : OpenAI GPT-4 Turbo (ou modèles locaux)
Embeddings : Sentence Transformers (all-MiniLM-L6-v2)
Base vectorielle : ChromaDB (persistante)
Frontend : React/Next.js (optionnel)
```

## 📋 Prérequis

- Python 3.11+
- OpenAI API Key (pour le LLM)
- Docker & Docker Compose (optionnel)

## 🚀 Installation

### 1. Cloner le repo

```bash
git clone https://github.com/le-stagiaire-ag2r/Casper-Learn-IA-.git
cd Casper-Learn-IA-
```

### 2. Configuration

```bash
# Copier le fichier d'environnement
cp .env.example .env

# Éditer .env et ajouter votre clé OpenAI
nano .env
```

### 3. Installer les dépendances

```bash
pip install -r requirements.txt
```

### 4. Scraper la documentation

```bash
python scripts/scrape_docs.py
```

Cela va :
- Scraper toute la documentation CSPR.cloud
- Sauvegarder dans `data/docs/cspr_cloud_docs.json`

### 5. Indexer les documents

```bash
python scripts/index_docs.py
```

Cela va :
- Charger les documents scrapés
- Les découper en chunks optimaux
- Créer les embeddings vectoriels
- Indexer dans ChromaDB (`data/chromadb/`)

### 6. Lancer l'API

```bash
cd backend/api
python main.py
```

L'API sera disponible sur `http://localhost:8000`

Documentation interactive : `http://localhost:8000/docs`

## 🐳 Utilisation avec Docker

```bash
# Build et lancer tous les services
docker-compose up --build

# Backend API : http://localhost:8000
# Frontend : http://localhost:3000 (si configuré)
```

## 📚 Utilisation

### Via l'API REST

```bash
# Poser une question
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Comment interroger le solde d'\''un compte Casper?",
    "n_context": 5
  }'

# Recherche dans la documentation
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "CEP-18 token standard",
    "n_results": 5
  }'

# Statistiques
curl http://localhost:8000/stats
```

### Via Python

```python
from backend.llm.rag_engine import CasperRAG

# Initialiser
rag = CasperRAG(openai_api_key="your_key")

# Poser une question
result = rag.generate_response("Qu'est-ce que le CEP-18?")

print(result['answer'])
print("\nSources:")
for src in result['sources']:
    print(f"- {src['title']}: {src['url']}")
```

## 🧪 Tests

```bash
# Tester le scraper
python scripts/scrape_docs.py

# Tester l'indexation
python scripts/index_docs.py

# Tester le RAG
python backend/llm/rag_engine.py
```

## 📊 Statistiques

Une fois indexé, vous aurez :
- **~50-100+ pages** de documentation scrapées
- **~500-1000+ chunks** dans la base vectorielle
- **~100+ exemples de code** indexés séparément

## 🎨 Structure du projet

```
Casper-Learn-IA/
├── backend/
│   ├── api/
│   │   └── main.py              # FastAPI app
│   ├── llm/
│   │   └── rag_engine.py        # RAG logic
│   └── utils/
├── scripts/
│   ├── scrape_docs.py           # Scraper CSPR.cloud
│   └── index_docs.py            # Indexation ChromaDB
├── data/
│   ├── docs/                    # Docs scrapés (JSON)
│   └── chromadb/                # Base vectorielle
├── docker/
│   ├── Dockerfile.backend
│   └── Dockerfile.frontend
├── requirements.txt
├── docker-compose.yml
└── README.md
```

## 🔧 Configuration avancée

### Utiliser un LLM local (Ollama)

```python
# TODO: À implémenter
# Permettra d'utiliser Mistral/Llama localement
```

### Changer le modèle d'embeddings

Dans `scripts/index_docs.py` et `backend/llm/rag_engine.py` :

```python
# Remplacer "all-MiniLM-L6-v2" par un autre modèle
# Exemples : "all-mpnet-base-v2", "multi-qa-mpnet-base-dot-v1"
```

### Ajuster les paramètres RAG

Dans `backend/llm/rag_engine.py` :

```python
# Température du LLM (0-1) : plus bas = plus déterministe
temperature=0.3

# Nombre de contextes récupérés
n_results=5

# Taille des chunks
chunk_size=1000
```

## 🤝 Contribution

Ce projet est pour le hackathon Casper ! N'hésitez pas à :
- Ajouter plus de sources de documentation
- Améliorer le scraper
- Créer de meilleurs prompts
- Ajouter un frontend React
- Implémenter un LLM local

## 📝 Projets connexes

- [Casper-projet](https://github.com/le-stagiaire-ag2r/Casper-projet) (v4.0.0)
- [Casper-Clicker](https://github.com/le-stagiaire-ag2r/Casper-Clicker)
- [CasperSecure](https://github.com/le-stagiaire-ag2r/CasperSecure)

## 📖 Ressources

- [CSPR.cloud Documentation](https://docs.cspr.cloud/)
- [Casper Network](https://casper.network/)
- [LangChain](https://python.langchain.com/)
- [ChromaDB](https://www.trychroma.com/)

## 📄 Licence

MIT

## 👨‍💻 Auteur

Créé pour le hackathon Casper Network

---

**Bonne chance pour votre hackathon ! 🚀🎉**
