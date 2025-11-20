'use client'

import { useState } from 'react'
import ChatInterface from '@/components/chat/ChatInterface'
import Sidebar from '@/components/ui/Sidebar'
import Header from '@/components/ui/Header'
import WelcomeScreen from '@/components/ui/WelcomeScreen'

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentView, setCurrentView] = useState<'chat' | 'tutorials' | 'generator'>('chat')

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          {showWelcome ? (
            <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />
          ) : (
            <>
              {currentView === 'chat' && <ChatInterface />}
              {currentView === 'tutorials' && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Tutorials Coming Soon</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Interactive learning paths are being developed
                    </p>
                  </div>
                </div>
              )}
              {currentView === 'generator' && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Smart Contract Generator</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      AI-powered contract generation coming soon
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
