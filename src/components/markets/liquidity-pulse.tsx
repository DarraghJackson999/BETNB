import Link from 'next/link'
import { TrendingUp, Wallet } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Market } from '@/lib/types'
import { formatUsd } from '@/lib/utils'

type LiquidityPulseProps = {
  markets: Market[]
}

export function LiquidityPulse({ markets }: LiquidityPulseProps) {
  const scopedMarkets = markets.filter((market) => market.options?.length)

  if (scopedMarkets.length === 0) {
    return null
  }

  const byLiquidity = [...scopedMarkets].sort((a, b) => b.liquidity - a.liquidity)
  const byVelocity = [...scopedMarkets].sort(
    (a, b) => Math.abs(b.options[0]?.change ?? 0) - Math.abs(a.options[0]?.change ?? 0)
  )
  const sportsFocus =
    scopedMarkets.find((market) => market.category === 'Sports') ??
    byLiquidity[1] ??
    byLiquidity[0]

  const entries = [
    {
      id: 'top-liquidity',
      label: 'Top liquidity',
      market: byLiquidity[0],
    },
    {
      id: 'fastest-mover',
      label: 'Fastest mover',
      market: byVelocity[0],
    },
    {
      id: 'sports-delta',
      label: 'Sports delta',
      market: sportsFocus,
    },
  ].filter((entry) => entry.market)

  return (
    <Card className="border-[rgba(127,91,255,0.26)] bg-[rgba(12,8,32,0.74)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wide text-[#a89dd4]">
          <Wallet size={16} /> Liquidity pulse
        </CardTitle>
        <CardDescription className="text-[#b9a8ef] opacity-80">
          Monitor where depth is building to find the tightest spreads and best fills.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.map((entry) => {
          const market = entry.market!
          const changeValue = (market.options[0]?.change ?? 0) * 100
          const formattedChange = changeValue.toFixed(1)

          return (
            <Link
              key={entry.id}
              href={`/markets/${market.slug}`}
              className="flex items-center justify-between rounded-2xl border border-[rgba(127,91,255,0.28)] bg-[rgba(18,12,45,0.68)] px-4 py-3 shadow-[0_16px_32px_rgba(74,52,148,0.22)] transition hover:-translate-y-[1px] hover:border-[rgba(127,91,255,0.45)]"
            >
              <div>
                <div className="text-xs uppercase tracking-wide text-[#a89dd4]">
                  {entry.label}
                </div>
                <div className="text-sm font-semibold text-white">{market.question}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white">{formatUsd(market.liquidity)}</div>
                <div className="flex items-center justify-end gap-1 text-xs text-[#9ad8ff]">
                  <TrendingUp size={12} />
                  {changeValue >= 0 ? '+' : ''}
                  {formattedChange}%
                </div>
              </div>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}
