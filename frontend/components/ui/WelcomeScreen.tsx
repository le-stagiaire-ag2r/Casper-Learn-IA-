'use client'

import { Sparkles, MessageSquare, BookOpen, Code, Zap } from 'lucide-react'

interface WelcomeScreenProps {
  onGetStarted: () => void
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI-Powered Chat',
      description: 'Ask anything about Casper Network and get instant, accurate answers',
    },
    {
      icon: BookOpen,
      title: 'Interactive Tutorials',
      description: 'Learn with step-by-step guides and hands-on exercises',
    },
    {
      icon: Code,
      title: 'Smart Contract Generator',
      description: 'Generate production-ready contracts with AI assistance',
    },
    {
      icon: Zap,
      title: 'Multi-Language Support',
      description: 'Available in 9 languages for global developers',
    },
  ]

  const quickQuestions = [
    'How do I query an account balance on Casper?',
    'Explain the CEP-18 token standard',
    'Show me how to deploy a smart contract',
    'What is the difference between Account Hash and Public Key?',
  ]

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-casper-primary to-casper-secondary mb-6 animate-float">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-casper-primary via-casper-secondary to-casper-accent bg-clip-text text-transparent">
            Welcome to Casper AI Assistant
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Your intelligent companion for learning Casper Network development.
            Powered by AI, backed by comprehensive documentation.
          </p>

          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-casper-primary to-casper-secondary text-white rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            Start Learning
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-casper-primary dark:hover:border-casper-primary transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-casper-primary/20 to-casper-secondary/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-casper-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Questions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold mb-6">Try asking...</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={onGetStarted}
                className="p-4 text-left bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              >
                <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-casper-primary transition-colors">
                  "{question}"
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-4xl font-bold bg-gradient-to-r from-casper-primary to-casper-secondary bg-clip-text text-transparent mb-2">
              1000+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Documentation Chunks</div>
          </div>
          <div>
            <div className="text-4xl font-bold bg-gradient-to-r from-casper-primary to-casper-secondary bg-clip-text text-transparent mb-2">
              3
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Real Projects Indexed</div>
          </div>
          <div>
            <div className="text-4xl font-bold bg-gradient-to-r from-casper-primary to-casper-secondary bg-clip-text text-transparent mb-2">
              9
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Languages Supported</div>
          </div>
        </div>
      </div>
    </div>
  )
}
