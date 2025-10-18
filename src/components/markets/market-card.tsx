'use client'

import Link from 'next/link'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Market } from '@/lib/types'
import { cn, formatPrice, formatUsd } from '@/lib/utils'

type MarketCardProps = {
  market: Market
  accent?: 'gold' | 'emerald'
  className?: string
}

export function MarketCard({ market, accent = 'gold', className }: MarketCardProps) {
  const yesOption = market.options[0]
  const noOption = market.options[1]

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-transform hover:-translate-y-1',
        className
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-24',
          accent === 'gold'
            ? 'bg-gradient-to-b from-[#fbd24d]/25 via-transparent'
            : 'bg-gradient-to-b from-[#7fe0c2]/25 via-transparent'
        )}
      />
      <CardContent className="relative space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{market.category}</Badge>
              {market.featured && (
                <Badge variant="positive" className="gap-1">
                  <TrendingUp size={12} /> Hot
                </Badge>
              )}
            </div>
            <Link
              href={`/markets/${market.slug}`}
              className="block text-xl font-semibold text-[#f5f1e6] transition hover:text-[#fbd24d]"
            >
              {market.question}
            </Link>
            <div className="flex flex-wrap gap-2 text-xs text-[#706750]">
              {market.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[#1d1810] px-3 py-1">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#312818] bg-[#15110a] p-3 text-right min-w-[120px]">
            <div className="text-xs uppercase tracking-wide text-[#6f6550]">
              Yes price
            </div>
            <div className="mt-1 text-2xl font-semibold text-[#f5f1e6]">
              {formatPrice(yesOption.price)}
            </div>
            <div
              className={cn(
                'text-xs',
                yesOption.change >= 0 ? 'text-[#8be280]' : 'text-[#f08080]'
              )}
            >
              {yesOption.change >= 0 ? '+' : ''}
              {(yesOption.change * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Stat label="Liquidity" value={market.liquidity} />
          <Stat label="24h Volume" value={market.volume24h} />
          <Stat label="Open Interest" value={market.openInterest} />
        </div>

        <div className="h-32 rounded-2xl border border-[#2d2617] bg-[#141007] p-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={market.chart}>
              <defs>
                <linearGradient
                  id={`yesGradient-${market.id}`}
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#fbd24d" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#fbd24d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="timestamp" hide />
              <YAxis domain={[0, 1]} hide />
              <Tooltip
                contentStyle={{
                  background: '#141007',
                  borderRadius: 12,
                  border: '1px solid #302613',
                  color: '#f5f1e6',
                }}
                formatter={(value: number) => formatPrice(Number(value))}
                labelFormatter={() => 'Yes price'}
              />
              <Area
                type="monotone"
                dataKey="yesPrice"
                stroke="#fbd24d"
                fill={`url(#yesGradient-${market.id})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1 text-sm text-[#aba28f]">
            <div>
              No price{' '}
              <span className="text-[#f5f1e6]">{formatPrice(noOption.price)}</span>
            </div>
            <div>
              Resolves{' '}
              <span className="font-medium text-[#f5f1e6]">
                {market.resolveDate.slice(0, 10)}
              </span>
            </div>
          </div>
          <Link
            href={`/markets/${market.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#fbd24d]"
          >
            View market <ArrowUpRight size={16} />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-2xl border border-[#2d2617] bg-[#141007] px-4 py-3 text-sm">
    <div className="text-xs uppercase tracking-wide text-[#706750]">{label}</div>
    <div className="text-lg font-semibold text-[#f5f1e6]">{formatUsd(value)}</div>
  </div>
)
