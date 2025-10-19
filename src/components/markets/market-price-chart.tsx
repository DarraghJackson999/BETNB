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
            <stop offset="4%" stopColor="#9f88ff" stopOpacity={0.85} />
            <stop offset="95%" stopColor="#120d2d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="timestamp"
          tickFormatter={(value) => formatDateLabel(String(value))}
          stroke="rgba(127,91,255,0.22)"
          tick={{ fill: '#cbbdff', fontSize: 12 }}
          axisLine={{ stroke: 'rgba(127,91,255,0.22)' }}
          tickLine={{ stroke: 'rgba(127,91,255,0.22)' }}
        />
        <YAxis domain={[0, 1]} hide />
        <Tooltip
          contentStyle={{
            background: 'rgba(12,8,32,0.95)',
            borderRadius: 16,
            border: '1px solid rgba(164,138,255,0.5)',
            color: '#f5f1ff',
            boxShadow: '0 18px 42px rgba(121,96,208,0.25)',
          }}
          itemStyle={{ color: '#f5f1ff' }}
          formatter={(value: number) => formatPrice(Number(value))}
          labelFormatter={(value) => formatDateLabel(String(value))}
          cursor={{ stroke: '#b8a3ff', strokeWidth: 2 }}
        />
        <Area
          type="monotone"
          dataKey="yesPrice"
          stroke="#d7c6ff"
          fill={`url(#market-${marketId})`}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
