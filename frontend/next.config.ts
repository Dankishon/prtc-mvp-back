import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	webpack: (config, { webpack }) => {
		// Add externals for optional dependencies
		const originalExternals = config.externals || []
		config.externals = [
			...(Array.isArray(originalExternals) ? originalExternals : [originalExternals]),
			'pino-pretty',
			'lokijs',
			'encoding'
		]

		// Map of optional wallet dependencies to their stub files
		const walletStubs = {
			'porto': require.resolve('./src/webpack/porto-stub.js'),
			'@coinbase/wallet-sdk': require.resolve('./src/webpack/coinbase-stub.js'),
			'@gemini-wallet/core': require.resolve('./src/webpack/gemini-stub.js'),
			'@metamask/sdk': require.resolve('./src/webpack/metamask-stub.js'),
			'@walletconnect/ethereum-provider': require.resolve('./src/webpack/walletconnect-stub.js')
		}

		// Set up aliases for all optional wallets (must be before NormalModuleReplacementPlugin)
		config.resolve.alias = {
			...config.resolve.alias,
			...walletStubs
		}

		// Use NormalModuleReplacementPlugin to replace all optional wallet modules
		// This handles dynamic imports
		Object.entries(walletStubs).forEach(([wallet, stubPath]) => {
			// Escape special regex characters in wallet name
			const escapedWallet = wallet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

			// Replace module with stub using NormalModuleReplacementPlugin
			config.plugins.push(
				new webpack.NormalModuleReplacementPlugin(
					new RegExp(`^${escapedWallet}$`),
					stubPath
				)
			)
		})

		return config
	},
	// Explicitly use webpack instead of Turbopack
	turbopack: {}
};

export default nextConfig;
