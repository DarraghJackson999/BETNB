'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="mx-auto flex h-[calc(100vh-160px)] w-full max-w-[960px] flex-col items-center justify-center px-6 text-center">
      <div className="rounded-[32px] border border-[#2f2716] bg-[#141007]/70 px-12 py-16 backdrop-blur">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#3a301b] bg-[#1b170f] px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#fbd24d]">
          <span className="h-2 w-2 rounded-full bg-[#fbd24d]" aria-hidden />
          Missing Market
        </div>
        <h1 className="mt-8 text-4xl font-semibold text-[#f5f1e6] sm:text-5xl">
          We couldn&apos;t find that market
        </h1>
        <p className="mt-4 max-w-[520px] text-sm leading-6 text-[#bfb59f] sm:text-base">
          The contract you&apos;re looking for might have settled, moved to a private
          board, or never existed. Explore the live boards below to keep trading the most
          active narratives on BNB Chain.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to discovery
            </Link>
          </Button>
          <Button asChild variant="secondary" className="gap-2">
            <Link href="/markets">Browse all markets</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
