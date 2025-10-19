'use client'

import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { ArrowRight, Award, Flame, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { marketCategories, markets } from '@/lib/data'
import { formatPrice, formatUsd } from '@/lib/utils'

type CreatedMarketDraft = {
  question: string
  category: string
  resolveDate: string
  liquidity: number
}

type HeroBannerProps = {
  marketsAnchor?: string
}

export function HeroBanner({ marketsAnchor = '#markets' }: HeroBannerProps) {
  const [createOpen, setCreateOpen] = useState(false)
  const [submission, setSubmission] = useState<CreatedMarketDraft | null>(null)

  const metrics = useMemo(() => {
    const totalVolume = markets.reduce((sum, market) => sum + market.volume24h, 0)
    const totalLiquidity = markets.reduce((sum, market) => sum + market.liquidity, 0)
    const normalizedVolume = Math.round(totalVolume * 0.18)
    const normalizedLiquidity = Math.round(totalLiquidity * 0.32)

    return {
      volume: formatUsd(normalizedVolume),
      liquidity: formatUsd(normalizedLiquidity),
      markets: '60 open markets',
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setSubmission({
      question: (formData.get('question') as string)?.trim(),
      category: (formData.get('category') as string) || 'Other',
      resolveDate: (formData.get('resolve-date') as string) || '',
      liquidity: Number(formData.get('liquidity')) || 0,
    })

    form.reset()
  }

  const handleOpenChange = (open: boolean) => {
    setCreateOpen(open)
    if (!open) {
      setSubmission(null)
    }
  }

  const highlightMarkets = useMemo(() => {
    return markets
      .slice()
      .sort((a, b) => (b.volume24h ?? 0) - (a.volume24h ?? 0))
      .slice(0, 3)
      .map((market) => {
        const primaryOption = market.options[0]
        const price = primaryOption?.price ?? 0
        const change = primaryOption?.change ?? 0
        return {
          id: market.id,
          href: `/markets/${market.slug}`,
          category: market.category,
          title: market.question,
          yesPrice: formatPrice(price),
          changeLabel: `${change >= 0 ? '+' : ''}${(change * 100).toFixed(1)}%`,
          changeClass: change >= 0 ? 'text-[#8bd4ff]' : 'text-[#ff92b2]',
          volume: formatUsd(market.volume24h ?? 0),
        }
      })
  }, [])

  return (
    <section className="rounded-4xl border border-[rgba(127,91,255,0.34)] bg-[rgba(12,8,32,0.92)] p-8 md:p-12 shadow-[0_36px_108px_rgba(63,44,124,0.32)]">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-7">
          <div className="flex items-center gap-3">
            <Badge className="gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-white">
              UmbraMarkets Desk
            </Badge>
            <Image
              src="/umbra-logos/logo-primary.png"
              alt="UmbraMarkets mark"
              width={36}
              height={36}
              className="rounded-full border border-[rgba(127,91,255,0.4)] bg-black/20 p-1"
              priority
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              Dark-pool prediction markets for serious traders.
            </h1>
            <p className="max-w-2xl text-lg text-[#b9a8ef]">
              Execute anonymously across curated markets backed by deep, private order
              books. UmbraMarkets keeps institutional intent quiet until settlement prints
              on-chain.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="relative overflow-hidden px-9 text-base font-semibold text-[#0e0728] shadow-[0_22px_60px_rgba(122,88,210,0.42)] ring-1 ring-[rgba(170,140,255,0.55)] transition-all hover:shadow-[0_26px_70px_rgba(140,108,230,0.5)] hover:ring-[rgba(196,168,255,0.6)] bg-gradient-to-r from-[#7f5bff] via-[#a377ff] to-[#f6ecff]"
            >
              <Link href={marketsAnchor}>Browse markets</Link>
            </Button>
            <Dialog.Root open={createOpen} onOpenChange={handleOpenChange}>
              <Dialog.Trigger asChild>
                <Button variant="secondary" size="lg" className="px-7 text-base">
                  Submit market idea
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(520px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-[rgba(127,91,255,0.38)] bg-[rgba(15,10,36,0.98)] p-8 shadow-[0_50px_160px_rgba(63,44,124,0.4)]">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <Dialog.Title className="text-2xl font-semibold text-white">
                        Launch a new market
                      </Dialog.Title>
                      <Dialog.Description className="mt-1 text-sm text-[#b9a8ef]">
                        Outline your contract. Our listings desk will review and alert you
                        when it goes live.
                      </Dialog.Description>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        className="rounded-full border border-[rgba(127,91,255,0.38)] p-2 text-[#d7c6ff] transition hover:text-white"
                        aria-label="Close create market dialog"
                      >
                        <X size={16} />
                      </button>
                    </Dialog.Close>
                  </div>

                  {submission ? (
                    <div className="mt-6 space-y-4">
                      <div className="rounded-2xl border border-[rgba(127,91,255,0.34)] bg-[rgba(18,12,45,0.92)] p-4">
                        <div className="text-xs uppercase tracking-wide text-[#b9a8ef]">
                          Draft queued
                        </div>
                        <div className="mt-2 text-lg font-semibold text-white">
                          {submission.question || 'Untitled market'}
                        </div>
                        <div className="mt-1 text-sm text-[#b9a8ef]">
                          {submission.category} ·{' '}
                          {submission.resolveDate
                            ? new Date(submission.resolveDate).toLocaleString()
                            : 'Resolve date TBD'}
                        </div>
                        {submission.liquidity > 0 && (
                          <div className="mt-3 text-xs uppercase tracking-wide text-[#c9b5ff]">
                            Seed liquidity: {formatUsd(submission.liquidity)}
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-[#b9a8ef]">
                        We will follow up via your desk contact and announce the listing
                        through notifications.
                      </p>

                      <div className="flex justify-between gap-3">
                        <Button
                          variant="secondary"
                          onClick={() => setSubmission(null)}
                          className="w-full"
                        >
                          Submit another
                        </Button>
                        <Dialog.Close asChild>
                          <Button className="w-full">Close</Button>
                        </Dialog.Close>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                      <div className="space-y-2">
                        <label
                          htmlFor="question"
                          className="text-sm font-medium text-[#d7c6ff]"
                        >
                          Market question
                        </label>
                        <textarea
                          id="question"
                          name="question"
                          required
                          placeholder="Will BTC close above $100k on 31 Dec 2025?"
                          className="h-24 w-full rounded-2xl border border-[rgba(127,91,255,0.3)] bg-[rgba(18,12,45,0.92)] px-4 py-3 text-sm text-white placeholder:text-[#8a7ab8] focus-visible:outline-2 focus-visible:outline-[#b8a3ff]/70"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="category"
                            className="text-sm font-medium text-[#d7c6ff]"
                          >
                            Category
                          </label>
                          <select
                            id="category"
                            name="category"
                            className="h-11 w-full rounded-2xl border border-[rgba(127,91,255,0.3)] bg-[rgba(18,12,45,0.92)] px-4 text-sm text-white focus-visible:outline-2 focus-visible:outline-[#b8a3ff]/70"
                          >
                            {marketCategories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="resolve-date"
                            className="text-sm font-medium text-[#d7c6ff]"
                          >
                            Resolve deadline
                          </label>
                          <Input
                            id="resolve-date"
                            name="resolve-date"
                            type="datetime-local"
                            className="h-11"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="liquidity"
                          className="text-sm font-medium text-[#d7c6ff]"
                        >
                          Seed liquidity (USD)
                        </label>
                        <Input
                          id="liquidity"
                          name="liquidity"
                          type="number"
                          min="0"
                          step="50"
                          placeholder="2500"
                          className="h-11"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-1">
                        <Dialog.Close asChild>
                          <Button variant="ghost" type="button" className="px-6 text-sm">
                            Cancel
                          </Button>
                        </Dialog.Close>
                        <Button type="submit" className="px-6 text-sm">
                          Submit draft
                        </Button>
                      </div>
                    </form>
                  )}
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          <div className="grid gap-4 pt-4 text-sm text-[#b9a8ef] md:grid-cols-3">
            <Metric
              title={metrics.volume}
              subtitle="24h matched volume"
              icon={<Flame size={16} />}
            />
            <Metric
              title={metrics.liquidity}
              subtitle="Locked liquidity"
              icon={<Award size={16} />}
            />
            <Metric
              title={metrics.markets}
              subtitle="Markets live"
              icon={<ArrowRight size={16} />}
            />
          </div>
        </div>

        <aside>
          <div className="rounded-4xl border border-[rgba(127,91,255,0.34)] bg-[rgba(18,12,45,0.84)] p-6 shadow-[0_26px_74px_rgba(63,44,124,0.28)]">
            <div className="flex items-center justify-between text-sm text-[#b9a8ef]">
              <span>Live desk highlights</span>
              <Link href="/leaderboard" className="text-[#d7c6ff]">
                View leaderboard
              </Link>
            </div>
            <div className="mt-5 space-y-4">
              {highlightMarkets.length > 0 ? (
                highlightMarkets.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex items-center justify-between rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(21,14,52,0.82)] p-4 transition hover:border-[rgba(127,91,255,0.5)] hover:bg-[rgba(33,20,66,0.88)]"
                  >
                    <div>
                      <div className="text-xs uppercase tracking-wide text-[#cbbdff]">
                        {item.category}
                      </div>
                      <div className="mt-1 line-clamp-2 text-base font-semibold text-white">
                        {item.title}
                      </div>
                      <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-[#6f5fb8]">
                        24h flow {item.volume}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#a89dd4]">Yes price</div>
                      <div className="text-xl font-semibold text-white">
                        {item.yesPrice}
                      </div>
                      <div className={`text-xs ${item.changeClass}`}>
                        {item.changeLabel}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-[rgba(127,91,255,0.32)] bg-[rgba(21,14,52,0.5)] p-4 text-sm text-[#a89dd4]">
                  Live desk highlights are populating. Check back in a moment.
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

type MetricProps = {
  title: string
  subtitle: string
  icon: ReactNode
}

function Metric({ title, subtitle, icon }: MetricProps) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(18,12,45,0.92)] p-4">
      <span className="rounded-full bg-[rgba(127,91,255,0.22)] p-2 text-[#d7c6ff]">
        {icon}
      </span>
      <div>
        <div className="text-xl font-semibold text-white">{title}</div>
        <div className="text-xs uppercase tracking-wide text-[#a89dd4]">{subtitle}</div>
      </div>
    </div>
  )
}
