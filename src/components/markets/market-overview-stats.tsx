import { LineChart, Coins, Users } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

const stats = [
  {
    label: 'Open Markets',
    value: '60',
    detail: 'Politics, crypto, macro, sports',
    icon: LineChart,
  },
  {
    label: 'BNB Liquidity',
    value: '$46.2k',
    detail: 'Community-seeded bootstrapped pool',
    icon: Coins,
  },
  {
    label: 'Active Traders',
    value: '187',
    detail: '+42 in the last 24h',
    icon: Users,
  },
]

export function MarketOverviewStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="border-[#2e2617]/80 bg-[#141007]/95">
            <CardContent className="flex items-center gap-4 p-6">
              <span className="rounded-2xl bg-[#1f1a12] p-3 text-[#fbd24d]">
                <Icon size={20} />
              </span>
              <div>
                <div className="text-xs uppercase tracking-wide text-[#6f6550]">
                  {stat.label}
                </div>
                <div className="text-xl font-semibold text-[#f5f1e6]">{stat.value}</div>
                <div className="text-xs text-[#9d9278]">{stat.detail}</div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
