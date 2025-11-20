'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import ChatMessage from './ChatMessage'
import { sendMessage } from '@/lib/api'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: Array<{
    title: string
    url: string
    relevance: number
  }>
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await sendMessage(input, 'en') // Get from language context

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        sources: response.sources,
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure the backend API is running at http://localhost:8000',
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-casper-primary to-casper-secondary flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Start a Conversation</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Ask me anything about Casper Network development
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}

          {isLoading && (
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-casper-primary to-casper-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce typing-dot"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce typing-dot"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce typing-dot"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative flex items-end space-x-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about Casper Network..."
              rows={1}
              className="flex-1 resize-none rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-casper-primary focus:border-transparent max-h-32 overflow-y-auto"
              style={{
                minHeight: '48px',
                maxHeight: '128px',
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 w-10 h-10 rounded-xl bg-gradient-to-r from-casper-primary to-casper-secondary text-white flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Powered by Groq AI • Press Enter to send, Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  )
}
