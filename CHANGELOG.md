# Changelog

All notable changes to Casper Interactive Learning will be documented in this file.

## [1.1.0] - 2024-11-22

### 🎖️ On-Chain NFT Badge System

Major feature release adding blockchain integration with NFT badge rewards.

#### ✨ New Features

**NFT Badge System**
- **Casper Wallet Integration** - Full Casper Signer wallet connection
- **Real-time CSPR Balance** - Display user's balance directly in the app header
- **Automatic NFT Minting** - Mint badges when completing quizzes with 80%+ score
- **8 Unique Badge Icons** - Each quiz has its own collectible emoji:
  - 🌟 Introduction to Casper
  - 🔑 Accounts and Keys
  - ⚙️ Introduction to Smart Contracts
  - 💻 Contract Development
  - 🪙 CEP-18 Standard (Fungible Tokens)
  - 🎨 CEP-78 Standard (NFTs)
  - 🔒 Staking Basics
  - 💎 Advanced Staking
- **Badge Gallery** - New homepage section displaying earned NFT badges
- **Minting Status** - Visual feedback showing badge minting progress
- **Testnet Integration** - Connected to Casper Testnet (rpc.testnet.casperlabs.io)

**UX Improvements**
- **Randomized Answer Positions** - Fixed issue where 90% of answers were in position #2
  - Now evenly distributed: 22% / 31% / 33% / 14%
  - Makes quizzes genuinely educational and unpredictable
- **Connect Wallet UI** - New header button with wallet state (connected/disconnected)
- **Badge Preview** - Show unique icon on quiz completion screen

#### 🛠️ Technical

- Added `casper-js-sdk@2.15.4` for blockchain interaction
- Created `lib/casper/wallet.ts` - CasperWalletService class
- Created `app/WalletContext.tsx` - Global wallet state management
- Created `components/Badges.tsx` - Badge gallery component
- Updated `components/Header.tsx` - Wallet connection UI
- Updated `components/QuizContent.tsx` - Badge minting trigger
- Updated `data/modules.json` - Randomized answers + badge icons

#### 🎨 UI/UX

- Badge minting animation with spinner
- Success confirmation message
- Unique emoji per quiz (8 different icons)
- Responsive badge gallery grid
- Hover effects on badge cards
- Empty states for no badges / wallet not connected

#### 📝 Documentation

- Updated README with NFT badge features
- Added badge system table with meanings
- Added blockchain integration section
- Updated version to 1.1.0
- Removed dev scripts from repository

---

## [1.0.0] - 2024-11-21

### 🎉 Initial Release

Complete interactive learning platform for Casper blockchain.

#### ✨ Features

- **50+ Interactive Quizzes** across 4 learning modules
- **Instant Feedback** with detailed explanations for every question
- **Progress Tracking** with localStorage persistence
- **3 Difficulty Levels**: Beginner, Intermediate, Advanced
- **Responsive Design** optimized for all devices
- **Modern UI** with Tailwind CSS and smooth animations

#### 📚 Content Modules

1. **Casper Basics** (13 questions)
   - Introduction to Casper Network
   - Accounts and Keys system
   - Highway consensus and architecture

2. **Smart Contracts** (13 questions)
   - Introduction to Smart Contracts
   - Advanced Contract Development
   - Rust, WebAssembly, URefs

3. **Tokens & NFTs** (12 questions)
   - CEP-18 Fungible Token Standard
   - CEP-78 NFT Standard
   - Token management and metadata

4. **Staking & Delegation** (11 questions)
   - Staking Basics
   - Advanced Staking Concepts
   - Validators and network security

#### 🛠️ Technical

- Next.js 14 with App Router
- TypeScript for type safety
- Static Site Generation (SSG)
- GitHub Pages deployment
- Zero backend dependencies
- Client-side state management

#### 📝 Documentation

- Comprehensive README
- Contributing guidelines
- MIT License

---

**Full Changelog**: https://github.com/le-stagiaire-ag2r/Casper-Learn-IA-/commits/main
