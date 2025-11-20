# Architecture Casper-Learn-IA

## Vision
Assistant IA intelligent pour apprendre le développement sur Casper Network, utilisant la documentation CSPR.cloud et les exemples de projets.

## Stack Technique

### Backend
- **Python 3.11+** avec FastAPI
- **LangChain** pour l'orchestration LLM
- **ChromaDB** ou **Pinecone** pour la base vectorielle
- **OpenAI API** ou **Llama/Mistral** (local)

### Frontend
- **React/Next.js** pour l'interface
- **TailwindCSS** pour le styling
- **WebSocket** pour chat en temps réel

### Data Sources
1. Documentation CSPR.cloud (REST API, Streaming API, Guides)
2. Documentation officielle Casper Network
3. Vos 3 projets :
   - Casper-projet (v4.0.0)
   - Casper-Clicker
   - CasperSecure

## Fonctionnalités Principales

### 1. Chatbot Intelligent (RAG)
- Répond aux questions sur Casper
- Contexte basé sur la documentation complète
- Exemples de code tirés de vrais projets

### 2. Tutoriels Interactifs
- Parcours débutant → avancé
- Exercices pratiques avec validation
- Intégration sandbox pour tester du code

### 3. Documentation Explorer
- Navigation intelligente de la doc
- Recherche sémantique
- Snippets de code copyables

### 4. Générateur de Code
- Templates de smart contracts
- Intégration API CSPR.cloud
- Best practices automatiques

## Structure du Projet

```
Casper-Learn-IA/
├── backend/
│   ├── api/                    # FastAPI endpoints
│   ├── llm/                    # LangChain logic
│   ├── scraper/                # Documentation scraper
│   ├── vectordb/               # ChromaDB integration
│   └── utils/
├── frontend/
│   ├── components/             # React components
│   ├── pages/                  # Next.js pages
│   ├── hooks/                  # Custom hooks
│   └── styles/
├── data/
│   ├── docs/                   # Scraped documentation
│   ├── examples/               # Code examples from projects
│   └── tutorials/              # Learning paths
├── scripts/
│   ├── scrape_docs.py          # Scraper CSPR.cloud
│   ├── index_docs.py           # Indexation vectorielle
│   └── test_rag.py             # Tests RAG
└── docker/
    ├── Dockerfile
    └── docker-compose.yml
```

## Pipeline de Données

1. **Scraping** : Extraction docs CSPR.cloud + Casper official
2. **Chunking** : Découpage en segments optimaux
3. **Embedding** : Transformation en vecteurs (OpenAI/local)
4. **Indexation** : Stockage dans ChromaDB
5. **Retrieval** : Recherche sémantique contextuelle
6. **Generation** : Réponse LLM augmentée

## Modèles LLM Possibles

### Option 1 : Cloud (Plus simple)
- OpenAI GPT-4 Turbo
- Anthropic Claude 3

### Option 2 : Open Source (Gratuit)
- Mistral 7B/8x7B
- Llama 3 70B
- CodeLlama pour génération de code

### Option 3 : Hybride
- RAG avec embeddings OpenAI
- Generation avec modèle local

## Phases de Développement

### Phase 1 : MVP (2-3 jours)
- [ ] Scraper basique CSPR.cloud
- [ ] Base vectorielle ChromaDB
- [ ] API FastAPI simple
- [ ] Chat interface basique
- [ ] RAG fonctionnel

### Phase 2 : Enrichissement (3-4 jours)
- [ ] Indexation de vos 3 projets
- [ ] Tutoriels interactifs
- [ ] Interface React avancée
- [ ] Recherche sémantique

### Phase 3 : Avancé (optionnel)
- [ ] Générateur de code
- [ ] Sandbox d'exécution
- [ ] Analytics d'apprentissage
- [ ] Multi-langues (FR/EN)

## Métriques de Succès

- **Précision** : Réponses correctes >90%
- **Latence** : Réponse <3s
- **Coverage** : 100% de la doc CSPR.cloud indexée
- **UX** : Interface intuitive pour débutants

## Déploiement

- **Dev** : Docker local
- **Prod** : Vercel (frontend) + Railway/Render (backend)
- **CI/CD** : GitHub Actions
