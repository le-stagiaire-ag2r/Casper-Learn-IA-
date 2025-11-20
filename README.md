# Casper AI Learning Assistant 🚀

**An intelligent AI assistant for learning Casper Network development**

A comprehensive learning platform powered by AI (RAG + LLM) to teach Casper Network development. Automatically indexes CSPR.cloud documentation and real project examples to provide contextual, accurate answers.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://le-stagiaire-ag2r.github.io/Casper-Learn-IA-/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🇫🇷 Version Française](README.fr.md)

---

## 🎯 Features

### 🤖 **Intelligent AI Chat**
- ChatGPT-like interface with modern UI
- RAG (Retrieval-Augmented Generation) for accurate, contextual answers
- Real code examples from production projects
- Source citations with direct documentation links

### 📚 **Comprehensive Knowledge Base**
- Complete CSPR.cloud documentation indexed
- 3 real Casper projects integrated:
  - [Casper-projet v4.0.0](https://github.com/le-stagiaire-ag2r/Casper-projet)
  - [Casper-Clicker](https://github.com/le-stagiaire-ag2r/Casper-Clicker)
  - [CasperSecure](https://github.com/le-stagiaire-ag2r/CasperSecure)
- Semantic search through 1000+ documentation chunks
- Code examples automatically extracted and indexed

### 🌍 **Multi-Language Support**
Support for 9 languages:
- 🇬🇧 English
- 🇫🇷 French
- 🇪🇸 Spanish
- 🇩🇪 German
- 🇮🇹 Italian
- 🇵🇹 Portuguese
- 🇨🇳 Chinese
- 🇯🇵 Japanese
- 🇰🇷 Korean

### 🎓 **Interactive Tutorials**
- Structured learning paths from beginner to advanced
- Interactive exercises with automatic validation
- Progress tracking and achievements
- Code challenges with real-time feedback

### ⚡ **Smart Contract Generator**
- Pre-built templates (ERC-20, NFT, DeFi)
- AI-powered custom contract generation
- Step-by-step wizard interface
- Best practices automatically applied
- Code validation and security checks

### 🛠️ **Developer Tools**
- Syntax validation for Rust smart contracts
- Code explanation and documentation
- Integration examples for CSPR.cloud API
- Common patterns and best practices

---

## 🏗️ Architecture

```
Frontend: React + Next.js + TailwindCSS + shadcn/ui
Backend: FastAPI + LangChain + ChromaDB
LLM: Groq API (Mixtral-8x7b) - FREE & Fast
Embeddings: Sentence Transformers
Vector DB: ChromaDB (persistent)
Deployment: GitHub Pages (frontend) + Railway (backend)
```

### Why This Stack?

✅ **100% Free** - No hosting or API costs
✅ **Fast** - Groq API is 10x faster than OpenAI
✅ **Modern** - React UI like ChatGPT/Claude
✅ **Scalable** - Can handle thousands of users
✅ **Open Source** - All code available

---

## 📋 Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.11+ (for backend)
- **Groq API Key** (free at [console.groq.com](https://console.groq.com))
- **Git** (to clone projects)

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/le-stagiaire-ag2r/Casper-Learn-IA-.git
cd Casper-Learn-IA-
```

### 2. Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
```

### 3. Index Documentation & Projects

```bash
# Scrape CSPR.cloud documentation
python scripts/scrape_docs.py

# Clone and index your 3 GitHub projects
python scripts/index_github_projects.py

# Create vector embeddings and index everything
python scripts/index_docs.py
```

**Expected result:**
- ~100+ documentation pages scraped
- ~1000+ code chunks indexed
- ~50+ smart contract examples

### 4. Start Backend API

```bash
python backend/api/main.py
```

API will be available at `http://localhost:8000`

### 5. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:3000`

---

## 🎨 Project Structure

```
Casper-Learn-IA/
├── frontend/                   # React + Next.js app
│   ├── app/                    # Next.js 14 app directory
│   ├── components/             # React components
│   │   ├── chat/               # Chat interface
│   │   ├── tutorials/          # Tutorial system
│   │   ├── generator/          # Contract generator
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/                    # Utilities
│   ├── locales/                # i18n translations
│   └── public/                 # Static assets
│
├── backend/                    # FastAPI backend
│   ├── api/                    # API routes
│   │   ├── main.py             # Main API app
│   │   ├── chat.py             # Chat endpoints
│   │   ├── tutorials.py        # Tutorial endpoints
│   │   └── generator.py        # Generator endpoints
│   ├── llm/                    # LLM logic
│   │   ├── rag_engine.py       # RAG implementation
│   │   ├── groq_client.py      # Groq API client
│   │   └── prompts.py          # System prompts
│   ├── vectordb/               # Vector database
│   │   └── chroma_manager.py   # ChromaDB manager
│   └── utils/                  # Utilities
│
├── scripts/                    # Setup scripts
│   ├── scrape_docs.py          # CSPR.cloud scraper
│   ├── index_github_projects.py # GitHub indexer
│   └── index_docs.py           # Vector indexing
│
├── data/                       # Data storage
│   ├── docs/                   # Scraped documentation
│   ├── projects/               # Cloned GitHub projects
│   └── chromadb/               # Vector database
│
└── docs/                       # Documentation
    ├── ARCHITECTURE.md         # Technical architecture
    ├── DEPLOYMENT.md           # Deployment guide
    └── CONTRIBUTING.md         # Contributing guide
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```bash
# LLM Configuration (choose one)
GROQ_API_KEY=gsk_xxxxxxxxxxxxx          # FREE - Recommended
OPENAI_API_KEY=sk-proj-xxxxxxxx         # Optional: for GPT-4

# Backend Configuration
API_HOST=0.0.0.0
API_PORT=8000

# Vector Database
CHROMA_PATH=./data/chromadb

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Get Free Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up (free)
3. Create API key
4. Copy to `.env` file

**Groq advantages:**
- ✅ 100% FREE
- ✅ 10x faster than OpenAI
- ✅ No rate limits for individuals
- ✅ Mixtral-8x7b quality comparable to GPT-3.5

---

## 📚 Usage

### Web Interface

1. Open `http://localhost:3000`
2. Select your language (top right)
3. Start asking questions about Casper!

**Example questions:**
- "How do I query an account balance on Casper?"
- "Explain the CEP-18 token standard"
- "Show me how to create a smart contract"
- "Generate a CEP-18 token contract for me"

### API Endpoints

#### Ask a Question

```bash
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "How to deploy a smart contract on Casper?",
    "language": "en"
  }'
```

#### Search Documentation

```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "CEP-18 implementation",
    "n_results": 5
  }'
```

#### Generate Smart Contract

```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "cep18",
    "name": "MyToken",
    "symbol": "MTK"
  }'
```

---

## 🎓 Tutorials

The platform includes interactive tutorials:

1. **Casper Basics**
   - Blockchain fundamentals
   - Proof-of-Stake concepts
   - Account model

2. **Smart Contract Development**
   - Rust basics for Casper
   - Contract structure
   - Testing and deployment

3. **Token Standards**
   - CEP-18 (Fungible tokens)
   - CEP-47 (NFTs)
   - CEP-78 (Enhanced NFTs)

4. **CSPR.cloud API**
   - REST API usage
   - WebSocket streaming
   - Integration examples

---

## 🚢 Deployment

### Frontend (GitHub Pages)

```bash
cd frontend
npm run build
npm run export

# Deploy to GitHub Pages
git add out/
git commit -m "Deploy frontend"
git push origin gh-pages
```

### Backend (Railway)

1. Create account on [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add environment variables (GROQ_API_KEY)
4. Deploy automatically

**Alternative backends:**
- Vercel (with serverless functions)
- Render (free tier)
- Fly.io (free tier)

---

## 🧪 Testing

```bash
# Backend tests
pytest backend/tests/

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📖 Resources

- [CSPR.cloud Documentation](https://docs.cspr.cloud/)
- [Casper Network](https://casper.network/)
- [Groq API](https://console.groq.com)
- [LangChain](https://python.langchain.com/)
- [ChromaDB](https://www.trychroma.com/)

---

## 📝 Related Projects

- [Casper-projet v4.0.0](https://github.com/le-stagiaire-ag2r/Casper-projet)
- [Casper-Clicker](https://github.com/le-stagiaire-ag2r/Casper-Clicker)
- [CasperSecure](https://github.com/le-stagiaire-ag2r/CasperSecure)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 👨‍💻 Author

Created for the Casper Network Hackathon

---

## ⭐ Show Your Support

If this project helped you learn Casper, give it a ⭐️!

---

**Happy Learning! 🚀📚**
