'use client'

import { useMemo, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import Image from 'next/image'
import { Bell, LineChart, Menu, Search, TrendingUp } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { markets } from '@/lib/data'
import { cn, formatUsd } from '@/lib/utils'
import { ConnectWalletButton } from '../connect-wallet-button'

const navLinks = [
  { label: 'Markets', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Insights', href: '/insights' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Docs', href: 'https://docs.betnb.gitbook.io/betnb', external: true },
]

export function SiteHeader() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    return markets.filter((market) =>
      market.question.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  const notifications = useMemo(() => {
    const seen = new Set<string>()

    return markets
      .flatMap((market) =>
        (market.news ?? []).map((news) => ({
          key: `${market.id}-${news.id}`,
          title: news.title,
          source: news.source,
          timeAgo: news.timeAgo,
          marketQuestion: market.question,
          slug: market.slug,
        }))
      )
      .filter((item) => {
        if (seen.has(item.key)) return false
        seen.add(item.key)
        return true
      })
      .slice(0, 6)
  }, [])

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md">
      <div className="border-b border-[#2b2416]/80 bg-[#0c0a06]/80">
        <div className="mx-auto flex w-full max-w-[1240px] items-center gap-6 px-6 py-4">
          <Link href="/" className="flex items-center gap-3 text-[#fbd24d]">
            <div className="relative h-11 w-11">
              <Image
                src="/logo.png"
                alt="BETNB"
                fill
                priority
                sizes="44px"
                className="rounded-2xl"
              />
            </div>
            <div className="font-semibold uppercase tracking-[0.3em] text-sm text-[#f5f1e6]">
              betnb
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const commonClasses = cn(
                'rounded-full px-4 py-2 text-sm font-medium transition',
                'text-[#bfb59f] hover:text-[#fbd24d]'
              )

              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={commonClasses}
                  >
                    {link.label}
                  </a>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    commonClasses,
                    link.href === '/' && 'bg-[#1b170f]/80 text-[#f5f1e6]'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden flex-1 items-center gap-2 lg:flex">
            <div className="relative w-full">
              <Input
                placeholder="Search every market"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="pl-11"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f6550]"
                size={16}
              />
              {query && (
                <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full rounded-2xl border border-[#312818] bg-[#141007] p-3 shadow-lg">
                  <div className="text-xs uppercase tracking-wide text-[#6f6550]">
                    {filtered.length ? 'Matching' : 'No matches'}
                  </div>
                  <div className="mt-2 space-y-1">
                    {filtered.slice(0, 5).map((market) => (
                      <Link
                        key={market.id}
                        href={`/markets/${market.slug}`}
                        className="block rounded-xl px-3 py-2 text-sm text-[#d9cfba] transition hover:bg-[#1f1a12]"
                      >
                        {market.question}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button variant="secondary" size="icon" className="shrink-0">
              <TrendingUp size={18} />
            </Button>
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button variant="secondary" size="icon" className="relative shrink-0">
                  <Bell size={18} />
                  {notifications.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#fbd24d] px-1 text-[10px] font-semibold text-[#1a1407]">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  align="end"
                  sideOffset={12}
                  className="z-40 w-[320px] rounded-2xl border border-[#2d2616] bg-[#131008] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                >
                  <div className="text-xs uppercase tracking-wide text-[#6f6550]">
                    Latest notifications
                  </div>
                  <div className="mt-3 space-y-3">
                    {notifications.length === 0 ? (
                      <div className="rounded-xl border border-[#2d2616] bg-[#1a150c] p-4 text-sm text-[#9d9278]">
                        You&apos;re all caught up.
                      </div>
                    ) : (
                      notifications.map((item) => (
                        <Link
                          key={item.key}
                          href={`/markets/${item.slug}`}
                          className="block rounded-xl border border-[#2d2616] bg-[#18120b] px-4 py-3 text-sm text-[#d9cfba] transition hover:border-[#fbd24d]/50"
                        >
                          <div className="font-semibold text-[#f5f1e6]">{item.title}</div>
                          <div className="mt-1 text-[12px] text-[#9d9278]">
                            {item.marketQuestion}
                          </div>
                          <div className="mt-2 text-[11px] uppercase tracking-wide text-[#6f6550]">
                            {item.source} · {item.timeAgo}
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                  <Popover.Arrow className="fill-[#131008]" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <Link
              href="/prices"
              className="flex items-center gap-2 rounded-2xl border border-[#2f2716] bg-[#141007] px-4 py-2 transition hover:border-[#fbd24d]/60"
            >
              <LineChart size={18} className="text-[#fbd24d]" />
              <div>
                <div className="text-[10px] uppercase tracking-wide text-[#6f6550]">
                  24h Volume
                </div>
                <div className="font-semibold text-[#f5f1e6]">{formatUsd(12840)}</div>
              </div>
            </Link>
            <ConnectWalletButton />
          </div>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            <Button variant="secondary" size="icon">
              <Search size={16} />
            </Button>
            <Button variant="secondary" size="icon">
              <Menu size={16} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
