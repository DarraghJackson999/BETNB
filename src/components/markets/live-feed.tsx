import Link from 'next/link'
import { useMemo } from 'react'

import type { Market } from '@/lib/types'
import { cn, formatPrice, formatUsd } from '@/lib/utils'

type FeedItem = {
  id: string
  type: 'fill' | 'creation'
  message: string
  detail: string
  marketId: string | null
}

type LiveFeedProps = {
  markets: Market[]
}

const badgeMap: Record<string, string> = {
  fill: 'bg-[rgba(127,91,255,0.24)] text-white',
  creation: 'bg-[rgba(192,125,255,0.26)] text-white',
}

export function LiveFeed({ markets }: LiveFeedProps) {
  const feedItems = useMemo<FeedItem[]>(() => {
    if (!markets?.length) return []

    const rankedByVolume = [...markets]
      .sort((a, b) => b.volume24h - a.volume24h)
      .slice(0, 4)
      .map((market) => {
        const leadingOption =
          [...market.options].sort((a, b) => b.volume24h - a.volume24h)[0] ??
          market.options[0]
        return {
          id: `flow-${market.id}`,
          type: 'fill' as const,
          message: `${leadingOption.label} flow · ${shortenQuestion(market.question)}`,
          detail: `${formatUsd(leadingOption.volume24h || market.volume24h)} traded · ${leadingOption.label} ${formatPrice(leadingOption.price)}`,
          marketId: market.id,
        }
      })

    const featuredListings = markets
      .filter((market) => market.featured)
      .sort(
        (a, b) => new Date(a.resolveDate).getTime() - new Date(b.resolveDate).getTime()
      )
      .slice(0, 3)
      .map((market) => ({
        id: `listing-${market.id}`,
        type: 'creation' as const,
        message: `New listing · ${shortenQuestion(market.question)}`,
        detail: `${market.category} · Resolves ${formatResolveDate(market.resolveDate)}`,
        marketId: market.id,
      }))

    const merged = [...rankedByVolume, ...featuredListings]
    const seen = new Set<string>()
    const deduped: FeedItem[] = []

    for (const item of merged) {
      const key = item.marketId ?? item.id
      if (seen.has(key)) continue
      seen.add(key)
      deduped.push(item)
    }

    return deduped.slice(0, 6)
  }, [markets])

  return (
    <div className="rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(12,8,32,0.9)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="text-sm font-semibold uppercase tracking-wide text-[#a89dd4]">
        Market tape
      </div>
      <div className="mt-4 space-y-4 text-sm text-white">
        {feedItems.map((item) => {
          const market = item.marketId
            ? markets.find((m) => m.id === item.marketId)
            : undefined
          const baseClass =
            'group block rounded-2xl border border-[rgba(127,91,255,0.3)] bg-[rgba(18,12,45,0.82)] p-4 shadow-[0_14px_32px_rgba(74,52,148,0.24)] transition hover:-translate-y-[1px] hover:border-[rgba(127,91,255,0.44)]'

          const content = (
            <>
              <div className="flex items-center justify-between text-xs text-[#cbbdff]">
                <span
                  className={cn(
                    'rounded-full px-3 py-1 capitalize',
                    badgeMap[item.type] ?? 'bg-[#241b3c] text-[#d5c9ff]'
                  )}
                >
                  {item.type}
                </span>
                <span>{market ? market.category : 'System'}</span>
              </div>
              <div className="mt-2 text-base font-semibold text-white group-hover:text-white">
                {item.message}
              </div>
              <div className="mt-1 text-xs text-[#d0c4ff]/80">{item.detail}</div>
            </>
          )

          if (market) {
            return (
              <Link key={item.id} href={`/markets/${market.slug}`} className={baseClass}>
                {content}
              </Link>
            )
          }

          return (
            <div key={item.id} className={baseClass}>
              {content}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function shortenQuestion(question: string) {
  const trimmed = question
    .replace(/^Will\s+/i, '')
    .replace(/\?$/, '')
    .trim()
  if (trimmed.length <= 72) return trimmed
  return `${trimmed.slice(0, 69)}...`
}

function formatResolveDate(resolveDate: string) {
  const timestamp = Date.parse(resolveDate)
  if (Number.isNaN(timestamp)) return 'TBA'
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(
    timestamp
  )
}
