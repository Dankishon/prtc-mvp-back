// Type definitions for Azguard Wallet browser extension

interface Window {
  azguard?: AzguardProvider;
  aztec?: AzguardProvider;
  ethereum?: EthereumProvider | EthereumProvider[];
}

interface AzguardProvider {
  isAzguard?: boolean;
  isAztec?: boolean;
  selectedAddress?: string;
  chainId?: string;
  networkVersion?: string;
  isConnected?: boolean;
  
  request(args: { method: string; params?: any[] }): Promise<any>;
  enable?(): Promise<string[]>;
  send?(method: string, params?: any[]): Promise<any>;
  sendAsync?(args: { method: string; params?: any[] }, callback: (error: any, result?: any) => void): void;
  
  on?(event: string, handler: (...args: any[]) => void): void;
  removeListener?(event: string, handler: (...args: any[]) => void): void;
  removeAllListeners?(event?: string): void;
  close?(): Promise<void>;
}

interface EthereumProvider {
  isMetaMask?: boolean;
  isAzguard?: boolean;
  isAztec?: boolean;
  providers?: EthereumProvider[];
  selectedAddress?: string;
  chainId?: string;
  networkVersion?: string;
  isConnected?: boolean;
  
  request(args: { method: string; params?: any[] }): Promise<any>;
  enable?(): Promise<string[]>;
  send?(method: string, params?: any[]): Promise<any>;
  sendAsync?(args: { method: string; params?: any[] }, callback: (error: any, result?: any) => void): void;
  
  on?(event: string, handler: (...args: any[]) => void): void;
  removeListener?(event: string, handler: (...args: any[]) => void): void;
  removeAllListeners?(event?: string): void;
}

