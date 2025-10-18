'use client'

import { useMemo, useState } from 'react'
import { Filter } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { Market } from '@/lib/types'
import { cn } from '@/lib/utils'

type CategoryFiltersProps = {
  markets: Market[]
  onChange?: (category: string) => void
}

export function CategoryFilters({ markets, onChange }: CategoryFiltersProps) {
  const [active, setActive] = useState('All')

  const { filters, counts } = useMemo(() => {
    const tally = new Map<string, number>()

    markets.forEach((market) => {
      tally.set(market.category, (tally.get(market.category) ?? 0) + 1)
    })

    const dynamicFilters = [
      'All',
      ...Array.from(tally.entries())
        .sort((a, b) => {
          if (b[1] !== a[1]) return b[1] - a[1]
          return a[0].localeCompare(b[0])
        })
        .map(([category]) => category),
    ]

    return { filters: dynamicFilters, counts: tally }
  }, [markets])

  const handleClick = (category: string) => {
    setActive(category)
    onChange?.(category)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center gap-2 rounded-full border border-[#2d2617] bg-[#15110a] px-4 py-2 text-xs uppercase tracking-wide text-[#6f6550]">
        <Filter size={14} /> Filters
      </span>
      {filters.map((label) => {
        const count = label === 'All' ? markets.length : (counts.get(label) ?? 0)
        return (
          <button
            key={label}
            onClick={() => handleClick(label)}
            className={cn(
              'flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition',
              active === label
                ? 'border-[#fbd24d]/70 bg-[#241d0d] text-[#f5f1e6]'
                : 'border-[#2d2617] bg-[#141007] text-[#bfb59f] hover:border-[#fbd24d]/40'
            )}
          >
            {label}
            <span className="rounded-full bg-[#1f1a12] px-2 text-xs text-[#fbd24d]">
              {count}
            </span>
          </button>
        )
      })}
      <Button
        variant="ghost"
        size="sm"
        className="ml-auto hidden text-[#fbd24d] md:inline-flex"
      >
        Advanced
      </Button>
    </div>
  )
}
