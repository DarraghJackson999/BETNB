import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { InteractiveBackground } from '@/components/layout/interactive-background'
import { SiteHeader } from '@/components/layout/site-header'
import { WalletDialogProvider } from '@/components/providers/wallet-dialog-provider'
import { WalletProvider } from '@/components/providers/wallet-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'UmbraMarkets • Institutional Prediction Desk',
  description:
    'UmbraMarkets is a private-market prediction exchange providing institution-grade liquidity routing, anonymous execution, and on-chain settlement transparency.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#050312] text-white antialiased`}
      >
        <WalletProvider>
          <WalletDialogProvider>
            <div className="relative min-h-screen">
              <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(127,91,255,0.32),_transparent_65%)]" />
              <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(26,16,61,0.78),_transparent_60%)]" />
              <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(120deg,rgba(10,7,24,0.82),transparent,rgba(21,11,46,0.6))]" />
              <InteractiveBackground />
              <div className="relative z-10 flex min-h-screen flex-col">
                <SiteHeader />
                <main className="flex-1 py-10">{children}</main>
              </div>
            </div>
          </WalletDialogProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
