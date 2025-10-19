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
  accent?: 'violet' | 'plum'
  className?: string
}

export function MarketCard({ market, accent = 'violet', className }: MarketCardProps) {
  const yesOption = market.options[0]
  const noOption = market.options[1]

  return (
    <Link
      href={`/markets/${market.slug}`}
      className="group block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-[#cdb8ff]/80 focus-visible:ring-offset-[#050312]"
    >
      <Card
        className={cn(
          'relative overflow-hidden transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_20px_52px_rgba(70,48,150,0.32)]',
          className
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-24 opacity-90 transition-opacity group-hover:opacity-100',
            accent === 'violet'
              ? 'bg-gradient-to-b from-[#8d6fff]/32 via-transparent'
              : 'bg-gradient-to-b from-[#d08cff]/32 via-transparent'
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
              <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-white">
                {market.question}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-[#d5caf8]">
                {market.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[rgba(127,91,255,0.26)] px-3 py-1 backdrop-blur"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="min-w-[120px] rounded-2xl border border-[rgba(127,91,255,0.32)] bg-[rgba(24,16,62,0.72)] p-3 text-right">
              <div className="text-xs uppercase tracking-wide text-[#b8a3ff]">
                Yes price
              </div>
              <div className="mt-1 text-2xl font-semibold text-white">
                {formatPrice(yesOption.price)}
              </div>
              <div
                className={cn(
                  'text-xs',
                  yesOption.change >= 0 ? 'text-[#8fd8ff]' : 'text-[#ff9bb4]'
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

          <div className="h-32 rounded-2xl border border-[rgba(127,91,255,0.32)] bg-[rgba(21,14,58,0.72)] p-2">
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
                    <stop
                      offset="5%"
                      stopColor={accent === 'violet' ? '#9b7aff' : '#d894ff'}
                      stopOpacity={0.85}
                    />
                    <stop
                      offset="95%"
                      stopColor={accent === 'violet' ? '#281650' : '#371943'}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="timestamp" hide />
                <YAxis domain={[0, 1]} hide />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(16,9,35,0.96)',
                    borderRadius: 12,
                    border: '1px solid rgba(127,91,255,0.38)',
                    color: '#f1eaff',
                  }}
                  formatter={(value: number) => formatPrice(Number(value))}
                  labelFormatter={() => 'Yes price'}
                />
                <Area
                  type="monotone"
                  dataKey="yesPrice"
                  stroke={accent === 'violet' ? '#9b7aff' : '#d894ff'}
                  fill={`url(#yesGradient-${market.id})`}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 text-sm text-[#d5caf8]">
              <div>
                No price <span className="text-white">{formatPrice(noOption.price)}</span>
              </div>
              <div>
                Resolves{' '}
                <span className="font-medium text-white">
                  {market.resolveDate.slice(0, 10)}
                </span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(140,110,240,0.2)] px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-gradient-to-r group-hover:from-[#8b63ff] group-hover:via-[#a97cff] group-hover:to-[#f4e8ff] group-hover:text-[#12092d]">
              <span>View market</span>
              <ArrowUpRight size={16} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-2xl border border-[rgba(127,91,255,0.32)] bg-[rgba(24,16,62,0.78)] px-4 py-3 text-sm">
    <div className="text-xs uppercase tracking-wide text-[#b8a3ff]">{label}</div>
    <div className="text-lg font-semibold text-white">{formatUsd(value)}</div>
  </div>
)
