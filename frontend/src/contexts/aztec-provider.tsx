'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
// @ts-ignore - module exports correctly, but TypeScript cannot resolve it
import { AztecWallet } from '@azguardwallet/aztec-wallet';
// Use types from the exported module
type Wallet = Awaited<ReturnType<typeof AztecWallet.connect>>;
type Aliased<T> = { item: T; alias?: string };
type AztecAddress = any; // Aztec address type
import { aztecConfig } from '@/config/aztec-config';

interface AztecAccount {
  address: string;
  chainId?: string;
}

interface AztecProviderContextType {
  account: AztecAccount | null;
  accounts: Aliased<AztecAddress>[] | null;
  isConnected: boolean;
  isConnecting: boolean;
  wallet: Wallet | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain?: (chainId: string) => Promise<void>;
}

const AztecContext = createContext<AztecProviderContextType | undefined>(undefined);

interface AztecProviderProps {
  children: ReactNode;
}

export function AztecProvider({ children }: AztecProviderProps): React.JSX.Element {
  const [account, setAccount] = useState<AztecAccount | null>(null);
  const [accounts, setAccounts] = useState<Aliased<AztecAddress>[] | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  // Initialize and check connection
  useEffect(() => {
    const initializeWallet = async () => {
      try {
        // Try to connect automatically if session already exists
        const aztecWallet = await AztecWallet.connect(
          aztecConfig.metadata,
          'devnet' // can be made configurable
        );
        
        if (aztecWallet.connected) {
          setWallet(aztecWallet);
          setIsConnected(true);
          
          // Get accounts
          const walletAccounts = await aztecWallet.getAccounts();
          setAccounts(walletAccounts);
          
          if (walletAccounts && walletAccounts.length > 0) {
            const firstAccount = walletAccounts[0].item;
            setAccount({
              address: firstAccount.toString(),
            });
          }
        }
        
        // Listen for connection/disconnection events
        aztecWallet.onConnected.addHandler(() => {
          setIsConnected(true);
          updateAccounts(aztecWallet);
        });
        
        aztecWallet.onDisconnected.addHandler(() => {
          setIsConnected(false);
          setAccount(null);
          setAccounts(null);
        });
        
      } catch (error) {
        // Wallet not installed or not connected - this is normal
        console.debug('Azguard Wallet not available:', error);
      }
    };

    initializeWallet();
  }, []);

  const updateAccounts = async (aztecWallet: Wallet) => {
    try {
      const walletAccounts = await aztecWallet.getAccounts();
      setAccounts(walletAccounts);
      
      if (walletAccounts && walletAccounts.length > 0) {
        const firstAccount = walletAccounts[0].item;
        setAccount({
          address: firstAccount.toString(),
        });
      }
    } catch (error) {
      console.error('Error updating accounts:', error);
      // Don't throw error, as wallet may not be connected
    }
  };

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Connect to Azguard Wallet using the official package
      const aztecWallet = await AztecWallet.connect(
        aztecConfig.metadata,
        'devnet' // can be made configurable
      );
      
      setWallet(aztecWallet);
      setIsConnected(aztecWallet.connected);
      
      // Get accounts
      if (aztecWallet.connected) {
        await updateAccounts(aztecWallet);
      }
      
      // Listen for connection/disconnection events
      aztecWallet.onConnected.addHandler(() => {
        setIsConnected(true);
        updateAccounts(aztecWallet);
      });
      
      aztecWallet.onDisconnected.addHandler(() => {
        setIsConnected(false);
        setAccount(null);
        setAccounts(null);
      });
      
    } catch (error: any) {
      console.error('Error connecting to Azguard Wallet:', error);
      if (error.message?.includes('user rejected') || error.message?.includes('User rejected')) {
        throw new Error('User rejected the connection request.');
      }
      if (error.message?.includes('not found') || error.message?.includes('not installed')) {
        throw new Error('Azguard Wallet not found. Please install the Azguard Wallet extension.');
      }
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      if (wallet) {
        await wallet.disconnect();
      }
      setAccount(null);
      setAccounts(null);
      setIsConnected(false);
      setWallet(null);
    } catch (error) {
      console.error('Error disconnecting from Azguard Wallet:', error);
    }
  }, [wallet]);

  const switchChain = useCallback(async (chainId: string) => {
    // Aztec Wallet uses a different mechanism for network switching
    // Can reconnect with a new chain ID
    if (wallet) {
      await wallet.disconnect();
      const aztecWallet = await AztecWallet.connect(
        aztecConfig.metadata,
        chainId as 'devnet' | 'sandbox' | `aztec:${number}`
      );
      setWallet(aztecWallet);
      setIsConnected(aztecWallet.connected);
      if (aztecWallet.connected) {
        await updateAccounts(aztecWallet);
      }
    }
  }, [wallet]);

  const value: AztecProviderContextType = {
    account,
    accounts,
    isConnected,
    isConnecting,
    wallet,
    connect,
    disconnect,
    switchChain,
  };

  return <AztecContext.Provider value={value}>{children}</AztecContext.Provider>;
}

export function useAztec(): AztecProviderContextType {
  const context = useContext(AztecContext);
  if (context === undefined) {
    throw new Error('useAztec must be used within an AztecProvider');
  }
  return context;
}

