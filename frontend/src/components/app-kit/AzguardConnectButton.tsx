'use client';

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAztec } from '@/contexts/aztec-provider';

export function AzguardConnectButton(): React.JSX.Element {
  const { account, isConnected, isConnecting, connect, disconnect } = useAztec();
  const [error, setError] = useState<string | null>(null);
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);

  useEffect(() => {
    // Check for window.azguard (Azguard Wallet extension)
    const checkWallet = () => {
      const hasWallet = typeof window !== 'undefined' && 
        (typeof (window as any).azguard !== 'undefined' || typeof (window as any).aztec !== 'undefined');
      setIsWalletInstalled(hasWallet);
    };

    checkWallet();
    // Periodically check for provider availability
    const interval = setInterval(checkWallet, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConnect = async () => {
    setError(null);
    try {
      await connect();
    } catch (err: any) {
      setError(err.message || 'Error connecting to Azguard Wallet');
      console.error('Connection error:', err);
    }
  };

  const handleDisconnect = async () => {
    setError(null);
    try {
      await disconnect();
    } catch (err: any) {
      setError(err.message || 'Error disconnecting');
      console.error('Disconnect error:', err);
    }
  };

  const formatAddress = (address: string): string => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isWalletInstalled) {
    return (
      <Box>
        <Button
          variant="contained"
          color="primary"
          href="https://chromewebstore.google.com/detail/azguard-wallet/pliilpflcmabdiapdeihifihkbdfnbmn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Install Azguard Wallet
        </Button>
      </Box>
    );
  }

  if (isConnected && account) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            {formatAddress(account.address)}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleDisconnect}
            disabled={isConnecting}
          >
            Disconnect
          </Button>
        </Box>
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleConnect}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 'Connect Azguard Wallet'}
      </Button>
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
}

