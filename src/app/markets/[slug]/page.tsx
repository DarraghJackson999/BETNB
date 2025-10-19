import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Coins, MessageCircle } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MarketPriceChart } from '@/components/markets/market-price-chart'
import { OrderTicketButton } from '@/components/markets/order-ticket-button'
import { markets } from '@/lib/data'
import { cn, formatPrice, formatUsd } from '@/lib/utils'

export function generateStaticParams() {
  return markets.map((market) => ({ slug: market.slug }))
}

type MarketPageProps = {
  params: Promise<{ slug: string }>
}

export default async function MarketPage({ params }: MarketPageProps) {
  const { slug } = await params
  const market = markets.find((item) => item.slug === slug)
  if (!market) notFound()

  const yes = market.options[0]
  const no = market.options[1]

  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 px-6 pb-20">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-[#cbbdff] transition hover:text-white"
      >
        <ArrowLeft size={16} /> Back to markets
      </Link>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-[#a89dd4]">
              <Badge className="border-[rgba(127,91,255,0.45)] bg-[rgba(127,91,255,0.18)] text-[#d7c6ff]">
                {market.category}
              </Badge>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> Resolves {market.resolveDate.slice(0, 10)}
              </span>
              <span className="flex items-center gap-1">
                <Coins size={14} /> Liquidity {formatUsd(market.liquidity)}
              </span>
            </div>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">
              {market.question}
            </h1>
            <p className="max-w-3xl text-base text-[#b9a8ef]">{market.description}</p>
            <div className="flex flex-wrap gap-2 text-xs text-[#a89dd4]">
              {market.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[rgba(127,91,255,0.14)] px-3 py-1 text-[#d7c6ff]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          <Card className="border-[rgba(127,91,255,0.32)] bg-[rgba(12,8,32,0.92)] shadow-[0_26px_84px_rgba(63,44,124,0.32)]">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Price performance</CardTitle>
                <CardDescription className="text-[#a89dd4]">
                  Intraday pricing preview of the yes contract
                </CardDescription>
              </div>
              <div className="rounded-full border border-[rgba(127,91,255,0.35)] bg-[rgba(127,91,255,0.18)] px-4 py-2 text-xs text-[#d7c6ff]">
                Last trade
                <span className="ml-2 font-semibold text-white">
                  {formatPrice(yes.price)}
                </span>
              </div>
            </CardHeader>
            <CardContent className="h-72">
              <MarketPriceChart data={market.chart} marketId={market.id} />
            </CardContent>
          </Card>

          <Card className="border-[rgba(127,91,255,0.32)] bg-[rgba(12,8,32,0.92)] shadow-[0_26px_84px_rgba(63,44,124,0.32)]">
            <CardHeader>
              <CardTitle className="text-white">Order actions</CardTitle>
              <CardDescription className="text-[#a89dd4]">
                Connect your wallet and place live orders directly from this ticket.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {[
                { label: 'Buy Yes', option: yes, accent: 'buy' },
                { label: 'Buy No', option: no, accent: 'sell' },
              ].map((side) => (
                <div
                  key={side.label}
                  className={cn(
                    'rounded-3xl border px-5 py-6 shadow-[0_22px_60px_rgba(86,58,164,0.28)] transition',
                    side.accent === 'buy'
                      ? 'border-[rgba(81,196,166,0.32)] bg-[rgba(21,44,53,0.86)]'
                      : 'border-[rgba(255,121,146,0.34)] bg-[rgba(53,21,40,0.86)]'
                  )}
                >
                  <div className="text-xs uppercase tracking-wide text-[#a89dd4]">
                    {side.label}
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-semibold text-white">
                        {formatPrice(side.option.price)}
                      </div>
                      <div className="text-xs text-[#cbbdff]">
                        Book depth {formatUsd(side.option.liquidity)}
                      </div>
                    </div>
                    <OrderTicketButton
                      label={side.label}
                      tone={side.accent === 'buy' ? 'buy' : 'sell'}
                    />
                  </div>
                  <div className="mt-4 text-xs text-[#d7c6ff]">
                    Latest move {side.option.change >= 0 ? '+' : ''}
                    {(side.option.change * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-[rgba(127,91,255,0.32)] bg-[rgba(12,8,32,0.92)] shadow-[0_26px_84px_rgba(63,44,124,0.32)]">
            <CardHeader>
              <CardTitle className="text-white">Context</CardTitle>
              <CardDescription className="text-[#a89dd4]">
                Curated headlines and notes driving the market.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {market.news.map((news) => (
                <div
                  key={news.id}
                  className="rounded-2xl border border-[rgba(127,91,255,0.26)] bg-[rgba(21,14,52,0.82)] p-4"
                >
                  <div className="text-xs uppercase tracking-wide text-[#a89dd4]">
                    {news.source} · {news.timeAgo}
                  </div>
                  <div className="mt-1 text-base font-semibold text-white">
                    {news.title}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="border-[rgba(127,91,255,0.32)] bg-[rgba(12,8,32,0.92)] shadow-[0_26px_84px_rgba(63,44,124,0.32)]">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wide text-[#cbbdff]">
                Market vitals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-[#e8e2ff]">
              <Detail label="24h volume" value={formatUsd(market.volume24h)} />
              <Detail label="Open interest" value={formatUsd(market.openInterest)} />
              <Detail label="Yes depth" value={formatUsd(yes.liquidity)} />
              <Detail label="No depth" value={formatUsd(no.liquidity)} />
              <Detail
                label="Spread"
                value={`${Math.abs(yes.price - no.price).toFixed(2)}¢`}
              />
            </CardContent>
          </Card>

          <Card className="border-[rgba(127,91,255,0.32)] bg-[rgba(12,8,32,0.92)] shadow-[0_26px_84px_rgba(63,44,124,0.32)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wide text-[#cbbdff]">
                <MessageCircle size={16} /> Order book pulses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-[#e8e2ff]">
              <div className="rounded-2xl border border-[rgba(127,91,255,0.26)] bg-[rgba(21,14,52,0.82)] p-4">
                <div className="text-xs uppercase tracking-wide text-[#a89dd4]">
                  Depth snapshot
                </div>
                <div className="mt-2 space-y-1">
                  {[
                    { label: 'Yes bids', value: formatUsd(6200) },
                    { label: 'Yes asks', value: formatUsd(5400) },
                    { label: 'No bids', value: formatUsd(5800) },
                    { label: 'No asks', value: formatUsd(5120) },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-[#cbbdff]">{row.label}</span>
                      <span className="font-medium text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[rgba(127,91,255,0.26)] bg-[rgba(21,14,52,0.82)] p-4">
                <div className="text-xs uppercase tracking-wide text-[#a89dd4]">
                  Liquidity notes
                </div>
                <p className="mt-2 text-sm text-[#d7c6ff]">
                  Community LPs posted an extra $1.8k on the yes side overnight. Spreads
                  now 4¢ wide on clips up to $250.
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

type DetailProps = {
  label: string
  value: string
}

function Detail({ label, value }: DetailProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#cbbdff]">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  )
}
