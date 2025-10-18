import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { markets } from '@/lib/data'
import { formatUsd } from '@/lib/utils'

const insightItems = markets.slice(0, 6).map((market) => ({
  title: market.question,
  change: market.options[0].change,
  liquidity: market.liquidity,
  category: market.category,
}))

export default function InsightsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 px-6 pb-20">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-[#f5f1e6]">Signals & research</h1>
        <p className="max-w-2xl text-base text-[#bfb59f]">
          Quick takes surfaced from on-chain order flow, implied probabilities, and
          liquidity patterns. Use these to frame your next trade.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {insightItems.map((item) => (
          <Card key={item.title} className="border-[#2f2716]/80 bg-[#141007]/95">
            <CardHeader>
              <CardTitle className="text-lg text-[#f5f1e6]">{item.title}</CardTitle>
              <CardDescription className="text-[#6f6550]">
                {item.category}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wide text-[#6f6550]">
                Momentum {item.change >= 0 ? '+' : ''}
                {(item.change * 100).toFixed(1)}%
              </div>
              <div className="rounded-full bg-[#1f1a12] px-4 py-2 text-sm text-[#fbd24d]">
                Liquidity {formatUsd(item.liquidity)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
