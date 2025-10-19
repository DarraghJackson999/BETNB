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
    label: 'Umbra Liquidity',
    value: '$46.2k',
    detail: 'Institutional queue depth live on desk',
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
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <span className="rounded-2xl bg-[rgba(127,91,255,0.2)] p-3 text-[#d7c6ff] shadow-[0_12px_28px_rgba(86,58,164,0.26)]">
                <Icon size={20} />
              </span>
              <div>
                <div className="text-xs uppercase tracking-wide text-[#a89dd4]">
                  {stat.label}
                </div>
                <div className="text-xl font-semibold text-white">{stat.value}</div>
                <div className="text-xs text-[#b9a8ef] opacity-80">{stat.detail}</div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
