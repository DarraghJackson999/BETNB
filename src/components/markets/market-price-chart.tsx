'use client'

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import type { MarketChartPoint } from '@/lib/types'
import { formatDateLabel, formatPrice } from '@/lib/utils'

type MarketPriceChartProps = {
  data: MarketChartPoint[]
  marketId: string
}

export function MarketPriceChart({ data, marketId }: MarketPriceChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`market-${marketId}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#fbd24d" stopOpacity={0.7} />
            <stop offset="95%" stopColor="#fbd24d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="timestamp"
          tickFormatter={(value) => formatDateLabel(String(value))}
          stroke="#312818"
        />
        <YAxis domain={[0, 1]} hide />
        <Tooltip
          contentStyle={{
            background: '#141007',
            borderRadius: 16,
            border: '1px solid #302613',
            color: '#f5f1e6',
          }}
          formatter={(value: number) => formatPrice(Number(value))}
          labelFormatter={(value) => formatDateLabel(String(value))}
        />
        <Area
          type="monotone"
          dataKey="yesPrice"
          stroke="#fbd24d"
          fill={`url(#market-${marketId})`}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
