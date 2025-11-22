# 🎓 Casper Interactive Learning

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://le-stagiaire-ag2r.github.io/Casper-Learn-IA-/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Casper](https://img.shields.io/badge/Casper-Blockchain-red?style=for-the-badge)](https://casper.network/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

**Interactive learning platform for Casper blockchain with on-chain NFT badges**

Master Casper blockchain technology through 50+ interactive quizzes and earn unique NFT badges for your achievements. All content based on official Casper documentation with real blockchain integration.

---

## 🚀 Quick Start

**[Launch the Platform →](https://le-stagiaire-ag2r.github.io/Casper-Learn-IA-/)**

1. **Visit** the live platform
2. **Connect** your Casper wallet (optional)
3. **Complete** quizzes with 80%+ score
4. **Earn** unique NFT badges on Casper blockchain!

---

## ✨ Features

### 📚 Educational Content
- **50+ Interactive Quizzes** - Multiple-choice questions with instant feedback
- **4 Learning Modules** - Comprehensive coverage of Casper fundamentals
- **3 Difficulty Levels** - Beginner, Intermediate, Advanced
- **Detailed Explanations** - Learn from every answer with in-depth explanations
- **Randomized Questions** - Unpredictable answer positions for genuine learning
- **Progress Tracking** - Automatic save of your learning progress

### 🎖️ On-Chain NFT Badges (NEW!)
- **Casper Wallet Integration** - Connect via Casper Signer
- **Real-time CSPR Balance** - See your balance directly in the app
- **Automatic NFT Minting** - Earn badges when completing quizzes with 80%+ score
- **8 Unique Badge Icons** - Each quiz has its own collectible emoji:
  - 🌟 Introduction to Casper
  - 🔑 Accounts and Keys
  - ⚙️ Introduction to Smart Contracts
  - 💻 Contract Development
  - 🪙 CEP-18 Standard (Fungible Tokens)
  - 🎨 CEP-78 Standard (NFTs)
  - 🔒 Staking Basics
  - 💎 Advanced Staking
- **Badge Gallery** - Showcase your earned NFT badges on your profile
- **Testnet Integration** - Connected to Casper Testnet for safe testing

### 🎨 User Experience
- **Modern UI** - Beautiful, responsive design with Tailwind CSS
- **Smooth Animations** - Engaging transitions and visual feedback
- **Mobile Responsive** - Perfect experience on all devices
- **Offline Ready** - Works in your browser with localStorage
- **Fast Performance** - Static site generation for instant page loads

---

## 📖 Learning Content

### 1. 📚 Casper Basics (13 questions)
Learn the fundamentals of Casper Network
- Introduction to Casper blockchain
- Highway consensus protocol
- CSPR token and WebAssembly (Wasm)
- Account system and key management
- Multi-signature configuration

**Badges**: 🌟 Introduction to Casper, 🔑 Accounts and Keys

### 2. ⚙️ Smart Contracts (13 questions)
Master smart contract development
- Rust programming for Casper
- Session code vs Contract code
- Global State and URefs
- Entry points and gas costs
- Error handling and debugging

**Badges**: ⚙️ Introduction to Smart Contracts, 💻 Contract Development

### 3. 🪙 Tokens & NFTs (12 questions)
Create and manage digital assets
- CEP-18 fungible token standard
- CEP-78 advanced NFT standard
- Token transfers and allowances
- Metadata management
- Burning and minting mechanisms

**Badges**: 🪙 CEP-18 Standard, 🎨 CEP-78 Standard

### 4. 🔒 Staking & Delegation (11 questions)
Participate in network security
- Proof-of-Stake basics
- Delegation and validators
- Rewards and APY calculation
- Slashing mechanisms
- Advanced staking strategies

**Badges**: 🔒 Staking Basics, 💎 Advanced Staking

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Modern styling framework |
| **Casper JS SDK** | Blockchain interaction (v2.15.4) |
| **Casper Signer** | Wallet connection |
| **GitHub Pages** | Free hosting and deployment |
| **localStorage** | Client-side progress persistence |

---

## 🎮 How It Works

### Learning Journey
1. **Visit** the [live platform](https://le-stagiaire-ag2r.github.io/Casper-Learn-IA-/)
2. **Choose** a learning module (Basics, Contracts, Tokens, or Staking)
3. **Take** interactive quizzes with randomized questions
4. **Learn** from instant feedback and detailed explanations
5. **Track** your progress and scores automatically

### Earning NFT Badges
1. **Connect** your Casper wallet using Casper Signer
2. **Complete** any quiz with a score of 80% or higher
3. **Receive** an automatic NFT badge mint to your wallet
4. **Collect** all 8 unique badge icons
5. **Showcase** your achievements in the badge gallery

---

## 🎖️ Badge System

Each quiz completion with 80%+ score earns a unique NFT badge:

| Badge | Quiz | Represents |
|-------|------|------------|
| 🌟 | Introduction to Casper | Foundation knowledge |
| 🔑 | Accounts and Keys | Security & access control |
| ⚙️ | Intro to Smart Contracts | Technical mechanics |
| 💻 | Contract Development | Coding expertise |
| 🪙 | CEP-18 Standard | Fungible token mastery |
| 🎨 | CEP-78 Standard | NFT expertise |
| 🔒 | Staking Basics | Network participation |
| 💎 | Advanced Staking | Premium validator knowledge |

**All badges are minted on Casper Testnet as real NFTs!**

---

## 📊 Project Stats

- **50+** carefully crafted questions
- **8** interactive quizzes with unique NFT badges
- **4** comprehensive modules
- **3** difficulty levels
- **8** unique collectible badges
- **0** backend dependencies
- **100%** based on official Casper docs
- **On-chain** NFT rewards via Casper blockchain

---

## 🔗 Blockchain Integration

### Wallet Connection
- **Casper Signer** integration for secure wallet access
- **Real-time balance** display in CSPR
- **Testnet support** for safe experimentation
- **Session persistence** with automatic reconnection

### NFT Badge Minting
- **Automatic trigger** when quiz score >= 80%
- **Unique metadata** for each badge type
- **Testnet deployment** at `rpc.testnet.casperlabs.io`
- **Visual confirmation** of successful minting

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding New Questions

1. Fork the repository
2. Edit `data/modules.json`
3. Add questions following the existing format:
```json
{
  "id": "q1",
  "question": "Your question here?",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctAnswer": 0,
  "explanation": "Detailed explanation of the correct answer.",
  "difficulty": "beginner"
}
```
4. Ensure answers are randomized (not always in the same position)
5. Test locally with `npm run dev`
6. Submit a Pull Request

### Adding New Badge Icons

Each quiz should have a unique `badgeIcon` property:
```json
{
  "id": "new-quiz",
  "title": "New Quiz Title",
  "badgeIcon": "🚀"
}
```

### Improving Features

- Enhance wallet integration
- Add new blockchain features
- Improve UI/UX
- Fix bugs or optimize performance

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

Feel free to use, modify, and distribute this project!

---

## 🙏 Acknowledgments

- **[Casper Network](https://casper.network/)** - For the amazing blockchain technology
- **[Casper Association](https://casperassociation.org/)** - For supporting the ecosystem
- **Casper Community** - For feedback and support
- **All Contributors** - For making this project better

---

## 🔗 Links

- **Live Platform**: [https://le-stagiaire-ag2r.github.io/Casper-Learn-IA-/](https://le-stagiaire-ag2r.github.io/Casper-Learn-IA-/)
- **Casper Docs**: [https://docs.casper.network/](https://docs.casper.network/)
- **Casper GitHub**: [https://github.com/casper-network](https://github.com/casper-network)
- **Casper Testnet Explorer**: [https://testnet.cspr.live/](https://testnet.cspr.live/)
- **Report Issues**: [GitHub Issues](https://github.com/le-stagiaire-ag2r/Casper-Learn-IA-/issues)

---

## 📈 Version

**Current Version**: 1.1.0

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

### What's New in v1.1.0
- 🎖️ On-chain NFT badge system
- 🔗 Casper wallet integration
- 🎨 8 unique badge icons for each quiz
- 🔄 Randomized answer positions
- 💼 Real-time CSPR balance display
- 🖼️ Badge gallery showcase

---

<div align="center">

**Made with ❤️ for the Casper community**

⭐ Star this repo if you find it helpful!

🎖️ Earn NFT badges by completing quizzes!

[Start Learning](https://le-stagiaire-ag2r.github.io/Casper-Learn-IA-/) • [Connect Wallet](https://le-stagiaire-ag2r.github.io/Casper-Learn-IA-/) • [View Badges](https://le-stagiaire-ag2r.github.io/Casper-Learn-IA-/)

</div>
