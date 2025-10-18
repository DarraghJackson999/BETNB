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
      <section className="rounded-3xl border border-[#2d2616] bg-[#141007] p-8 text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-[#fbd24d]">
          Meme Token Spotlight
        </div>
        <h2 className="mt-3 text-3xl font-semibold text-[#f5f1e6]">FOUR Meme Token</h2>
        <p className="mt-4 text-sm text-[#d9cfba]">
          The official contract address for FOUR will appear here once finalised. Stay
          tuned—treasury will publish the verified address shortly.
        </p>
        <div className="mt-6 rounded-2xl border border-dashed border-[#fbd24d]/60 bg-[#1a150c] px-6 py-4 text-sm text-[#fbd24d]">
          Contract Address: <span className="font-mono text-[#f5f1e6]">pending</span>
        </div>
      </section>
    </div>
  )
}
