import type { DappMetadata } from '@azguardwallet/types';

// Aztec/Azguard Wallet Configuration
export const aztecConfig = {
  // Aztec chain identifier - can use 'devnet', 'sandbox', or CAIP-string
  defaultChain: process.env.NEXT_PUBLIC_AZTEC_CHAIN || 'devnet',
  
  // Application metadata
  metadata: {
    name: 'Hackaton Dashboard',
    description: 'Dashboard app for ETHGlobal Buenos Aires 2025',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://app.example.com',
    logo: typeof window !== 'undefined' ? `${window.location.origin}/favicon.ico` : '/favicon.ico',
  } as DappMetadata,
};

