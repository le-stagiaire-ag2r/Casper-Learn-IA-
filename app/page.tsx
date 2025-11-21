'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center space-y-8 px-4">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="text-7xl mb-6 animate-bounce">🎓</div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-casper-primary via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Casper Interactive Learning
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Master Casper blockchain through interactive quizzes
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>50+ Questions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Instant Feedback</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Track Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>3 Difficulty Levels</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <Link
            href="/module/casper-basics"
            className="inline-block px-12 py-5 bg-gradient-to-r from-casper-primary to-pink-500 text-white text-xl font-bold rounded-xl hover:scale-105 transition-transform shadow-2xl hover:shadow-casper-primary/50"
          >
            Start Learning →
          </Link>
        </div>

        {/* Topics Preview */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-3xl mb-2">📚</div>
            <div className="font-semibold text-white">Casper Basics</div>
            <div className="text-gray-400 text-xs mt-1">Highway, CSPR, Wasm</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-3xl mb-2">⚙️</div>
            <div className="font-semibold text-white">Smart Contracts</div>
            <div className="text-gray-400 text-xs mt-1">Rust, URefs, Gas</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-3xl mb-2">🪙</div>
            <div className="font-semibold text-white">Tokens & NFTs</div>
            <div className="text-gray-400 text-xs mt-1">CEP-18, CEP-78</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-3xl mb-2">🔒</div>
            <div className="font-semibold text-white">Staking</div>
            <div className="text-gray-400 text-xs mt-1">Validators, Rewards</div>
          </div>
        </div>

        {/* Powered by */}
        <div className="pt-8 text-gray-500 text-sm">
          Powered by official <span className="text-casper-primary font-semibold">Casper</span> documentation
        </div>
      </div>
    </div>
  );
}
