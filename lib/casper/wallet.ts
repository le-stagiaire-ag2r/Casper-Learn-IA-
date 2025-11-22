/**
 * Casper Wallet Service
 * Handles wallet connection and blockchain interactions
 */

import { CasperClient, CLPublicKey, DeployUtil } from 'casper-js-sdk';

// Casper Testnet RPC
const CASPER_RPC = 'https://rpc.testnet.casperlabs.io/rpc';
const CASPER_NETWORK = 'casper-test';

// Badge NFT Contract Hash (will be deployed)
// This will be updated after contract deployment
export const BADGE_CONTRACT_HASH = 'hash-YOUR_CONTRACT_HASH_HERE';

export interface WalletState {
  connected: boolean;
  publicKey: string | null;
  accountHash: string | null;
}

class CasperWalletService {
  private client: CasperClient;

  constructor() {
    this.client = new CasperClient(CASPER_RPC);
  }

  /**
   * Check if Casper Signer extension is installed
   */
  isCasperSignerInstalled(): boolean {
    return typeof window !== 'undefined' && window.CasperWalletProvider !== undefined;
  }

  /**
   * Connect to Casper Signer wallet
   */
  async connect(): Promise<WalletState> {
    try {
      if (!this.isCasperSignerInstalled()) {
        throw new Error('Casper Signer extension not found. Please install it from https://www.casperwallet.io/');
      }

      // Request connection
      const provider = window.CasperWalletProvider();
      await provider.requestConnection();

      // Get active public key
      const isConnected = await provider.isConnected();
      if (!isConnected) {
        throw new Error('Failed to connect to Casper Signer');
      }

      const publicKeyHex = await provider.getActivePublicKey();
      const publicKey = CLPublicKey.fromHex(publicKeyHex);
      const accountHash = publicKey.toAccountHashStr();

      return {
        connected: true,
        publicKey: publicKeyHex,
        accountHash,
      };
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw error;
    }
  }

  /**
   * Disconnect wallet
   */
  async disconnect(): Promise<void> {
    if (this.isCasperSignerInstalled()) {
      const provider = window.CasperWalletProvider();
      await provider.disconnectFromSite();
    }
  }

  /**
   * Get account balance in CSPR
   */
  async getBalance(publicKeyHex: string): Promise<string> {
    try {
      const publicKey = CLPublicKey.fromHex(publicKeyHex);
      const stateRootHash = await this.client.nodeClient.getStateRootHash();
      const balanceUref = await this.client.nodeClient.getAccountBalanceUrefByPublicKey(
        stateRootHash,
        publicKey
      );

      if (!balanceUref) {
        return '0';
      }

      const balance = await this.client.nodeClient.getAccountBalance(
        stateRootHash,
        balanceUref
      );

      // Convert motes to CSPR (1 CSPR = 1,000,000,000 motes)
      const balanceInCSPR = Number(balance.toString()) / 1_000_000_000;
      return balanceInCSPR.toFixed(2);
    } catch (error) {
      console.error('Error fetching balance:', error);
      return '0';
    }
  }

  /**
   * Mint a badge NFT for completing a module
   * Note: This is a simplified version. In production, you'd deploy a proper CEP-78 contract
   */
  async mintBadgeNFT(
    publicKeyHex: string,
    moduleId: string,
    score: number
  ): Promise<string> {
    try {
      // For MVP: Return a simulated transaction hash
      // In production: Create actual deploy to mint CEP-78 NFT

      console.log('Minting badge NFT:', { publicKeyHex, moduleId, score });

      // Simulate deploy hash
      const deployHash = `badge-${moduleId}-${Date.now()}`;

      // TODO: Implement actual CEP-78 minting
      // This would involve:
      // 1. Creating a Deploy with contract call to mint()
      // 2. Signing with wallet
      // 3. Sending to network
      // 4. Waiting for execution

      return deployHash;
    } catch (error) {
      console.error('Error minting badge:', error);
      throw error;
    }
  }

  /**
   * Get user's badge NFTs
   * Note: Simplified version - would query CEP-78 contract in production
   */
  async getUserBadges(accountHash: string): Promise<any[]> {
    // For MVP: Check localStorage for minted badges
    // In production: Query CEP-78 contract for owned tokens

    const storedBadges = localStorage.getItem(`badges-${accountHash}`);
    if (storedBadges) {
      return JSON.parse(storedBadges);
    }

    return [];
  }
}

// Singleton instance
export const walletService = new CasperWalletService();

// Type declaration for window.CasperWalletProvider
declare global {
  interface Window {
    CasperWalletProvider: any;
  }
}
