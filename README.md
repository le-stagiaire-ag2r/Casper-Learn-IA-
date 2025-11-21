# 🎓 Casper Interactive Learning

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Casper](https://img.shields.io/badge/Casper-Learning-FF0011?style=for-the-badge)](https://casper.network/)

**[English](#english)** | **[Français](#français)**

---

<a name="english"></a>
## 🇬🇧 English

### Interactive learning platform for Casper blockchain

Learn Casper blockchain technology through interactive quizzes and hands-on exercises. Master smart contracts, tokens, NFTs, and staking with instant feedback and progress tracking.

### ✨ Features

- 📚 **4 Learning Modules**: Casper Basics, Smart Contracts, Tokens & NFTs, Staking
- ❓ **60+ Interactive Quizzes**: Multiple-choice questions with instant feedback
- 💡 **Detailed Explanations**: Learn from mistakes with comprehensive explanations
- 📊 **Progress Tracking**: Visualize your advancement and scores
- 🎯 **3 Difficulty Levels**: Beginner, Intermediate, Advanced
- 💾 **Local Save**: Progress saved in your browser
- 🌍 **Bilingual**: English and French support
- 🎨 **Modern UI**: Responsive design with Tailwind CSS

### 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 📦 Build for Production

```bash
# Build and export static site
npm run build

# Files will be in /out directory
```

### 📖 Learning Modules

#### 1. Casper Basics 📚
Introduction to Casper Network fundamentals
- What is Casper?
- CSPR token & Highway consensus
- WebAssembly & Architecture
- Accounts, Keys & Permissions

#### 2. Smart Contracts ⚙️
Master smart contract development on Casper
- Rust programming language
- Session code vs Contract code
- Global State & URefs
- Gas costs & Error handling

#### 3. Tokens & NFTs 🪙
Create and manage tokens on Casper
- CEP-18 standard (fungible tokens)
- CEP-78 standard (NFTs)
- Transfers & Allowances
- Metadata & Ownership modes

#### 4. Staking & Delegation 🔒
Participate in network security
- Staking mechanism
- Token delegation
- Validators & Rewards
- Slashing & Economics

### 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages
- **Data**: Static JSON
- **State**: React Hooks + localStorage

### 📁 Project Structure

```
Casper-Learn-IA-/
├── app/                    # Next.js pages
│   ├── page.tsx           # Home page
│   ├── module/[id]/       # Module pages
│   ├── quiz/[id]/         # Quiz pages
│   └── LanguageContext.tsx # i18n context
├── components/            # React components
│   ├── Header.tsx        # Header with language switcher
│   ├── Footer.tsx        # Footer
│   ├── ModuleContent.tsx # Module display
│   └── QuizContent.tsx   # Quiz logic
├── data/                  # Quiz data (JSON)
│   └── modules.json      # All modules and quizzes
├── types/                 # TypeScript types
└── public/               # Static assets
```

### 🎮 How to Use

1. **Choose a module** on the home page
2. **Select a quiz** within the module
3. **Answer questions** by selecting an option
4. **Validate** to see if your answer is correct
5. **Read the explanation** to deepen your knowledge
6. **View your results** at the end of the quiz

### 🌐 Deployment on GitHub Pages

The project is configured for GitHub Pages deployment.

```bash
# Build and export
npm run build

# Files are in /out directory
# Push to main branch
# GitHub Actions will deploy automatically
```

Your site will be available at: `https://[username].github.io/Casper-Learn-IA-/`

### 🤝 Contributing

Contributions are welcome! To add new quizzes:

1. Edit `data/modules.json`
2. Add your questions in the existing format
3. Test locally
4. Submit a Pull Request

### 📄 License

MIT License - Feel free to use and modify!

### 🙏 Acknowledgments

- Casper Association for the ecosystem
- Casper community for support
- All contributors

---

<a name="français"></a>
## 🇫🇷 Français

### Plateforme d'apprentissage interactive pour la blockchain Casper

Apprenez la technologie blockchain Casper à travers des quiz interactifs et des exercices pratiques. Maîtrisez les smart contracts, tokens, NFTs et le staking avec feedback instantané et suivi de progression.

### ✨ Fonctionnalités

- 📚 **4 Modules d'apprentissage** : Casper Basics, Smart Contracts, Tokens & NFTs, Staking
- ❓ **60+ Quiz interactifs** : Questions à choix multiples avec feedback instantané
- 💡 **Explications détaillées** : Apprenez de vos erreurs avec des explications complètes
- 📊 **Suivi de progression** : Visualisez votre avancement et vos scores
- 🎯 **3 Niveaux de difficulté** : Débutant, Intermédiaire, Avancé
- 💾 **Sauvegarde locale** : Progression sauvegardée dans votre navigateur
- 🌍 **Bilingue** : Support anglais et français
- 🎨 **Interface moderne** : Design responsive avec Tailwind CSS

### 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### 📦 Build pour production

```bash
# Build et export statique
npm run build

# Les fichiers seront dans le dossier /out
```

### 📖 Modules disponibles

#### 1. Casper Basics 📚
Introduction aux fondamentaux de Casper Network
- Qu'est-ce que Casper ?
- Token CSPR & consensus Highway
- WebAssembly & Architecture
- Comptes, Clés & Permissions

#### 2. Smart Contracts ⚙️
Maîtrisez le développement de smart contracts
- Langage Rust
- Session code vs Contract code
- Global State & URefs
- Coûts gas & Gestion d'erreurs

#### 3. Tokens & NFTs 🪙
Créez et gérez des tokens
- Standard CEP-18 (tokens fungibles)
- Standard CEP-78 (NFTs)
- Transferts & Allowances
- Métadonnées & Modes de propriété

#### 4. Staking & Délégation 🔒
Participez à la sécurité du réseau
- Mécanisme de staking
- Délégation de tokens
- Validateurs & Récompenses
- Slashing & Économie

### 🛠️ Stack technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Déploiement** : GitHub Pages
- **Données** : JSON statique
- **État** : React Hooks + localStorage

### 🎮 Comment utiliser

1. **Choisissez un module** sur la page d'accueil
2. **Sélectionnez un quiz** dans le module
3. **Répondez aux questions** en sélectionnant une option
4. **Validez** pour voir si votre réponse est correcte
5. **Lisez l'explication** pour approfondir vos connaissances
6. **Visualisez vos résultats** à la fin du quiz

### 🌐 Déploiement sur GitHub Pages

Le projet est configuré pour le déploiement sur GitHub Pages.

```bash
# Build et export
npm run build

# Les fichiers sont dans /out
# Push vers la branche main
# GitHub Actions déploiera automatiquement
```

Votre site sera disponible sur : `https://[username].github.io/Casper-Learn-IA-/`

### 🤝 Contribution

Les contributions sont les bienvenues ! Pour ajouter de nouveaux quiz :

1. Éditez `data/modules.json`
2. Ajoutez vos questions au format existant
3. Testez localement
4. Soumettez une Pull Request

### 📄 Licence

Licence MIT - Utilisez et modifiez librement !

### 🙏 Remerciements

- Casper Association pour l'écosystème
- La communauté Casper pour le support
- Tous les contributeurs

---

Made with ❤️ for the Casper community | Fait avec ❤️ pour la communauté Casper
