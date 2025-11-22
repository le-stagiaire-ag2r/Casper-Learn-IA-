'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { walletService, WalletState } from '@/lib/casper/wallet';

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  balance: string;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    publicKey: null,
    accountHash: null,
  });
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);

  // Load wallet state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('casper-wallet-state');
    if (savedState) {
      const state = JSON.parse(savedState);
      setWalletState(state);

      // Fetch balance if connected
      if (state.connected && state.publicKey) {
        fetchBalance(state.publicKey);
      }
    }
  }, []);

  const fetchBalance = async (publicKey: string) => {
    try {
      const bal = await walletService.getBalance(publicKey);
      setBalance(bal);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const connect = async () => {
    setIsLoading(true);
    try {
      const state = await walletService.connect();
      setWalletState(state);
      localStorage.setItem('casper-wallet-state', JSON.stringify(state));

      // Fetch balance
      if (state.publicKey) {
        await fetchBalance(state.publicKey);
      }
    } catch (error: any) {
      console.error('Connection error:', error);
      alert(error.message || 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    setIsLoading(true);
    try {
      await walletService.disconnect();
      setWalletState({
        connected: false,
        publicKey: null,
        accountHash: null,
      });
      setBalance('0');
      localStorage.removeItem('casper-wallet-state');
    } catch (error) {
      console.error('Disconnect error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        ...walletState,
        connect,
        disconnect,
        balance,
        isLoading,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}
