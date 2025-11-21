import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Casper Interactive Learning',
  description: 'Plateforme d\'apprentissage interactive pour Casper blockchain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <header className="border-b border-gray-700 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🎓</div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    Casper Interactive Learning
                  </h1>
                  <p className="text-sm text-gray-400">
                    Apprenez la blockchain Casper de manière interactive
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-casper-primary font-bold text-lg">CSPR</span>
              </div>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-700 mt-16 py-8 bg-black/30">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>Made with ❤️ for the Casper community</p>
            <p className="text-sm mt-2">Learn, Practice, Master Casper Blockchain</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
