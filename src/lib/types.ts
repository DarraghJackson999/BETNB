export type MarketOption = {
  id: string
  label: string
  price: number
  change: number
  liquidity: number
  volume24h: number
}

export type MarketChartPoint = {
  timestamp: string
  yesPrice: number
  noPrice: number
}

export type MarketNewsItem = {
  id: string
  title: string
  source: string
  timeAgo: string
}

export type Market = {
  id: string
  slug: string
  question: string
  category: string
  featured?: boolean
  liquidity: number
  volume24h: number
  openInterest: number
  resolveDate: string
  tags: string[]
  options: MarketOption[]
  chart: MarketChartPoint[]
  news: MarketNewsItem[]
  description: string
  image?: string
}

export type Position = {
  id: string
  marketId: string
  marketQuestion: string
  side: 'YES' | 'NO'
  entryPrice: number
  currentPrice: number
  quantity: number
  pnl: number
  timestamp: string
}

export type Balance = {
  token: string
  symbol: string
  amount: number
  change24h: number
}
