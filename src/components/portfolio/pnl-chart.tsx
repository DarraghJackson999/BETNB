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
            <stop offset="5%" stopColor="#8d6fff" stopOpacity={0.85} />
            <stop offset="95%" stopColor="#281650" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="day"
          stroke="rgba(207,195,255,0.45)"
          tick={{ fill: '#dcd2ff', fontSize: 12 }}
        />
        <YAxis
          stroke="rgba(207,195,255,0.45)"
          tick={{ fill: '#dcd2ff', fontSize: 12 }}
          tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(1)}k`}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(18,12,45,0.96)',
            borderRadius: 16,
            border: '1px solid rgba(127,91,255,0.4)',
            color: '#ffffff',
          }}
          formatter={(value: number) => `$${value.toLocaleString()}`}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#ab94ff"
          fill="url(#pnlGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
