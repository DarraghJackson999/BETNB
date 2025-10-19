'use client'

import { useMemo, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import Image from 'next/image'
import { Bell, Menu, Search, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { markets } from '@/lib/data'
import { cn } from '@/lib/utils'
import { ConnectWalletButton } from '../connect-wallet-button'

const navLinks = [
  { label: 'Markets', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Insights', href: '/insights' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Docs', href: '/docs' },
  { label: 'Twitter', href: 'https://x.com/umbramarkets', external: true },
]

export function SiteHeader() {
  const [query, setQuery] = useState('')
  const pathname = usePathname()
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
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl">
      <div className="border-b border-[rgba(127,91,255,0.28)] bg-[#050312]/85">
        <div className="mx-auto flex w-full max-w-[1340px] flex-wrap items-center gap-4 px-6 py-4 md:flex-nowrap">
          <Link href="/" className="flex items-center gap-3 text-[#c9b5ff]">
            <div className="relative h-11 w-11">
              <Image
                src="/umbra-logos/logo-primary.png"
                alt="UmbraMarkets"
                fill
                priority
                sizes="44px"
                className="rounded-2xl"
              />
            </div>
            <div className="font-semibold uppercase tracking-[0.32em] text-sm text-white">
              UMBRAMARKETS
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 whitespace-nowrap md:flex md:flex-nowrap">
            {navLinks.map((link) => {
              const commonClasses = cn(
                'relative inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition backdrop-blur border border-transparent',
                'text-white/80 hover:text-white hover:border-[rgba(127,91,255,0.55)] hover:bg-[rgba(127,91,255,0.2)]'
              )

              const linkPath = link.href
              const isActive = !link.external
                ? linkPath === '/'
                  ? pathname === '/' || pathname.startsWith('/markets')
                  : pathname.startsWith(linkPath)
                : false

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
                    isActive &&
                      'border-[rgba(127,91,255,0.85)] bg-gradient-to-r from-[#7f5bff] via-[#9f7eff] to-[#ffffff] text-[#0f0624] font-semibold shadow-[0_12px_34px_rgba(90,62,170,0.36)]'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden min-w-[320px] flex-1 items-center gap-2 lg:flex">
            <div className="relative w-full">
              <Input
                placeholder="Search every market"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="border-[rgba(127,91,255,0.28)] bg-[rgba(11,8,24,0.75)] pl-11 text-white placeholder:text-[#8a7ab8]/70"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b9a8ef]"
                size={16}
              />
              {query && (
                <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full rounded-2xl border border-[rgba(127,91,255,0.32)] bg-[rgba(12,8,28,0.96)] p-3 shadow-[0_24px_54px_rgba(74,52,148,0.32)]">
                  <div className="text-xs uppercase tracking-wide text-[#a89dd4]">
                    {filtered.length ? 'Matching' : 'No matches'}
                  </div>
                  <div className="mt-2 space-y-1">
                    {filtered.slice(0, 5).map((market) => (
                      <Link
                        key={market.id}
                        href={`/markets/${market.slug}`}
                        className="block rounded-xl px-3 py-2 text-sm text-white transition hover:bg-[rgba(127,91,255,0.16)]"
                      >
                        {market.question}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="shrink-0 border-[rgba(127,91,255,0.32)] bg-[rgba(127,91,255,0.14)] text-[#dfd5ff] hover:border-[rgba(127,91,255,0.45)]"
            >
              <TrendingUp size={18} className="text-[#bfa4ff]" />
            </Button>
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="relative shrink-0 overflow-visible border-[rgba(127,91,255,0.32)] bg-[rgba(13,8,33,0.88)] text-[#dfd5ff] hover:border-[rgba(127,91,255,0.5)]"
                >
                  <Bell size={18} />
                  {notifications.length > 0 && (
                    <span className="absolute -right-2 -top-2 z-10 flex h-5 min-w-[1.1rem] items-center justify-center rounded-full border border-white/40 bg-[#ff5edf] px-1 text-[10px] font-semibold text-white shadow-[0_4px_10px_rgba(255,94,223,0.45)]">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  align="end"
                  sideOffset={12}
                  className="z-40 w-[320px] rounded-2xl border border-[rgba(127,91,255,0.36)] bg-[rgba(13,8,35,0.94)] p-4 shadow-[0_28px_70px_rgba(74,52,148,0.35)]"
                >
                  <div className="text-xs uppercase tracking-wide text-[#b7a9e6]">
                    Latest notifications
                  </div>
                  <div className="mt-3 space-y-3">
                    {notifications.length === 0 ? (
                      <div className="rounded-xl border border-[rgba(127,91,255,0.24)] bg-[rgba(18,12,39,0.9)] p-4 text-sm text-[#b7a9e6]">
                        You&apos;re all caught up.
                      </div>
                    ) : (
                      notifications.map((item) => (
                        <Link
                          key={item.key}
                          href={`/markets/${item.slug}`}
                          className="block rounded-xl border border-[rgba(127,91,255,0.28)] bg-[rgba(18,12,39,0.9)] px-4 py-3 text-sm text-white transition hover:border-[rgba(127,91,255,0.5)] hover:bg-[rgba(127,91,255,0.18)]"
                        >
                          <div className="font-semibold text-white">{item.title}</div>
                          <div className="mt-1 text-[12px] text-[#cbbdff]">
                            {item.marketQuestion}
                          </div>
                          <div className="mt-2 text-[11px] uppercase tracking-wide text-[#cbbdff]">
                            {item.source} · {item.timeAgo}
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                  <Popover.Arrow className="fill-[#0f0a24]" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <ConnectWalletButton />
          </div>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            <Button
              variant="secondary"
              size="icon"
              className="border-[rgba(127,91,255,0.3)] bg-[rgba(13,8,33,0.88)]"
            >
              <Search size={16} className="text-[#b9a8ef]" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="border-[rgba(127,91,255,0.3)] bg-[rgba(13,8,33,0.88)]"
            >
              <Menu size={16} className="text-[#b9a8ef]" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
