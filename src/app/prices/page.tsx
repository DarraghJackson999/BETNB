import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatUsd } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const assets = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
]

type PriceResponse = Record<
  string,
  {
    usd: number
    usd_24h_change: number
  }
>

async function getSpotPrices(): Promise<PriceResponse | null> {
  const ids = assets.map((asset) => asset.id).join(',')
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
      {
        cache: 'no-store',
        headers: {
          accept: 'application/json',
        },
      }
    )

    if (!res.ok) {
      console.error('Failed to load spot prices', res.status)
      return null
    }

    return (await res.json()) as PriceResponse
  } catch (error) {
    console.error('Unable to load spot prices', error)
    return null
  }
}

export default async function PricesPage() {
  const prices = await getSpotPrices()

  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 px-6 pb-20">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-[#f5f1e6]">Live crypto board</h1>
        <p className="max-w-2xl text-base text-[#bfb59f]">
          Real-time spot prices for the assets that matter most on BETNB. Refreshes each
          time you open the page.
        </p>
      </header>

      <Card className="border-[#2f2716]/80 bg-[#141007]/95">
        <CardHeader>
          <CardTitle className="text-[#f5f1e6]">Spot prices</CardTitle>
          <CardDescription className="text-[#6f6550]">
            Data provided by CoinGecko. Figures update on page load.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {assets.map((asset) => {
              const price = prices?.[asset.id]?.usd ?? null
              const change = prices?.[asset.id]?.usd_24h_change ?? null
              const changeLabel =
                change !== null ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : '—'
              return (
                <div
                  key={asset.id}
                  className="flex items-center justify-between rounded-2xl border border-[#2d2617] bg-[#18120b] px-5 py-4"
                >
                  <div>
                    <div className="text-xs uppercase tracking-wide text-[#6f6550]">
                      {asset.symbol}
                    </div>
                    <div className="text-lg font-semibold text-[#f5f1e6]">
                      {asset.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#f5f1e6]">
                      {price !== null ? formatUsd(price) : 'Loading'}
                    </div>
                    <div
                      className={`text-xs ${change && change < 0 ? 'text-[#f08080]' : 'text-[#8be280]'}`}
                    >
                      {changeLabel}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {!prices && (
            <p className="mt-4 text-sm text-[#f08080]">
              Unable to load live prices right now. Please retry in a moment.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
