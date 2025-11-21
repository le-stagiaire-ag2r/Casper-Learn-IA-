'use client';

import { useLanguage } from '@/app/LanguageContext';
import Link from 'next/link';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

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
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  language === 'en'
                    ? 'bg-casper-primary text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  language === 'fr'
                    ? 'bg-casper-primary text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                FR
              </button>
            </div>
            <span className="text-casper-primary font-bold text-lg">CSPR</span>
          </div>
        </div>
      </div>
    </header>
  );
}
