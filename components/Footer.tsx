'use client';

import { useLanguage } from '@/app/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-700 mt-16 py-8 bg-black/30">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>{t('footer.made')}</p>
        <p className="text-sm mt-2">{t('footer.tagline')}</p>
      </div>
    </footer>
  );
}
