import '@/styles/globals.css';

import type { Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';
import { cookieToInitialState } from 'wagmi';

import { config } from '@/config';
import { ContextProvider } from '@/context';

export const metadata: Metadata = {
  title: 'Nerif Coading Challenge',
  description: 'Nerif Coading Challenge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <ContextProvider initialState={initialState}>{children}</ContextProvider>
      </body>
    </html>
  );
}
