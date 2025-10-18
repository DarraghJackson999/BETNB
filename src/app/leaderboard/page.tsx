import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const traders = [
  { handle: 'blockbaron', pnl: 48200, roi: 68.2, streak: 9 },
  { handle: 'deltaqueen', pnl: 38840, roi: 52.4, streak: 7 },
  { handle: 'quantdrip', pnl: 35210, roi: 47.9, streak: 4 },
  { handle: 'macroalpha', pnl: 31005, roi: 41.3, streak: 6 },
  { handle: 'defifalcon', pnl: 29110, roi: 39.6, streak: 5 },
]

export default function LeaderboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 px-6 pb-20">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-[#f5f1e6]">Top performers</h1>
        <p className="max-w-2xl text-base text-[#bfb59f]">
          Weekly leaderboard of the sharpest BETNB traders ranked by realized PnL and ROI.
          Connect your wallet to appear here on the next refresh.
        </p>
      </header>

      <Card className="border-[#2f2716]/80 bg-[#141007]/95">
        <CardHeader>
          <CardTitle className="text-[#f5f1e6]">Week-to-date champions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-[#d9cfba]">
          {traders.map((trader, index) => (
            <div
              key={trader.handle}
              className="flex items-center justify-between rounded-2xl border border-[#2d2617] bg-[#18120b] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1f1a12] text-sm font-semibold text-[#fbd24d]">
                  #{index + 1}
                </span>
                <div>
                  <div className="text-base font-semibold text-[#f5f1e6]">
                    @{trader.handle}
                  </div>
                  <div className="text-xs text-[#6f6550]">
                    {trader.streak}-trade hot streak
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#8be280]">
                  +${trader.pnl.toLocaleString()}
                </div>
                <div className="text-xs text-[#6f6550]">ROI {trader.roi}%</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
