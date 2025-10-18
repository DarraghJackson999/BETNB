'use client'

import { useEffect, useMemo, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { CategoryFilters } from '@/components/markets/category-filters'
import { MarketCard } from '@/components/markets/market-card'
import { MarketsTable } from '@/components/markets/markets-table'
import { markets as allMarkets } from '@/lib/data'
import { Button } from '@/components/ui/button'

export function MarketDiscovery() {
  const [category, setCategory] = useState('All')
  const [activeTab, setActiveTab] = useState('grid')
  const [showAllFeatured, setShowAllFeatured] = useState(false)

  const filtered = useMemo(() => {
    if (category === 'All') return allMarkets
    return allMarkets.filter((market) => market.category === category)
  }, [category])

  useEffect(() => {
    setShowAllFeatured(false)
  }, [category])

  useEffect(() => {
    if (activeTab !== 'grid') {
      setShowAllFeatured(false)
    }
  }, [activeTab])

  return (
    <div id="markets" className="space-y-8">
      <CategoryFilters markets={allMarkets} onChange={setCategory} />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap gap-3 rounded-3xl border border-[#2d2617] bg-[#15110a] p-2">
          <TabsTrigger value="grid">Featured</TabsTrigger>
          <TabsTrigger value="table">Full board</TabsTrigger>
          <TabsTrigger value="liquid">Liquidity heavy</TabsTrigger>
          <TabsTrigger value="ending">Closing soon</TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <div className="grid gap-6 lg:grid-cols-2">
            {(showAllFeatured ? filtered : filtered.slice(0, 6)).map((market, index) => (
              <MarketCard
                key={market.id}
                market={market}
                accent={index % 2 === 0 ? 'gold' : 'emerald'}
              />
            ))}
          </div>
          {filtered.length > 6 && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="secondary"
                onClick={() => setShowAllFeatured((prev) => !prev)}
                className="px-6 text-sm"
              >
                {showAllFeatured ? 'Show fewer' : `Show all ${filtered.length}`}
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="table">
          <MarketsTable markets={filtered} />
        </TabsContent>
        <TabsContent value="liquid">
          <MarketsTable
            markets={[...filtered].sort((a, b) => b.liquidity - a.liquidity).slice(0, 10)}
          />
        </TabsContent>
        <TabsContent value="ending">
          <MarketsTable
            markets={[...filtered]
              .sort((a, b) => a.resolveDate.localeCompare(b.resolveDate))
              .slice(0, 10)}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
