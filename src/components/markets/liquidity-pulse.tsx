import { TrendingUp, Wallet } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatUsd } from '@/lib/utils'

const pools = [
  {
    id: 'pool-1',
    label: 'Top liquidity',
    market: 'Harris 2028 nominee',
    amount: 16400,
    change: 3.8,
  },
  {
    id: 'pool-2',
    label: 'Fastest mover',
    market: 'BTC above $80k',
    amount: 12850,
    change: 5.6,
  },
  {
    id: 'pool-3',
    label: 'Sports delta',
    market: 'Lakers 2026 title',
    amount: 7200,
    change: 4.1,
  },
]

export function LiquidityPulse() {
  return (
    <Card className="border-[#2f2716] bg-[#12100a]/90">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wide text-[#9d9278]">
          <Wallet size={16} /> Liquidity pulse
        </CardTitle>
        <CardDescription className="text-[#6f6550]">
          Monitor where depth is building to find the tightest spreads and best fills.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {pools.map((pool) => (
          <div
            key={pool.id}
            className="flex items-center justify-between rounded-2xl border border-[#2d2617] bg-[#18120b] px-4 py-3"
          >
            <div>
              <div className="text-xs uppercase tracking-wide text-[#6f6550]">
                {pool.label}
              </div>
              <div className="text-sm font-semibold text-[#f5f1e6]">{pool.market}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#f5f1e6]">{formatUsd(pool.amount)}</div>
              <div className="flex items-center justify-end gap-1 text-xs text-[#8be280]">
                <TrendingUp size={12} /> +{pool.change}%
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
