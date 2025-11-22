import * as React from 'react';
import { ReactNode } from "react";
import type { Viewport } from 'next';
import { headers } from "next/headers";

import '@/styles/global.css';

import WagmiProviderHOC from "@/contexts/wagmi-provider";
import { AztecProvider } from "@/contexts/aztec-provider";

import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

export default async function RootLayout({ children }: { children: ReactNode }) {
	// @ts-ignore
	const headersList = await headers();
	const cookies = headersList.get("cookie");

  return (
    <html lang="en">
      <body>
          <LocalizationProvider>
              <WagmiProviderHOC cookies={cookies}>
                <AztecProvider>
                  <ThemeProvider>{children}</ThemeProvider>
                </AztecProvider>
              </WagmiProviderHOC>
          </LocalizationProvider>
      </body>
    </html>
  );
}
