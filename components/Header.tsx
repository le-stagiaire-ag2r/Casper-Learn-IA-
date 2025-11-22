'use client';

import { useLanguage } from '@/app/LanguageContext';
import { useWallet } from '@/app/WalletContext';
import Link from 'next/link';

export default function Header() {
  const { t } = useLanguage();
  const { connected, publicKey, balance, connect, disconnect, isLoading } = useWallet();

  const formatPublicKey = (key: string) => {
    return `${key.slice(0, 8)}...${key.slice(-6)}`;
  };

  return (
    <header className="border-b border-gray-700 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="text-3xl">🎓</div>
            <div>
              <h1 className="text-xl font-bold text-white">
                {t('header.title')}
              </h1>
              <p className="text-sm text-gray-400">
                {t('header.subtitle')}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {connected && publicKey ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <div className="text-xs text-gray-400">Balance</div>
                  <div className="text-sm font-bold text-casper-primary">{balance} CSPR</div>
                </div>
                <div className="bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
                  <div className="text-xs text-gray-400">Connected</div>
                  <div className="text-sm font-mono text-white">{formatPublicKey(publicKey)}</div>
                </div>
                <button
                  onClick={disconnect}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={isLoading}
                className="px-6 py-2 bg-gradient-to-r from-casper-primary to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    🔗 Connect Wallet
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
