# Casper AI Learning Assistant - Frontend

Modern React frontend for the Casper AI Learning Assistant.

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

### Export Static Site

```bash
npm run export
```

This creates an `out/` directory with static files ready for GitHub Pages.

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Custom components with Lucide icons
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Markdown**: react-markdown
- **Code Highlighting**: react-syntax-highlighter

## 🎨 Features

- Modern chat interface (ChatGPT-like)
- Dark/Light theme support
- Multi-language selector (9 languages)
- Real-time typing indicators
- Code syntax highlighting
- Source citations with links
- Responsive design
- Animated gradients

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── chat/
│   │   ├── ChatInterface.tsx
│   │   └── ChatMessage.tsx
│   └── ui/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       ├── WelcomeScreen.tsx
│       └── theme-provider.tsx
├── lib/
│   ├── api.ts              # API client
│   └── utils.ts            # Utilities
└── public/                 # Static assets
```

## 🌍 Multi-Language Support

Supported languages:
- 🇬🇧 English
- 🇫🇷 Français
- 🇪🇸 Español
- 🇩🇪 Deutsch
- 🇮🇹 Italiano
- 🇵🇹 Português
- 🇨🇳 中文
- 🇯🇵 日本語
- 🇰🇷 한국어

## 🚢 Deployment

### GitHub Pages

1. Update `next.config.js` with your repository name
2. Build and export:
   ```bash
   npm run export
   ```
3. Deploy the `out/` directory to GitHub Pages

### Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Next.js
3. Deploy!

## 🔧 Configuration

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, update with your deployed backend URL.

## 📝 License

MIT
