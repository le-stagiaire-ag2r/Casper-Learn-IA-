'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@/app/WalletContext';
import { useLanguage } from '@/app/LanguageContext';
import modulesData from '@/data/modules.json';

interface Badge {
  moduleId: string;
  quizId: string;
  score: number;
  completedAt: string;
}

export default function Badges() {
  const { t } = useLanguage();
  const { connected, publicKey } = useWallet();
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load earned badges from localStorage
    const progress = localStorage.getItem('casper-learning-progress');
    if (progress) {
      const progressData = JSON.parse(progress);
      // Filter only badges with score >= 80% (those that earned NFT badges)
      const earnedBadges = progressData.filter((p: Badge) => p.score >= 80);
      setBadges(earnedBadges);
    }
  }, []);

  if (!connected) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 text-center">
        <div className="text-5xl mb-4">🔗</div>
        <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
        <p className="text-gray-400">
          Connect your Casper wallet to see your earned NFT badges
        </p>
      </div>
    );
  }

  if (badges.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 text-center">
        <div className="text-5xl mb-4">🎖️</div>
        <h3 className="text-xl font-bold mb-2">No Badges Yet</h3>
        <p className="text-gray-400">
          Complete quizzes with 80% or higher to earn NFT badges!
        </p>
      </div>
    );
  }

  const getBadgeInfo = (badge: Badge) => {
    const module = modulesData.find(m => m.id === badge.moduleId);
    const quiz = module?.quizzes.find(q => q.id === badge.quizId);
    const badgeIcon = (quiz as any)?.badgeIcon || '🏆';
    return { module, quiz, badgeIcon };
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <span>🎖️</span>
        <span>Your NFT Badges</span>
        <span className="text-sm text-gray-400 font-normal">({badges.length})</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge, index) => {
          const { module, quiz, badgeIcon } = getBadgeInfo(badge);

          return (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-casper-primary transition-all hover:scale-105"
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">{badgeIcon}</div>
                <div className="text-3xl font-bold text-casper-primary">{badge.score}%</div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-lg">{quiz?.title || 'Quiz'}</h3>
                <p className="text-sm text-gray-400">{module?.title || 'Module'}</p>

                <div className="pt-2 border-t border-gray-700">
                  <div className="text-xs text-gray-500">
                    {new Date(badge.completedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-center gap-2 text-xs text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>NFT Badge Minted</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
