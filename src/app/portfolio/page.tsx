import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PnlChart } from '@/components/portfolio/pnl-chart'
import { balances, markets, positions } from '@/lib/data'
import { cn, formatPrice, formatUsd } from '@/lib/utils'

const pnlHistory = [
  { day: 'Mon', value: 120 },
  { day: 'Tue', value: 135 },
  { day: 'Wed', value: 142 },
  { day: 'Thu', value: 138 },
  { day: 'Fri', value: 147 },
  { day: 'Sat', value: 152 },
  { day: 'Sun', value: 155 },
]

export default function PortfolioPage() {
  const totalPnl = positions.reduce((sum, position) => sum + position.pnl, 0)
  const exposure = positions.reduce(
    (sum, position) => sum + position.entryPrice * position.quantity,
    0
  )
  const performance = exposure ? ((totalPnl / exposure) * 100).toFixed(2) : '0.00'

  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-10 px-6 pb-20">
      <header className="space-y-3">
        <Badge className="uppercase tracking-[0.3em]">Portfolio</Badge>
        <h1 className="text-3xl font-semibold text-white">Your trading cockpit</h1>
        <p className="max-w-2xl text-base text-[#d7ccff]">
          Track open positions, monitor PnL, and see where your BNB is working. Connect
          Phantom to sync live wallet balances and trades.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <PortfolioStat
          label="Net PnL"
          value={positions.length ? formatUsd(totalPnl) : '—'}
          accent="positive"
        />
        <PortfolioStat
          label="BNB Exposure"
          value={positions.length ? formatUsd(exposure) : '—'}
          accent="neutral"
        />
        <PortfolioStat
          label="Active Positions"
          value={positions.length ? `${positions.length}` : '0'}
          accent="neutral"
        />
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-white">7-day PnL curve</CardTitle>
            <CardDescription className="text-[#cbbdff]">
              Once connected, we chart your realized and unrealized performance.
            </CardDescription>
          </div>
          {positions.length > 0 ? (
            <div className="rounded-full bg-[rgba(136,106,240,0.25)] px-4 py-2 text-sm text-white">
              +{performance}% weekly performance
            </div>
          ) : (
            <div className="rounded-full bg-[rgba(136,106,240,0.2)] px-4 py-2 text-sm text-[#d7ccff]">
              Connect Phantom to populate stats
            </div>
          )}
        </CardHeader>
        <CardContent className="h-64">
          <PnlChart data={pnlHistory} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Open positions</CardTitle>
            <CardDescription className="text-[#cbbdff]">
              Current trades with mark price vs. entry. Orders update once your wallet is
              connected.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Market</TableHead>
                  <TableHead>Side</TableHead>
                  <TableHead>Entry</TableHead>
                  <TableHead>Mark</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">PnL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {positions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-[#d7ccff]">
                      No positions yet. Connect your wallet and place your first trade.
                    </TableCell>
                  </TableRow>
                ) : (
                  positions.map((position) => {
                    const market = markets.find((item) => item.id === position.marketId)
                    return (
                      <TableRow key={position.id}>
                        <TableCell>
                          <div className="font-medium text-white">
                            {position.marketQuestion}
                          </div>
                          <div className="text-xs text-[#cbbdff]">
                            {market?.category ?? ''}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={position.side === 'YES' ? 'positive' : 'negative'}
                          >
                            {position.side}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatPrice(position.entryPrice)}</TableCell>
                        <TableCell>{formatPrice(position.currentPrice)}</TableCell>
                        <TableCell className="text-right text-[#d7ccff]">
                          {position.quantity.toLocaleString()}
                        </TableCell>
                        <TableCell
                          className={`text-right ${position.pnl >= 0 ? 'text-[#8fd8ff]' : 'text-[#ff92b2]'}`}
                        >
                          {`${position.pnl >= 0 ? '+' : '-'}${formatUsd(Math.abs(position.pnl))}`}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wide text-[#cbbdff]">
              Wallet balances
            </CardTitle>
            <CardDescription className="text-[#cbbdff]">
              Live balances appear after you connect Phantom in the header.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-[#d7ccff]">
            {balances.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[rgba(127,91,255,0.35)] bg-[rgba(21,14,52,0.65)] px-4 py-3 text-[#cbbdff]">
                Wallet balances will appear once a connected Phantom address is detected.
              </div>
            ) : (
              balances.map((balance) => (
                <div
                  key={balance.symbol}
                  className="flex items-center justify-between rounded-2xl border border-[rgba(127,91,255,0.32)] bg-[rgba(24,16,62,0.78)] px-4 py-3"
                >
                  <div>
                    <div className="text-xs uppercase tracking-wide text-[#cbbdff]">
                      {balance.token}
                    </div>
                    <div className="text-lg font-semibold text-white">
                      {balance.amount.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <div
                    className={
                      balance.change24h >= 0 ? 'text-[#8fd8ff]' : 'text-[#ff92b2]'
                    }
                  >
                    {balance.change24h >= 0 ? '+' : ''}
                    {balance.change24h}%
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

type PortfolioStatProps = {
  label: string
  value: string
  accent: 'positive' | 'neutral'
}

function PortfolioStat({ label, value, accent }: PortfolioStatProps) {
  return (
    <Card
      className={cn(
        accent === 'positive' && 'shadow-[0_20px_54px_rgba(143,216,255,0.2)]'
      )}
    >
      <CardContent className="space-y-1 p-6">
        <div className="text-xs uppercase tracking-wide text-[#cbbdff]">{label}</div>
        <div className="text-2xl font-semibold text-white">{value}</div>
      </CardContent>
    </Card>
  )
}
