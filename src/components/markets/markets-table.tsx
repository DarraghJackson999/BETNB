'use client'

import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Market } from '@/lib/types'
import { cn, formatPrice } from '@/lib/utils'

type MarketsTableProps = {
  markets: Market[]
}

export function MarketsTable({ markets }: MarketsTableProps) {
  return (
    <div className="rounded-3xl border border-[rgba(127,91,255,0.28)] bg-[rgba(10,7,27,0.92)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <Table>
        <TableHeader>
          <TableRow className="text-xs uppercase tracking-wide text-[#d7ccff]">
            <TableHead className="w-[42%]">Market</TableHead>
            <TableHead>Yes</TableHead>
            <TableHead>No</TableHead>
            <TableHead className="text-center">24h</TableHead>
            <TableHead className="text-center">Liquidity</TableHead>
            <TableHead className="text-right">Ends</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {markets.map((market) => {
            const yes = market.options[0]
            const no = market.options[1]
            return (
              <TableRow key={market.id}>
                <TableCell>
                  <Link
                    href={`/markets/${market.slug}`}
                    className="font-medium text-white transition hover:text-white/80"
                  >
                    {market.question}
                  </Link>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#a89dd4]">
                    <Badge variant="outline">{market.category}</Badge>
                    <span>Liquidity ${(market.liquidity / 1000).toFixed(0)}k</span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-white">
                  {formatPrice(yes.price)}
                </TableCell>
                <TableCell className="text-[#a3b5ff] opacity-80">
                  {formatPrice(no.price)}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium',
                      yes.change >= 0
                        ? 'bg-[rgba(127,91,255,0.24)] text-white'
                        : 'bg-[rgba(97,36,77,0.6)] text-[#ff9bb4]'
                    )}
                  >
                    <TrendingUp size={12} />
                    {yes.change >= 0 ? '+' : ''}
                    {(yes.change * 100).toFixed(1)}%
                  </span>
                </TableCell>
                <TableCell className="text-center text-[#a3b5ff] opacity-80">
                  ${(market.liquidity / 1000).toFixed(0)}k
                </TableCell>
                <TableCell className="text-right text-[#a3b5ff] opacity-80">
                  {market.resolveDate.slice(0, 10)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
