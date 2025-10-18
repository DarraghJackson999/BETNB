import { HeroBanner } from '@/components/markets/hero-banner'
import { LiveFeed } from '@/components/markets/live-feed'
import { MarketDiscovery } from '@/components/markets/market-discovery'
import { MarketOverviewStats } from '@/components/markets/market-overview-stats'
import { LiquidityPulse } from '@/components/markets/liquidity-pulse'
import { markets } from '@/lib/data'

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-12 px-6 pb-20">
      <HeroBanner marketsAnchor="#markets" />
      <MarketOverviewStats />
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_360px]">
        <MarketDiscovery />
        <div className="space-y-6">
          <LiveFeed markets={markets} />
          <LiquidityPulse />
        </div>
      </div>
    </div>
  )
}
