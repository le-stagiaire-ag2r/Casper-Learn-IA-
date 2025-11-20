'use client'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { User, ExternalLink } from 'lucide-react'

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

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-start space-x-4 message-enter ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser
          ? 'bg-gray-200 dark:bg-gray-700'
          : 'bg-gradient-to-br from-casper-primary to-casper-secondary'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <span className="text-white text-sm font-bold">AI</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        <div className={`rounded-2xl p-4 ${
          isUser
            ? 'bg-gradient-to-r from-casper-primary to-casper-secondary text-white ml-auto max-w-3xl'
            : 'bg-gray-100 dark:bg-gray-800 max-w-full'
        }`}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-lg my-2"
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code {...props} className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm">
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Sources */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-2">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              📚 Sources:
            </p>
            {message.sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-sm text-casper-primary hover:text-casper-secondary transition-colors group"
              >
                <span className="flex items-center space-x-2">
                  <ExternalLink className="w-4 h-4" />
                  <span className="group-hover:underline">{source.title}</span>
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(source.relevance * 100)}% relevant
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
