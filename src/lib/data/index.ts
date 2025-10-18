import rawMarkets from '@/lib/data/markets.json'
import rawPositions from '@/lib/data/positions.json'
import rawBalances from '@/lib/data/balances.json'
import type { Balance, Market, Position } from '@/lib/types'

const markets = dedupeMarkets(rawMarkets)
const marketCategories = extractMarketCategories(markets)
const openMarketCount = countOpenMarkets(markets)
const positions = rawPositions as Position[]
const balances = rawBalances as Balance[]

export { markets, marketCategories, openMarketCount, positions, balances }

function dedupeMarkets(data: Market[]): Market[] {
  const slugSet = new Set<string>()
  const questionSet = new Set<string>()
  const result: Market[] = []

  for (const market of data) {
    const slugKey = (market.slug || market.id || '').trim().toLowerCase()
    const questionKey = market.question?.trim().toLowerCase()

    if (slugKey && slugSet.has(slugKey)) continue
    if (questionKey && questionSet.has(questionKey)) continue

    if (slugKey) slugSet.add(slugKey)
    if (questionKey) questionSet.add(questionKey)

    const category = market.category?.trim() || 'Other'

    result.push({
      ...market,
      category,
    })
  }

  return result
}

function extractMarketCategories(data: Market[]): string[] {
  const counts = new Map<string, number>()

  data.forEach((market) => {
    const category = market.category
    counts.set(category, (counts.get(category) ?? 0) + 1)
  })

  return Array.from(counts.entries())
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1]
      return a[0].localeCompare(b[0])
    })
    .map(([category]) => category)
}

function countOpenMarkets(data: Market[]): number {
  const now = Date.now()

  return data.reduce((total, market) => {
    const resolveTime = Date.parse(market.resolveDate ?? '')
    if (Number.isNaN(resolveTime) || resolveTime > now) {
      return total + 1
    }
    return total
  }, 0)
}
