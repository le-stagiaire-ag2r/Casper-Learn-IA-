import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from './LanguageContext';
import { WalletProvider } from './WalletContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Casper Interactive Learning',
  description: 'Interactive learning platform for Casper blockchain with NFT badges for achievements',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <LanguageProvider>
          <WalletProvider>
            <Header />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </WalletProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
