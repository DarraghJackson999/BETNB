import Link from 'next/link'

const toc = [
  { label: 'Welcome', href: '#welcome' },
  { label: 'Platform Overview', href: '#platform-overview' },
  { label: 'Market Lifecycle', href: '#market-lifecycle' },
  { label: 'Trading & Settlement', href: '#trading-settlement' },
  { label: 'Liquidity & Fees', href: '#liquidity-fees' },
  { label: 'Wallet & Security', href: '#wallet-security' },
  { label: 'Integrations & Partnerships', href: '#integrations-partnerships' },
  { label: 'Appendix', href: '#appendix' },
  { label: 'Coin Address', href: '#coin-address' },
]

export default function DocsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-20">
      <header className="space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#fbd24d]">Documentation</p>
        <h1 className="text-4xl font-semibold text-[#f5f1e6]">
          BETNB Operations Handbook
        </h1>
        <div className="grid gap-3 rounded-3xl border border-[#2d2616] bg-[#131008] p-6 sm:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-wide text-[#6f6550]">Release</div>
            <div className="text-lg font-medium text-[#f5f1e6]">
              v0.9.0 · October 2025
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-[#6f6550]">Audience</div>
            <div className="text-sm text-[#d9cfba]">
              Internal operators, liquidity partners, market makers, compliance, and
              integration teams.
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6">
          <div className="text-xs uppercase tracking-wide text-[#6f6550]">
            Table of contents
          </div>
          <nav className="mt-4 grid gap-2 sm:grid-cols-2">
            {toc.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-2xl border border-transparent px-4 py-2 text-sm text-[#d9cfba] transition hover:border-[#fbd24d]/60 hover:text-[#fbd24d]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#fbd24d]/70" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="mt-12 space-y-16">
        <section id="welcome" className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#f5f1e6]">Welcome</h2>
          <p className="text-[#d9cfba]">
            Welcome to the official BETNB documentation set. This guide explains how the
            prediction exchange operates, the data flows that power pricing, and the
            controls that keep user funds and positions secure.
          </p>
          <p className="text-[#d9cfba]">
            Each chapter is written for product, risk, and integration teams to shorten
            onboarding time. Use the table of contents to jump to the section that matches
            your workflow.
          </p>
          <div className="grid gap-4 rounded-3xl border border-[#2d2616] bg-[#141007] p-6 sm:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-wide text-[#6f6550]">
                Quick reference
              </div>
              <ul className="mt-3 space-y-2 text-sm text-[#d9cfba]">
                <li>
                  Trading hours: 24/7, settles when the referenced oracle posts a final
                  value.
                </li>
                <li>
                  Collateral: BNB and BUSD test collateral with deterministic pricing
                  curves.
                </li>
                <li>
                  Oracle latency: Median 46 seconds for sports; 18 seconds for crypto
                  feeds.
                </li>
                <li>Support: docs@betnb.exchange (routes to the triage channel).</li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-[#6f6550]">
                Onboarding path
              </div>
              <ol className="mt-3 space-y-2 text-sm text-[#d9cfba]">
                <li>Start with the platform overview to learn core modules.</li>
                <li>Review the market lifecycle before listing or monitoring markets.</li>
                <li>Study trading and settlement for order flow expectations.</li>
                <li>Model incentives via the liquidity and fees section.</li>
                <li>Digest wallet and security requirements before integrations.</li>
                <li>
                  Grab partner tooling in the integrations and partnerships section.
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section id="platform-overview" className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#f5f1e6]">Platform Overview</h2>
          <p className="text-[#d9cfba]">
            BETNB is a venue for binary outcome prediction markets optimised for the BNB
            Chain. The platform combines an automated market maker core with curated event
            onboarding to deliver tight spreads and rapid listings.
          </p>
          <div className="overflow-hidden rounded-3xl border border-[#2d2616]">
            <table className="min-w-full divide-y divide-[#2d2616]">
              <thead className="bg-[#141007]">
                <tr className="text-left text-xs uppercase tracking-wide text-[#6f6550]">
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d2616] bg-[#0c0a06] text-sm text-[#d9cfba]">
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">Match Engine</td>
                  <td className="px-4 py-3">
                    Processes limit and market orders before routing to AMM depth.
                  </td>
                  <td className="px-4 py-3">Trading Systems</td>
                  <td className="px-4 py-3">50 ms p95</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">
                    Liquidity Vault
                  </td>
                  <td className="px-4 py-3">
                    Two-sided liquidity via sigmoid bonding curves across core baskets.
                  </td>
                  <td className="px-4 py-3">Liquidity Ops</td>
                  <td className="px-4 py-3">99.95% availability</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">Oracle Router</td>
                  <td className="px-4 py-3">
                    Aggregates Chainlink, Pyth, and first-party feeds with failover.
                  </td>
                  <td className="px-4 py-3">Data Integrity</td>
                  <td className="px-4 py-3">2 min failover</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">Risk Guardian</td>
                  <td className="px-4 py-3">
                    Validates price impact, margin, and suspicious activity in real time.
                  </td>
                  <td className="px-4 py-3">Risk &amp; Controls</td>
                  <td className="px-4 py-3">Real-time</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">Wallet Gateway</td>
                  <td className="px-4 py-3">
                    Manages wallet sessions and signed transaction relays.
                  </td>
                  <td className="px-4 py-3">Wallet Core</td>
                  <td className="px-4 py-3">200 ms p95</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[#2d2616]">
            <table className="min-w-full divide-y divide-[#2d2616]">
              <thead className="bg-[#141007]">
                <tr className="text-left text-xs uppercase tracking-wide text-[#6f6550]">
                  <th className="px-4 py-3">Environment</th>
                  <th className="px-4 py-3">RPC Endpoint</th>
                  <th className="px-4 py-3">Explorer</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d2616] bg-[#0c0a06] text-sm text-[#d9cfba]">
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">Production</td>
                  <td className="px-4 py-3">https://rpc.betnb.exchange</td>
                  <td className="px-4 py-3">https://scan.betnb.exchange</td>
                  <td className="px-4 py-3">Three geo-distributed validator nodes.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">Staging</td>
                  <td className="px-4 py-3">https://rpc.staging.betnb.exchange</td>
                  <td className="px-4 py-3">https://scan.staging.betnb.exchange</td>
                  <td className="px-4 py-3">
                    Reset weekly with synthetic regression data.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">Sandbox</td>
                  <td className="px-4 py-3">https://sandbox-rpc.betnb.exchange</td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3">Deterministic block timings for QA.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid gap-4 rounded-3xl border border-[#2d2616] bg-[#141007] p-6 sm:grid-cols-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-[#6f6550]">
                Governance model
              </div>
              <ul className="mt-3 space-y-2 text-sm text-[#d9cfba]">
                <li>Listing Committee: reviews new markets daily, 3-of-5 multi-sig.</li>
                <li>Risk Council: pauses trading and adjusts fees during volatility.</li>
                <li>Treasury Stewards: manage incentives, buybacks, and affiliates.</li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-[#6f6550]">
                Operational cadence
              </div>
              <ul className="mt-3 space-y-2 text-sm text-[#d9cfba]">
                <li>Daily: launch stand-up, oracle health check, liquidity snapshot.</li>
                <li>Weekly: incident review, fee reconciliation, partner sentiment.</li>
                <li>Monthly: treasury report, roadmap checkpoint, compliance audit.</li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-[#6f6550]">
                Control surfaces
              </div>
              <ul className="mt-3 space-y-2 text-sm text-[#d9cfba]">
                <li>Admin Console for circuit breakers, fees, and overrides.</li>
                <li>CLI Toolkit for historical imports and liquidity seeding.</li>
                <li>Observability Suite for dashboards, logs, and escalation.</li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-[#fbd24d]/40 bg-[#1a150c] p-6 text-sm text-[#d9cfba]">
            <span className="font-semibold text-[#fbd24d]">Tip:</span> Ensure on-call
            engineers retain access to both the admin console and CLI toolkit. Outage
            runbooks require circuit breaker toggles and manual oracle inputs within five
            minutes.
          </div>
        </section>

        <section id="market-lifecycle" className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#f5f1e6]">Market Lifecycle</h2>
          <p className="text-[#d9cfba]">
            Markets progress through seven states. Keeping each gate disciplined ensures
            clean launches, accurate resolution, and orderly settlements.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">1. Intake</h3>
              <p className="text-sm text-[#d9cfba]">
                Proposal submitted via admin console or API.
              </p>
              <ul className="space-y-2 text-sm text-[#d9cfba]">
                <li>Event summary under 140 characters.</li>
                <li>Resolution criteria and oracle source hierarchy.</li>
                <li>Trading halt time plus settlement buffer.</li>
                <li>Liquidity seed of at least 5,000 USDC (or equivalent).</li>
              </ul>
              <p className="text-sm text-[#d9cfba]">
                Outputs: market ID reserved, slug generated, Jira diligence ticket opened.
              </p>
            </div>
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">2. Vetting</h3>
              <ul className="space-y-2 text-sm text-[#d9cfba]">
                <li>KYC and compliance checks for proposers.</li>
                <li>Oracle coverage validation (Chainlink primary, Pyth backup).</li>
                <li>Legal sign-off for restricted jurisdictions.</li>
                <li>Risk Council sets exposure caps and leverage limits.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">3. Activation</h3>
              <ul className="space-y-2 text-sm text-[#d9cfba]">
                <li>Liquidity Vault deploys two-sided inventory.</li>
                <li>Risk Guardian publishes price bounds and max order sizes.</li>
                <li>
                  Match Engine flips to{' '}
                  <span className="font-mono text-[#f5f1e6]">OPEN</span>.
                </li>
                <li>Marketing automation posts launch to live feed.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">4. Live Trading</h3>
              <ul className="space-y-2 text-sm text-[#d9cfba]">
                <li>Continuous double auction backed by AMM depth.</li>
                <li>Maker/taker fees applied per liquidity framework.</li>
                <li>Oracle Router publishes indicative prices every 12 seconds.</li>
                <li>Breakers: ±35% five-minute move or oracle lag beyond 90 seconds.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">5. Halt</h3>
              <ul className="space-y-2 text-sm text-[#d9cfba]">
                <li>Triggered by schedule, manual action, or automatic breaker.</li>
                <li>Liquidity Vault stops quoting new ranges but honors closes.</li>
                <li>Oracle Router stores the last trusted snapshot.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">6. Resolution</h3>
              <ol className="space-y-2 text-sm text-[#d9cfba]">
                <li>Oracle Router fetches the official outcome from the primary feed.</li>
                <li>Risk Guardian cross-checks secondary feeds and manual sources.</li>
                <li>Integrity team gains a 30-minute dispute window.</li>
                <li>
                  Status flips to{' '}
                  <span className="font-mono text-[#f5f1e6]">RESOLVED</span> once
                  verified.
                </li>
              </ol>
            </div>
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">7. Settlement</h3>
              <ul className="space-y-2 text-sm text-[#d9cfba]">
                <li>Smart contracts pay winners and return unused collateral.</li>
                <li>Maker rebates and affiliate payouts execute automatically.</li>
                <li>
                  Treasury books fee revenue; Liquidity Ops logs metrics for insights.
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 text-sm text-[#d9cfba]">
            <div className="font-semibold text-[#f5f1e6]">State diagram</div>
            <pre className="mt-3 overflow-x-auto rounded-2xl bg-[#0c0905] p-4 font-mono text-xs text-[#fbd24d]">
              {`INTAKE -> VETTING -> ACTIVATION -> LIVE -> HALT -> RESOLUTION -> SETTLEMENT -> ARCHIVED
          ^                                         |
          |-----------------------------------------|`}
            </pre>
            <div className="mt-4 rounded-2xl border border-[#fbd24d]/40 bg-[#1a150c] p-4">
              <span className="font-semibold text-[#fbd24d]">Reminder:</span> Never
              short-circuit the dispute window. Integrity sign-off keeps oracle SLAs
              intact and protects counterparties.
            </div>
          </div>
        </section>

        <section id="trading-settlement" className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#f5f1e6]">
            Trading &amp; Settlement
          </h2>
          <p className="text-[#d9cfba]">
            Understand order flow, margin rules, and settlement mechanics before
            connecting clients or deploying liquidity.
          </p>
          <div className="overflow-hidden rounded-3xl border border-[#2d2616]">
            <table className="min-w-full divide-y divide-[#2d2616]">
              <thead className="bg-[#141007]">
                <tr className="text-left text-xs uppercase tracking-wide text-[#6f6550]">
                  <th className="px-4 py-3">Order type</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Typical use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d2616] bg-[#0c0a06] text-sm text-[#d9cfba]">
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">
                    Instant (AMM) Fill
                  </td>
                  <td className="px-4 py-3">
                    Routes directly to pool liquidity at the current implied probability.
                  </td>
                  <td className="px-4 py-3">
                    Retail traders pursuing immediate exposure.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">Limit Order</td>
                  <td className="px-4 py-3">
                    Adds a quote to the order book and fills once crossed.
                  </td>
                  <td className="px-4 py-3">Market makers and advanced traders.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">Stop Trigger</td>
                  <td className="px-4 py-3">
                    Converts to market order when the implied probability breaches a
                    threshold.
                  </td>
                  <td className="px-4 py-3">Risk management hedges.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">Range Order</td>
                  <td className="px-4 py-3">
                    Deploys passive liquidity along a price band via the bonding curve.
                  </td>
                  <td className="px-4 py-3">
                    LPs capturing fees with defined inventory.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">
                Margin &amp; exposure
              </h3>
              <ul className="space-y-2 text-sm text-[#d9cfba]">
                <li>All positions fully collateralised in USDC or BNB.</li>
                <li>
                  Max leverage 3x notional for whitelisted partners (collateral in
                  escrow).
                </li>
                <li>Risk Guardian enforces market-level exposure caps.</li>
                <li>Unrealised PnL streams to the wallet gateway each block.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">Fee model</h3>
              <ul className="space-y-2 text-sm text-[#d9cfba]">
                <li>Taker fee 35 bps (20 bps for BETNB governance stakers).</li>
                <li>Maker rebate 10 bps credited to LP vault on fills.</li>
                <li>Settlement fee 5 bps funds oracle operations.</li>
                <li>Fees split weekly between LPs, treasury, and affiliate pool.</li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#f5f1e6]">Matching pipeline</h3>
            <ol className="space-y-2 text-sm text-[#d9cfba]">
              <li>Clients submit orders via web app or API.</li>
              <li>Wallet Gateway signs payloads and forwards to the Match Engine.</li>
              <li>
                Risk Guardian validates price impact, collateral sufficiency, and AML
                heuristics.
              </li>
              <li>Validated orders match against the book or route to the AMM.</li>
              <li>Trade confirmations stream via WebSocket and settle on-chain.</li>
            </ol>
            <h3 className="text-lg font-semibold text-[#f5f1e6]">Settlement flow</h3>
            <ul className="space-y-2 text-sm text-[#d9cfba]">
              <li>Resolution triggers automatic payout instructions.</li>
              <li>Smart contracts pay winners and return excess collateral.</li>
              <li>Positions mark complete and archive to the insights warehouse.</li>
              <li>Disputes escalate to Operations through admin override tooling.</li>
            </ul>
            <h3 className="text-lg font-semibold text-[#f5f1e6]">Failure handling</h3>
            <ul className="space-y-2 text-sm text-[#d9cfba]">
              <li>
                On-chain failures retry with exponential backoff before paging on-call.
              </li>
              <li>
                Oracle discrepancies pause settlement and extend the dispute window.
              </li>
              <li>Stuck orders auto-cancel after 72 hours unless tagged strategic.</li>
            </ul>
            <div className="rounded-2xl border border-[#fbd24d]/40 bg-[#1a150c] p-4 text-sm text-[#d9cfba]">
              <span className="font-semibold text-[#fbd24d]">Best practice:</span> Prompt
              traders to refresh wallet balances post-settlement. The Wallet Gateway emits
              events, but clients should resync to avoid stale UIs.
            </div>
          </div>
        </section>

        <section id="liquidity-fees" className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#f5f1e6]">Liquidity &amp; Fees</h2>
          <p className="text-[#d9cfba]">
            Liquidity providers rely on concentric bonding curves and incentive programs
            to keep spreads tight while earning yield.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">Pool composition</h3>
              <ul className="space-y-2 text-sm text-[#d9cfba]">
                <li>Collateral: 70% USDC, 30% BNB stables (auto-rebalanced daily).</li>
                <li>Bonding curve: sigmoid function with volatility-driven slopes.</li>
                <li>
                  Inventory buckets: protocol-owned, community vault, partner managed.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">Incentives</h3>
              <table className="w-full text-sm text-[#d9cfba]">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-[#6f6550]">
                    <th className="pb-2">Program</th>
                    <th className="pb-2">Reward</th>
                    <th className="pb-2">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2d2616]">
                  <tr>
                    <td className="py-2 font-medium text-[#f5f1e6]">Vault Yield</td>
                    <td className="py-2">BETNB (continuous)</td>
                    <td className="py-2">Pro-rata on time-weighted liquidity.</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#f5f1e6]">Depth Boosters</td>
                    <td className="py-2">USDC (weekly)</td>
                    <td className="py-2">Targets thin markets.</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-[#f5f1e6]">Affiliate Split</td>
                    <td className="py-2">BETNB &amp; USDC (monthly)</td>
                    <td className="py-2">Returns taker fees from partner flow.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#f5f1e6]">Fee distribution</h3>
            <ol className="space-y-2 text-sm text-[#d9cfba]">
              <li>Taker fees route to the treasury smart contract.</li>
              <li>
                Contract streams 60% to LPs, 30% to treasury reserves, 10% to affiliates.
              </li>
              <li>Settlement fees cover oracle and dispute costs.</li>
            </ol>
            <h3 className="text-lg font-semibold text-[#f5f1e6]">Risk controls</h3>
            <ul className="space-y-2 text-sm text-[#d9cfba]">
              <li>Dynamic fee escalator widens spreads when volatility exceeds 3σ.</li>
              <li>Exposure caps guard against concentrated inventory.</li>
              <li>Vault rebalances when delta deviates 15% from neutral.</li>
            </ul>
            <h3 className="text-lg font-semibold text-[#f5f1e6]">Monitoring</h3>
            <ul className="space-y-2 text-sm text-[#d9cfba]">
              <li>Utilisation ratio: filled volume vs available liquidity.</li>
              <li>Fee APR: annualised LP yield (surfaced in portfolio dashboards).</li>
              <li>Inventory imbalance: YES/NO skew tracking.</li>
            </ul>
            <h3 className="text-lg font-semibold text-[#f5f1e6]">Off-boarding</h3>
            <ul className="space-y-2 text-sm text-[#d9cfba]">
              <li>Withdrawal queue with 24-hour cooldown.</li>
              <li>Emergency withdrawals unlock when health score &lt; 0.7.</li>
              <li>Vault posts state snapshots to IPFS for transparency.</li>
            </ul>
            <div className="rounded-2xl border border-[#fbd24d]/40 bg-[#1a150c] p-4 text-sm text-[#d9cfba]">
              <span className="font-semibold text-[#fbd24d]">Note:</span> Announce
              significant liquidity moves in the live feed so traders can adjust
              positioning alongside spread changes.
            </div>
          </div>
        </section>

        <section id="wallet-security" className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#f5f1e6]">Wallet &amp; Security</h2>
          <p className="text-[#d9cfba]">
            Wallet support, security posture, and incident response plans keep user funds
            protected across the exchange.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">Supported wallets</h3>
              <ul className="space-y-2 text-sm text-[#d9cfba]">
                <li>Phantom (BNB Chain edition) for most retail traders.</li>
                <li>WalletConnect v2 supporting Ledger, Rainbow, OKX, and more.</li>
                <li>Custodial API keys for managed institutional sub-accounts.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">Session flow</h3>
              <ol className="space-y-2 text-sm text-[#d9cfba]">
                <li>User initiates connect from the BETNB web app.</li>
                <li>Wallet Gateway generates a nonce and requests a signature.</li>
                <li>Signed message establishes the session via secure cookie.</li>
                <li>Session auto-renews every 15 minutes of activity.</li>
              </ol>
            </div>
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">Security layers</h3>
              <ul className="space-y-2 text-sm text-[#d9cfba]">
                <li>MPC signing prevents single-key exposure for treasury wallets.</li>
                <li>Rate limiting caps authentication attempts (10/minute per IP).</li>
                <li>Device fingerprinting adds friction for suspicious logins.</li>
                <li>Geo restrictions enforce enhanced due diligence where required.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#f5f1e6]">Incident response</h3>
              <ul className="space-y-2 text-sm text-[#d9cfba]">
                <li>Pause withdrawals using the admin circuit breaker.</li>
                <li>Revoke compromised API keys through Wallet Gateway tooling.</li>
                <li>Notify impacted users via in-app banners and email.</li>
                <li>Run RCA, publish transparency report, and update threat models.</li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
            <h3 className="text-lg font-semibold text-[#f5f1e6]">Compliance</h3>
            <ul className="space-y-2 text-sm text-[#d9cfba]">
              <li>SOC 2 Type II certification in progress; quarterly external audits.</li>
              <li>KYC provider: Sumsub with liveness and document checks.</li>
              <li>PEP and sanctions screening runs nightly.</li>
            </ul>
            <div className="rounded-2xl border border-[#fbd24d]/40 bg-[#1a150c] p-4 text-sm text-[#d9cfba]">
              <span className="font-semibold text-[#fbd24d]">Reminder:</span> Encourage
              high-value traders to connect via hardware wallets. WalletConnect v2 works
              seamlessly with Ledger devices.
            </div>
          </div>
        </section>

        <section id="integrations-partnerships" className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#f5f1e6]">
            Integrations &amp; Partnerships
          </h2>
          <p className="text-[#d9cfba]">
            BETNB extends beyond the core app through APIs, widgets, and data partnerships
            designed for business development.
          </p>
          <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
            <h3 className="text-lg font-semibold text-[#f5f1e6]">API surface</h3>
            <ul className="space-y-2 text-sm text-[#d9cfba]">
              <li>REST Trading API for orders, positions, and market metadata.</li>
              <li>WebSocket feed for live trades, book updates, and settlements.</li>
              <li>Insights API for aggregated analytics and downstream dashboards.</li>
              <li>
                Admin API (restricted) covering listings, breakers, and treasury actions.
              </li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[#2d2616]">
            <table className="min-w-full divide-y divide-[#2d2616]">
              <thead className="bg-[#141007]">
                <tr className="text-left text-xs uppercase tracking-wide text-[#6f6550]">
                  <th className="px-4 py-3">Program</th>
                  <th className="px-4 py-3">Target</th>
                  <th className="px-4 py-3">Benefits</th>
                  <th className="px-4 py-3">Requirements</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d2616] bg-[#0c0a06] text-sm text-[#d9cfba]">
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">
                    Affiliate Network
                  </td>
                  <td className="px-4 py-3">Communities and content creators</td>
                  <td className="px-4 py-3">Revenue share on taker fees</td>
                  <td className="px-4 py-3">KYC plus minimum activity thresholds</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">
                    Liquidity Specialist
                  </td>
                  <td className="px-4 py-3">Market makers and funds</td>
                  <td className="px-4 py-3">Reduced fees and vault incentives</td>
                  <td className="px-4 py-3">Baseline liquidity with weekly reporting</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">
                    Data Distributor
                  </td>
                  <td className="px-4 py-3">Quant firms and media outlets</td>
                  <td className="px-4 py-3">High-throughput feeds with SLAs</td>
                  <td className="px-4 py-3">Signed data sharing agreement</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3">
            <h3 className="text-lg font-semibold text-[#f5f1e6]">
              Integration checklist
            </h3>
            <ol className="space-y-2 text-sm text-[#d9cfba]">
              <li>Request API credentials via the partner desk.</li>
              <li>Complete KYC and compliance onboarding.</li>
              <li>Review rate limits and error handling playbooks.</li>
              <li>Build against the sandbox and run automated regression pack.</li>
              <li>Schedule go-live certification with operations.</li>
            </ol>
            <h3 className="text-lg font-semibold text-[#f5f1e6]">
              Reporting &amp; analytics
            </h3>
            <ul className="space-y-2 text-sm text-[#d9cfba]">
              <li>Daily partner emails summarise volume, fee share, and referrals.</li>
              <li>Realtime metrics via `/partner/metrics` endpoints.</li>
              <li>Quarterly incentive reviews with Strategic Partnerships.</li>
            </ul>
            <h3 className="text-lg font-semibold text-[#f5f1e6]">Offboarding</h3>
            <ul className="space-y-2 text-sm text-[#d9cfba]">
              <li>Submit exit requests with seven-day notice.</li>
              <li>Tokens revoked and data feeds sunset.</li>
              <li>Treasury reconciles incentives; marketing clears listings.</li>
            </ul>
            <div className="rounded-2xl border border-[#fbd24d]/40 bg-[#1a150c] p-4 text-sm text-[#d9cfba]">
              <span className="font-semibold text-[#fbd24d]">Tip:</span> Embed the BETNB
              market widget for affiliates. It delivers live pricing and deep links to
              boost conversion while staying transparent.
            </div>
          </div>
        </section>

        <section id="appendix" className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#f5f1e6]">Appendix</h2>
          <p className="text-[#d9cfba]">
            Reference data, contacts, and revision history supporting operational
            readiness.
          </p>
          <div className="overflow-hidden rounded-3xl border border-[#2d2616]">
            <table className="min-w-full divide-y divide-[#2d2616]">
              <thead className="bg-[#141007]">
                <tr className="text-left text-xs uppercase tracking-wide text-[#6f6550]">
                  <th className="px-4 py-3">Function</th>
                  <th className="px-4 py-3">SLA</th>
                  <th className="px-4 py-3">Escalation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d2616] bg-[#0c0a06] text-sm text-[#d9cfba]">
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">Trading Core</td>
                  <td className="px-4 py-3">99.95% uptime</td>
                  <td className="px-4 py-3">PagerDuty TRD-ONCALL</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">Oracle Router</td>
                  <td className="px-4 py-3">99.9% uptime</td>
                  <td className="px-4 py-3">PagerDuty DATA-ONCALL</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#f5f1e6]">Wallet Gateway</td>
                  <td className="px-4 py-3">99.9% uptime</td>
                  <td className="px-4 py-3">PagerDuty WALLET-ONCALL</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3 text-sm text-[#d9cfba]">
            <div className="text-xs uppercase tracking-wide text-[#6f6550]">
              Contact directory
            </div>
            <ul className="space-y-2">
              <li>Operations Bridge: ops@betnb.exchange</li>
              <li>Security Hotline: security@betnb.exchange</li>
              <li>Partnerships Desk: partners@betnb.exchange</li>
              <li>Incident Bridge: https://status.betnb.exchange</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3 text-sm text-[#d9cfba]">
            <div className="text-xs uppercase tracking-wide text-[#6f6550]">
              Document revisions
            </div>
            <table className="w-full text-sm text-[#d9cfba]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-[#6f6550]">
                  <th className="pb-2">Version</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Author</th>
                  <th className="pb-2">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d2616]">
                <tr>
                  <td className="py-2 font-medium text-[#f5f1e6]">0.2.0</td>
                  <td className="py-2">2024-04-05</td>
                  <td className="py-2">Ops Docs</td>
                  <td className="py-2">
                    Added trading, settlement, and integrations details.
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-[#f5f1e6]">0.1.0</td>
                  <td className="py-2">2024-03-12</td>
                  <td className="py-2">Founders</td>
                  <td className="py-2">Initial GitBook-ready draft.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-3xl border border-[#2d2616] bg-[#141007] p-6 space-y-3 text-sm text-[#d9cfba]">
            <div className="text-xs uppercase tracking-wide text-[#6f6550]">Glossary</div>
            <ul className="space-y-2">
              <li>AMM — Automated Market Maker powering instant trades.</li>
              <li>Circuit Breaker — Halt triggered by volatility or oracle issues.</li>
              <li>Dispute Window — Time buffer before settlement finalises.</li>
              <li>LP — Liquidity Provider supplying capital to the pool.</li>
            </ul>
            <div className="rounded-2xl border border-[#fbd24d]/40 bg-[#1a150c] p-4">
              <span className="font-semibold text-[#fbd24d]">Reminder:</span> Update the
              revision table whenever process or policy changes ship. A clean audit trail
              is a regulatory requirement.
            </div>
          </div>
        </section>

        <section id="coin-address" className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#f5f1e6]">Coin Address</h2>
          <p className="text-[#d9cfba]">
            The official BETNB contract address will be published here once finalised.
            Replace this placeholder with the confirmed address when available.
          </p>
          <div className="rounded-3xl border border-dashed border-[#fbd24d]/50 bg-[#141007] p-6 text-sm text-[#d9cfba]">
            <span className="font-semibold text-[#fbd24d]">Pending:</span> awaiting the
            production wallet confirmation from treasury before broadcasting the contract
            location.
          </div>
        </section>
      </div>
    </div>
  )
}
