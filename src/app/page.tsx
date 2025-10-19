import Link from 'next/link'

import { HeroBanner } from '@/components/markets/hero-banner'
import { LiveFeed } from '@/components/markets/live-feed'
import { MarketDiscovery } from '@/components/markets/market-discovery'
import { MarketOverviewStats } from '@/components/markets/market-overview-stats'
import { LiquidityPulse } from '@/components/markets/liquidity-pulse'
import { markets } from '@/lib/data'
import { formatPrice, formatUsd } from '@/lib/utils'

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-[1340px] flex-col gap-12 px-6 pb-24">
      <HeroBanner marketsAnchor="#markets" />
      <MarketOverviewStats />
      <div className="space-y-10">
        <MarketDiscovery />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <LiveFeed markets={markets} />
          <LiquidityPulse markets={markets} />
        </div>
      </div>
      <section className="rounded-4xl border border-[rgba(127,91,255,0.3)] bg-[rgba(14,10,36,0.88)] p-8 shadow-[0_24px_80px_rgba(70,48,150,0.28)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#b9a8ef]">
              Depth Radar
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Sweep concealed BNB flow before it hits the tape
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#b9a8ef]">
              Snapshot of private prediction markets lighting up right now. Depth scores
              pair internal pool signals with BNB whale routes so you can position before
              public order books react.
            </p>
          </div>
          <div className="grid gap-2 text-xs text-[#a89dd4] lg:text-right">
            <span>Live sync · last block cleared</span>
            <span className="font-mono text-[#d7c6ff]">
              Source · anonymized BNB block tape × internal oracle mesh
            </span>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {depthRadar.map((item) => (
            <Link
              key={item.id}
              href={`/markets/${item.slug}`}
              className="group rounded-3xl border border-[rgba(127,91,255,0.28)] bg-[rgba(21,14,52,0.74)] p-4 backdrop-blur transition hover:-translate-y-1 hover:border-[rgba(127,91,255,0.54)] hover:shadow-[0_22px_60px_rgba(86,58,164,0.3)]"
            >
              <div className="text-xs uppercase tracking-wide text-[#a89dd4]">
                {item.category}
              </div>
              <div className="mt-2 line-clamp-2 text-sm font-semibold text-white">
                {item.label}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-[#b9a8ef]">
                <span className="font-mono text-lg text-white">{item.price}</span>
                <span
                  className={
                    item.change.startsWith('-') ? 'text-[#ff92b2]' : 'text-[#8bd4ff]'
                  }
                >
                  {item.change.startsWith('-') ? '' : '+'}
                  {item.change}%
                </span>
              </div>
              <div className="mt-3 text-xs text-[#a89dd4]">
                Vault size {item.liquidity}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-4xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.9)] p-8 shadow-[0_24px_80px_rgba(70,48,150,0.28)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#b9a8ef]">
              Veiled Order Books
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Monitor hidden interest across BNB prediction lanes
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#b9a8ef]">
              Internal fills merged with on-chain events expose which contracts absorb the
              most stealth size. Ride the rotation by leaning into overfunded pools.
            </p>
          </div>
          <div className="rounded-full border border-[rgba(127,91,255,0.4)] bg-[rgba(127,91,255,0.18)] px-5 py-2 text-xs font-mono text-[#d7c6ff]">
            Ref: internal darkpool blotter
          </div>
        </div>
        <div className="mt-8 overflow-hidden rounded-3xl border border-[rgba(127,91,255,0.26)]">
          <table className="w-full text-sm text-white">
            <thead className="bg-[rgba(127,91,255,0.12)] text-xs uppercase tracking-wide text-[#b9a8ef]">
              <tr>
                <th className="px-4 py-3 text-left">Pool</th>
                <th className="px-4 py-3 text-left">Pair</th>
                <th className="px-4 py-3 text-left">FDV</th>
                <th className="px-4 py-3 text-left">24h Flow</th>
                <th className="px-4 py-3 text-left">Last Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(127,91,255,0.16)]">
              {veiledPools.map((pool) => (
                <tr
                  key={pool.id}
                  className="group cursor-pointer bg-[rgba(12,8,32,0.68)] transition hover:bg-[rgba(127,91,255,0.16)]"
                >
                  <td className="px-4 py-4 font-semibold text-white">
                    <Link href={`/markets/${pool.slug}`} className="block w-full">
                      {pool.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-[#b9a8ef]">
                    <Link href={`/markets/${pool.slug}`} className="block w-full">
                      {pool.pair}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-[#b9a8ef]">
                    <Link href={`/markets/${pool.slug}`} className="block w-full">
                      {pool.fdv}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-[#8bd4ff]">
                    <Link href={`/markets/${pool.slug}`} className="block w-full">
                      +{pool.flow}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-[#a89dd4]">
                    <Link href={`/markets/${pool.slug}`} className="block w-full">
                      {pool.time}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-[rgba(127,91,255,0.28)] bg-[rgba(12,8,32,0.88)] p-8 text-center shadow-[0_20px_70px_rgba(70,48,150,0.28)]">
        <div className="text-xs uppercase tracking-[0.3em] text-[#b9a8ef]">
          Access Token
        </div>
        <h2 className="mt-3 text-3xl font-semibold text-white">
          UmbraMarkets Access Token
        </h2>
        <p className="mt-4 text-sm text-[#b9a8ef]">
          Stake the access token to enter private prediction pools and route dark orders.
          Official contract details remain undisclosed until listing clearance, so treat
          the current label as authoritative.
        </p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-dashed border-[rgba(127,91,255,0.45)] bg-[rgba(18,12,45,0.78)] px-6 py-4 text-sm text-[#d7c6ff]">
          Coin Address <span className="font-mono text-white">TBA</span>
        </div>
      </section>
    </div>
  )
}

const depthRadar = markets.slice(0, 8).map((market) => ({
  id: market.id,
  slug: market.slug,
  label: market.question,
  category: market.category,
  price: formatPrice(market.options[0].price),
  change: ((market.options[0].change ?? 0) * 100).toFixed(1),
  liquidity: formatUsd(market.liquidity),
}))

const veiledPools = markets.slice(0, 5).map((market) => ({
  id: market.id,
  slug: market.slug,
  name: market.question.split('?')[0],
  pair: `${market.category} · ${market.tags[0] ?? 'BNB'}`,
  fdv: formatUsd(market.liquidity * 4),
  flow: formatUsd(market.volume24h).replace('$', ''),
  time: `${Math.floor(Math.random() * 12) + 1}m ago`,
}))
