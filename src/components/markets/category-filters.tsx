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
      <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(127,91,255,0.28)] bg-[rgba(10,7,27,0.9)] px-4 py-2 text-xs uppercase tracking-wide text-[#a89dd4] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <Filter size={14} /> Filters
      </span>
      {filters.map((label) => {
        const count = label === 'All' ? markets.length : (counts.get(label) ?? 0)
        return (
          <button
            key={label}
            onClick={() => handleClick(label)}
            className={cn(
              'flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition backdrop-blur',
              active === label
                ? 'border-[rgba(127,91,255,0.6)] bg-[rgba(127,91,255,0.22)] text-[#f4f0ff] shadow-[0_0_32px_rgba(86,58,164,0.34)]'
                : 'border-[rgba(127,91,255,0.28)] bg-[rgba(10,7,27,0.85)] text-[#a89dd4] hover:border-[rgba(127,91,255,0.45)] hover:text-[#f4f0ff]'
            )}
          >
            {label}
            <span className="rounded-full bg-[rgba(127,91,255,0.2)] px-2 text-xs text-[#dfd5ff]">
              {count}
            </span>
          </button>
        )
      })}
      <Button
        variant="ghost"
        size="sm"
        className="ml-auto hidden text-[#dfd5ff] hover:text-[#f4f0ff] md:inline-flex"
      >
        Advanced
      </Button>
    </div>
  )
}
