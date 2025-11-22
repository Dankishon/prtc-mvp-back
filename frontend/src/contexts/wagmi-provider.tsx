'use client'

import { wagmiAdapter, projectId } from '@/config/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { mainnet, arbitrum } from '@reown/appkit/networks'
import React, { type ReactNode, useState, useMemo } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: 'Hackaton app',
  description: 'AppKit Example',
  url: 'https://appkitexampleapp.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
export const modal = createAppKit({
	adapters: [wagmiAdapter],
	projectId,
	networks: [mainnet, arbitrum],
	metadata: metadata,
	debug: process.env.NEXT_PUBLIC_ENV === "dev",
	themeVariables: {
		"--w3m-z-index": 2000
	}
});

function WagmiProviderHOC({ children, cookies }: { children: ReactNode; cookies: string | null }) {
	const [queryClient] = useState(() => new QueryClient())
	const initialState = useMemo(
		() => cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies),
		[cookies]
	);

	return (
		<WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}

export default WagmiProviderHOC;
