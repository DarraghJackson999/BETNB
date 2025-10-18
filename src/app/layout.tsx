import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { SiteHeader } from '@/components/layout/site-header'
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
  title: 'BETNB • BNB Prediction Exchange',
  description:
    'BETNB brings Polymarket-style prediction markets to BNB Chain with deep liquidity and pro-grade UI.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#080704] text-[#f5f1e6] antialiased`}
      >
        <WalletProvider>
          <div className="relative min-h-screen">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,210,77,0.22),_transparent_65%)]" />
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(17,26,21,0.4),_transparent_55%)]" />
            <div className="relative z-10 flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1 py-10">{children}</main>
            </div>
          </div>
        </WalletProvider>
      </body>
    </html>
  )
}
