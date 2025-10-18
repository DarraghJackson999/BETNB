import type { Market } from '@/lib/types'
import { cn, formatPrice } from '@/lib/utils'

const mockFeed = [
  {
    id: 'feed-1',
    type: 'fill',
    message: 'First yes clip in BTC above $80k',
    detail: '$420 filled at 44¢',
    marketId: 'market-btc-oct-80k',
  },
  {
    id: 'feed-2',
    type: 'creation',
    message: 'New market: Will BNB staking yield stay above 7%?',
    detail: 'Added to Crypto',
    marketId: '',
  },
  {
    id: 'feed-3',
    type: 'fill',
    message: 'Macro desk lifts no on 2025 rate cut',
    detail: '$180 at 64¢',
    marketId: 'market-fed-cut-2025',
  },
]

type LiveFeedProps = {
  markets: Market[]
}

const badgeMap: Record<string, string> = {
  fill: 'bg-[#1e2b19] text-[#8be280]',
  creation: 'bg-[#2d2230] text-[#d8a7ff]',
}

export function LiveFeed({ markets }: LiveFeedProps) {
  return (
    <div className="rounded-3xl border border-[#2f2716] bg-[#12100a]/90 p-6">
      <div className="text-sm font-semibold uppercase tracking-wide text-[#9d9278]">
        Market tape
      </div>
      <div className="mt-4 space-y-4 text-sm text-[#d9cfba]">
        {mockFeed.map((item) => {
          const market = markets.find((m) => m.id === item.marketId)
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-[#2d2617] bg-[#18120b] p-4"
            >
              <div className="flex items-center justify-between text-xs text-[#6f6550]">
                <span
                  className={cn(
                    'rounded-full px-3 py-1 capitalize',
                    badgeMap[item.type] ?? 'bg-[#1f1a12] text-[#d9cfba]'
                  )}
                >
                  {item.type}
                </span>
                <span>{market ? market.category : 'System'}</span>
              </div>
              <div className="mt-2 text-base font-semibold text-[#f5f1e6]">
                {item.message}
              </div>
              <div className="mt-1 text-xs text-[#9d9278]">
                {item.detail}
                {market && ` · Yes ${formatPrice(market.options[0].price)}`}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
