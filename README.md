# 🎓 Casper Interactive Learning

Plateforme d'apprentissage interactive pour la blockchain Casper. Apprenez Casper de manière ludique avec des quiz interactifs et un suivi de progression.

![Casper Learning](https://img.shields.io/badge/Casper-Learning-FF0011?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)

## ✨ Fonctionnalités

- 📚 **4 Modules d'apprentissage** : Casper Basics, Smart Contracts, Tokens & NFTs, Staking
- ❓ **Quiz interactifs** : Questions à choix multiples avec feedback instantané
- 💡 **Explications détaillées** : Apprenez de vos erreurs avec des explications claires
- 📊 **Suivi de progression** : Visualisez votre avancement et vos scores
- 🎯 **Niveaux de difficulté** : Débutant, Intermédiaire, Avancé
- 💾 **Sauvegarde locale** : Progression sauvegardée dans votre navigateur
- 🎨 **Interface moderne** : Design responsive avec Tailwind CSS

## 🚀 Démarrage rapide

### Installation

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build pour production

```bash
# Build et export statique
npm run export

# Les fichiers seront dans le dossier /out
```

## 📖 Modules disponibles

### 1. Casper Basics 📚
Introduction aux fondamentaux de Casper Network
- Qu'est-ce que Casper ?
- Le token CSPR
- Le consensus Highway
- Architecture et upgrades

### 2. Smart Contracts ⚙️
Maîtrisez le développement de smart contracts
- Langage Rust
- Session code
- Global State
- Gas et coûts

### 3. Tokens & NFTs 🪙
Créez et gérez des tokens
- Standard CEP-18 (tokens fungibles)
- Standard CEP-78 (NFTs)
- Transferts et allowances
- Métadonnées et ownership

### 4. Staking & Délégation 🔒
Participez à la sécurité du réseau
- Mécanisme de staking
- Délégation de tokens
- Validateurs
- Récompenses et APY

## 🛠️ Stack technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Déploiement** : GitHub Pages
- **Données** : JSON local
- **État** : React Hooks + localStorage

## 📁 Structure du projet

```
Casper-Learn-IA-/
├── app/                    # Pages Next.js
│   ├── page.tsx           # Page d'accueil
│   ├── module/[id]/       # Pages des modules
│   └── quiz/[id]/         # Pages des quiz
├── components/            # Composants React (futures extensions)
├── data/                  # Données des quiz (JSON)
│   └── modules.json      # Tous les modules et quiz
├── types/                 # Types TypeScript
│   └── index.ts          # Interfaces et types
├── public/               # Assets statiques
└── next.config.js        # Configuration Next.js pour GitHub Pages
```

## 🎮 Comment utiliser

1. **Choisissez un module** sur la page d'accueil
2. **Sélectionnez un quiz** dans le module
3. **Répondez aux questions** en sélectionnant une option
4. **Validez** pour voir si votre réponse est correcte
5. **Lisez l'explication** pour approfondir vos connaissances
6. **Visualisez vos résultats** à la fin du quiz

## 🌐 Déploiement sur GitHub Pages

Le projet est configuré pour être déployé sur GitHub Pages.

### Configuration automatique

1. Push sur la branche principale
2. GitHub Actions build et déploie automatiquement
3. Votre site sera disponible sur : `https://[username].github.io/Casper-Learn-IA-/`

### Déploiement manuel

```bash
# Build et export
npm run deploy

# Commit les fichiers dans /out
git add out
git commit -m "Deploy to GitHub Pages"
git push
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour ajouter de nouveaux quiz :

1. Éditez `data/modules.json`
2. Ajoutez vos questions au format existant
3. Testez localement
4. Soumettez une Pull Request

## 📝 Format des questions

```json
{
  "id": "q1",
  "question": "Votre question ici ?",
  "options": [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4"
  ],
  "correctAnswer": 1,
  "explanation": "Explication détaillée de la réponse correcte.",
  "difficulty": "beginner"
}
```

## 📄 Licence

MIT License - Faites-en bon usage !

## 🙏 Remerciements

- Casper Association pour l'écosystème
- La communauté Casper pour le support
- Tous les contributeurs

---

Made with ❤️ for the Casper community | Learn, Practice, Master 🚀
