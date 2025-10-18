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
    <div className="rounded-3xl border border-[#2f2716] bg-[#12100a]/95 p-4">
      <Table>
        <TableHeader>
          <TableRow className="text-xs uppercase tracking-wide text-[#6f6550]">
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
                    className="font-medium text-[#f5f1e6] transition hover:text-[#fbd24d]"
                  >
                    {market.question}
                  </Link>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#6f6550]">
                    <Badge variant="outline">{market.category}</Badge>
                    <span>Liquidity ${(market.liquidity / 1000).toFixed(0)}k</span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-[#f5f1e6]">
                  {formatPrice(yes.price)}
                </TableCell>
                <TableCell className="text-[#d9cfba]">{formatPrice(no.price)}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium',
                      yes.change >= 0
                        ? 'bg-[#1e2b19] text-[#8be280]'
                        : 'bg-[#2d1316] text-[#f08080]'
                    )}
                  >
                    <TrendingUp size={12} />
                    {yes.change >= 0 ? '+' : ''}
                    {(yes.change * 100).toFixed(1)}%
                  </span>
                </TableCell>
                <TableCell className="text-center text-[#d9cfba]">
                  ${(market.liquidity / 1000).toFixed(0)}k
                </TableCell>
                <TableCell className="text-right text-[#d9cfba]">
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
