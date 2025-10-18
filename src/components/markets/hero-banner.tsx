'use client'

import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { ArrowRight, Award, Flame, X } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { marketCategories, markets } from '@/lib/data'
import { formatUsd } from '@/lib/utils'

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

  return (
    <section className="relative overflow-hidden rounded-4xl border border-[#352a17] bg-gradient-to-br from-[#1f1a11] via-[#15110a] to-[#0f0c07] p-8 md:p-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,210,77,0.25),_transparent_55%)]" />
      <div className="relative grid gap-10 md:grid-cols-[1.15fr_1fr]">
        <div className="space-y-6">
          <Badge className="gap-2 text-sm font-semibold uppercase tracking-[0.2em]">
            Launch week
          </Badge>
          <h1 className="text-4xl font-bold leading-tight text-[#f5f1e6] md:text-5xl">
            Trade the headlines across BNB-native markets.
          </h1>
          <p className="max-w-xl text-lg text-[#bfb59f]">
            BETNB delivers the Polymarket experience to BNB Chain with on-chain
            settlement, live data, and a lean liquidity pool built for rapid-fire markets.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="px-7 text-base font-semibold uppercase tracking-wide"
            >
              <Link href={marketsAnchor}>Explore markets</Link>
            </Button>
            <Dialog.Root open={createOpen} onOpenChange={handleOpenChange}>
              <Dialog.Trigger asChild>
                <Button variant="secondary" size="lg" className="px-7 text-base">
                  Create market
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(520px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-[#2f2716] bg-[#12100b] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <Dialog.Title className="text-2xl font-semibold text-[#f5f1e6]">
                        Launch a new market
                      </Dialog.Title>
                      <Dialog.Description className="mt-1 text-sm text-[#9d9278]">
                        Submit a market idea. We&apos;ll draft the market details and
                        notify you when it goes live.
                      </Dialog.Description>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        className="rounded-full border border-[#2d2616] p-2 text-[#9d9278] transition hover:text-[#fbd24d]"
                        aria-label="Close create market dialog"
                      >
                        <X size={16} />
                      </button>
                    </Dialog.Close>
                  </div>

                  {submission ? (
                    <div className="mt-6 space-y-4">
                      <div className="rounded-2xl border border-[#2d2616] bg-[#18120b] p-4">
                        <div className="text-xs uppercase tracking-wide text-[#6f6550]">
                          Draft queued
                        </div>
                        <div className="mt-2 text-lg font-semibold text-[#f5f1e6]">
                          {submission.question || 'Untitled market'}
                        </div>
                        <div className="mt-1 text-sm text-[#9d9278]">
                          {submission.category} ·{' '}
                          {submission.resolveDate
                            ? new Date(submission.resolveDate).toLocaleString()
                            : 'Resolve date TBD'}
                        </div>
                        {submission.liquidity > 0 && (
                          <div className="mt-3 text-xs uppercase tracking-wide text-[#6f6550]">
                            Seed liquidity: {formatUsd(submission.liquidity)}
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-[#9d9278]">
                        Our listing desk will reach out when the trading ticket is minted.
                        You can monitor updates from the notifications panel in the
                        header.
                      </p>

                      <div className="flex justify-between gap-3">
                        <Button
                          variant="secondary"
                          onClick={() => setSubmission(null)}
                          className="w-full"
                        >
                          Create another
                        </Button>
                        <Dialog.Close asChild>
                          <Button className="w-full">Return home</Button>
                        </Dialog.Close>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                      <div className="space-y-2">
                        <label
                          htmlFor="question"
                          className="text-sm font-medium text-[#d9cfba]"
                        >
                          Market question
                        </label>
                        <textarea
                          id="question"
                          name="question"
                          required
                          placeholder="Will BTC close above $100k on 31 Dec 2025?"
                          className="h-24 w-full rounded-2xl border border-[#2d2616] bg-[#18120b] px-4 py-3 text-sm text-[#f5f1e6] placeholder:text-[#6f6550] focus-visible:outline-2 focus-visible:outline-[#f0c859]/70"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="category"
                            className="text-sm font-medium text-[#d9cfba]"
                          >
                            Category
                          </label>
                          <select
                            id="category"
                            name="category"
                            className="h-11 w-full rounded-2xl border border-[#2d2616] bg-[#18120b] px-4 text-sm text-[#f5f1e6] focus-visible:outline-2 focus-visible:outline-[#f0c859]/70"
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
                            className="text-sm font-medium text-[#d9cfba]"
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
                          className="text-sm font-medium text-[#d9cfba]"
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
          <div className="grid gap-4 pt-4 text-sm text-[#aba28f] md:grid-cols-3">
            <Metric
              title={metrics.volume}
              subtitle="24h total volume"
              icon={<Flame size={16} />}
            />
            <Metric
              title={metrics.liquidity}
              subtitle="Locked liquidity"
              icon={<Award size={16} />}
            />
            <Metric
              title={metrics.markets}
              subtitle="Open markets"
              icon={<ArrowRight size={16} />}
            />
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-4xl border border-[#3b2f1b]/60 bg-[#15110a]/80 blur-3xl" />
          <div className="relative h-full rounded-4xl border border-[#3b2f1b] bg-[#141007] p-6">
            <div className="flex items-center justify-between text-sm text-[#94876d]">
              <span>Momentum board</span>
              <Link href="/leaderboard" className="text-[#fbd24d]">
                Open
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {cheatSheet.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-3xl border border-[#2d2617] bg-[#1a150c] p-4"
                >
                  <div>
                    <div className="text-xs uppercase tracking-wide text-[#6f6550]">
                      {item.category}
                    </div>
                    <div className="text-lg font-semibold text-[#f5f1e6]">
                      {item.title}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#6f6550]">Yes</div>
                    <div className="text-xl font-semibold text-[#fbd24d]">{item.yes}</div>
                    <div className="text-xs text-[#8be280]">+{item.move}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const cheatSheet = [
  {
    category: 'Politics',
    title: 'Harris 2028 nomination',
    yes: '62¢',
    move: '+1.4%',
  },
  {
    category: 'Crypto',
    title: 'BTC above $80k in Oct',
    yes: '44¢',
    move: '+0.8%',
  },
  {
    category: 'Macro',
    title: 'Fed cuts by Dec 2025',
    yes: '36¢',
    move: '-0.6%',
  },
]

type MetricProps = {
  title: string
  subtitle: string
  icon: ReactNode
}

function Metric({ title, subtitle, icon }: MetricProps) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-[#2d2617] bg-[#141007] p-4">
      <span className="rounded-full bg-[#221c11] p-2 text-[#fbd24d]">{icon}</span>
      <div>
        <div className="text-xl font-semibold text-[#f5f1e6]">{title}</div>
        <div className="text-xs uppercase tracking-wide text-[#6f6550]">{subtitle}</div>
      </div>
    </div>
  )
}
