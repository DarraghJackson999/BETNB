'use client'

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type PnlChartProps = {
  data: { day: string; value: number }[]
}

export function PnlChart({ data }: PnlChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="pnlGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#8be280" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8be280" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" stroke="#312818" />
        <YAxis
          stroke="#312818"
          tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(1)}k`}
        />
        <Tooltip
          contentStyle={{
            background: '#141007',
            borderRadius: 16,
            border: '1px solid #302613',
            color: '#f5f1e6',
          }}
          formatter={(value: number) => `$${value.toLocaleString()}`}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#8be280"
          fill="url(#pnlGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
