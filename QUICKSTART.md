# 🚀 Guide de Démarrage Rapide

## Lancement en 5 minutes

### 1. Prérequis

```bash
# Vérifier Python
python --version  # Doit être 3.11+

# Vérifier pip
pip --version
```

### 2. Installation

```bash
# Installer les dépendances
pip install -r requirements.txt

# Cela va installer :
# - FastAPI & Uvicorn (API)
# - LangChain (RAG)
# - ChromaDB (base vectorielle)
# - BeautifulSoup (scraping)
# - OpenAI (LLM)
# - Et plus...
```

### 3. Configuration

```bash
# Copier le fichier d'environnement
cp .env.example .env

# Éditer avec votre éditeur préféré
nano .env
# ou
vim .env
# ou
code .env
```

**Ajouter votre clé OpenAI** :
```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxx
```

Obtenez votre clé sur : https://platform.openai.com/api-keys

### 4. Scraper la documentation

```bash
python scripts/scrape_docs.py
```

**Ce que fait ce script** :
- Se connecte à docs.cspr.cloud
- Découvre toutes les pages de documentation
- Extrait le contenu et les exemples de code
- Sauvegarde dans `data/docs/cspr_cloud_docs.json`

**Durée** : ~2-5 minutes selon votre connexion

### 5. Indexer les documents

```bash
python scripts/index_docs.py
```

**Ce que fait ce script** :
- Charge les documents scrapés
- Découpe en chunks de 1000 caractères
- Crée les embeddings vectoriels (all-MiniLM-L6-v2)
- Indexe dans ChromaDB
- Stocke dans `data/chromadb/`

**Durée** : ~3-10 minutes selon le nombre de docs

**Résultat attendu** :
```
✅ Indexation terminée: 500-1000 chunks au total
📊 500-1000 documents dans la base vectorielle
```

### 6. Lancer l'API

```bash
python backend/api/main.py
```

**Sortie attendue** :
```
🚀 Démarrage de l'API Casper Learn IA...
✅ RAG Engine initialisé avec succès
INFO:     Uvicorn running on http://0.0.0.0:8000
```

L'API est maintenant disponible sur :
- **API** : http://localhost:8000
- **Docs interactives** : http://localhost:8000/docs
- **Redoc** : http://localhost:8000/redoc

### 7. Ouvrir l'interface web

```bash
# Dans un navigateur, ouvrir :
firefox frontend/index.html
# ou
chrome frontend/index.html
# ou
open frontend/index.html  # macOS
```

Ou avec un serveur HTTP simple :
```bash
cd frontend
python -m http.server 3000
# Puis ouvrir http://localhost:3000
```

## 🧪 Test rapide via API

### Test 1 : Health check

```bash
curl http://localhost:8000/health
```

Résultat attendu :
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "rag_initialized": true
}
```

### Test 2 : Poser une question

```bash
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Comment interroger le solde d'\''un compte Casper?",
    "n_context": 5
  }'
```

Résultat attendu :
```json
{
  "answer": "Pour interroger le solde d'un compte Casper, vous pouvez...",
  "sources": [
    {
      "title": "Accounts API - Get Balance",
      "url": "https://docs.cspr.cloud/rest-api/accounts",
      "relevance": 0.89
    }
  ],
  "success": true
}
```

### Test 3 : Recherche sémantique

```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "CEP-18 token standard",
    "n_results": 3
  }'
```

### Test 4 : Statistiques

```bash
curl http://localhost:8000/stats
```

## 🐛 Dépannage

### Problème : "OPENAI_API_KEY non définie"

**Solution** :
```bash
# Vérifier que .env existe
cat .env

# Vérifier que la clé est définie
echo $OPENAI_API_KEY

