'use client'

import { MessageSquare, BookOpen, Code, Github, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  currentView: 'chat' | 'tutorials' | 'generator'
  setCurrentView: (view: 'chat' | 'tutorials' | 'generator') => void
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const menuItems = [
    { id: 'chat' as const, icon: MessageSquare, label: 'Chat' },
    { id: 'tutorials' as const, icon: BookOpen, label: 'Tutorials' },
    { id: 'generator' as const, icon: Code, label: 'Generator' },
  ]

  return (
    <div className="w-20 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col items-center py-6 space-y-8">
      {/* Logo */}
      <div className="w-12 h-12 bg-gradient-to-br from-casper-primary to-casper-secondary rounded-xl flex items-center justify-center text-white font-bold text-xl">
        C
      </div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center transition-all',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              currentView === item.id
                ? 'bg-gradient-to-br from-casper-primary to-casper-secondary text-white'
                : 'text-gray-600 dark:text-gray-400'
            )}
            title={item.label}
          >
            <item.icon className="w-6 h-6" />
          </button>
        ))}
      </nav>

      {/* Bottom Icons */}
      <div className="flex flex-col space-y-4">
        <a
          href="https://github.com/le-stagiaire-ag2r/Casper-Learn-IA-"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          title="GitHub"
        >
          <Github className="w-6 h-6" />
        </a>
        <button
          className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          title="Settings"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