# Exporter manuellement si besoin
export OPENAI_API_KEY="sk-proj-xxxxxxxx"
```

### Problème : "Collection 'casper_docs' not found"

**Solution** : Vous n'avez pas indexé les documents
```bash
python scripts/index_docs.py
```

### Problème : "No module named 'backend'"

**Solution** : Ajouter le répertoire au PYTHONPATH
```bash
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
python backend/api/main.py
```

### Problème : Le scraper ne trouve aucune page

**Solution** : Le site docs.cspr.cloud peut être temporairement indisponible ou avoir changé de structure
- Vérifier manuellement : https://docs.cspr.cloud/
- Adapter les URLs dans `scripts/scrape_docs.py` si nécessaire

### Problème : CORS error dans le frontend

**Solution** : L'API FastAPI a déjà CORS activé. Vérifiez que :
1. L'API tourne sur le bon port (8000)
2. Le frontend pointe vers la bonne URL dans `index.html` (ligne 491)

### Problème : Slow response times

**Causes possibles** :
1. **OpenAI API lente** : Normal, GPT-4 peut prendre 5-15s
2. **Trop de contextes** : Réduire `n_context` de 5 à 3
3. **Réseau lent** : Vérifier votre connexion internet

## 📊 Vérification de l'installation

Liste de contrôle :

- [ ] Python 3.11+ installé
- [ ] Dependencies installées (`pip install -r requirements.txt`)
- [ ] `.env` créé avec `OPENAI_API_KEY`
- [ ] Documentation scrapée (`data/docs/cspr_cloud_docs.json` existe)
- [ ] Documents indexés (`data/chromadb/` existe et contient des fichiers)
- [ ] API démarre sans erreur (`http://localhost:8000/health` retourne `healthy`)
- [ ] Frontend accessible et peut communiquer avec l'API

## 🎯 Prochaines étapes

Une fois que tout fonctionne :

1. **Tester avec différentes questions** :
   - Questions sur les APIs
   - Questions sur les smart contracts
   - Questions sur les tokens CEP
   - Questions sur les validateurs

2. **Personnaliser le système** :
   - Ajuster la température du LLM (backend/llm/rag_engine.py:67)
   - Changer le nombre de contextes récupérés
   - Modifier le prompt système
   - Ajouter d'autres sources de documentation

3. **Améliorer le frontend** :
   - Ajouter un thème sombre
   - Historique des conversations
   - Export de conversations
   - Recherche dans l'historique

4. **Optimisations** :
   - Caching des réponses fréquentes
   - Utiliser un LLM local (Ollama + Mistral/Llama)
   - Fine-tuning sur vos propres données

## 💡 Astuces

### Activer le mode debug

```bash
# Dans backend/api/main.py, ajouter :
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Utiliser GPT-3.5 au lieu de GPT-4 (plus rapide, moins cher)

```python
# Dans backend/llm/rag_engine.py, ligne 65, remplacer :
self.llm = ChatOpenAI(
    model="gpt-3.5-turbo",  # Au lieu de gpt-4-turbo-preview
    temperature=0.3,
)
```

### Scraper d'autres sources

Créez un nouveau scraper dans `scripts/` pour :
- Documentation officielle Casper
- GitHub repos (smart contracts exemples)
- Vos 3 autres projets
- Medium articles sur Casper

### Indexer vos propres projets

```python
# Ajouter dans scripts/index_docs.py
# Après avoir indexé CSPR.cloud, indexer vos projets :
import os

project_docs = []
for root, dirs, files in os.walk('../Casper-projet/'):
    for file in files:
        if file.endswith('.md') or file.endswith('.rst'):
            with open(os.path.join(root, file)) as f:
                content = f.read()
                project_docs.append({
                    'url': f'file://{os.path.join(root, file)}',
                    'title': file,
                    'content': content,
                    'code_examples': [],
                    'source': 'casper-projet'
                })

# Puis indexer ces docs aussi
```

## 🎉 Succès !

Si vous êtes arrivés ici, félicitations ! Vous avez maintenant :
- ✅ Un assistant IA fonctionnel pour apprendre Casper
- ✅ Une base de connaissances complète et cherchable
- ✅ Une API REST pour intégrations
- ✅ Une interface web interactive

**Bon hackathon ! 🚀**
