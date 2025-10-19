import Link from 'next/link'

const toc = [
  { label: 'Welcome', href: '#welcome' },
  { label: 'Platform Overview', href: '#platform-overview' },
  { label: 'Market Lifecycle', href: '#market-lifecycle' },
  { label: 'Trading & Settlement', href: '#trading-settlement' },
  { label: 'Liquidity & Fees', href: '#liquidity-fees' },
  { label: 'Wallet & Security', href: '#wallet-security' },
  { label: 'Integrations & Partnerships', href: '#integrations-partnerships' },
  { label: 'Governance & Treasury', href: '#governance-treasury' },
  { label: 'Risk & Compliance', href: '#risk-compliance' },
  { label: 'Analytics & Reporting', href: '#analytics-reporting' },
  { label: 'Operations Playbooks', href: '#operations-playbooks' },
  { label: 'Business Continuity', href: '#business-continuity' },
  { label: 'Roadmap & Initiatives', href: '#roadmap' },
  { label: 'Appendix', href: '#appendix' },
]

export default function DocsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-20">
      <header className="space-y-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[#b9a8ef]">
          Documentation
        </p>
        <h1 className="text-4xl font-semibold text-white">
          UmbraMarkets Operations Handbook
        </h1>
        <div className="grid gap-4 rounded-3xl border border-[rgba(127,91,255,0.35)] bg-[rgba(12,8,32,0.9)] p-6 shadow-[0_24px_68px_rgba(74,52,148,0.32)] sm:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-wide text-[#a89dd4]">Release</div>
            <div className="text-lg font-medium text-white">v3.5 · October 2025</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-[#a89dd4]">Audience</div>
            <div className="text-sm text-[#d7c6ff]">
              Trading operations, liquidity partners, risk, compliance, treasury, and
              integration desks stewarding UmbraMarkets.
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(14,10,36,0.93)] p-6 shadow-[0_20px_58px_rgba(63,44,124,0.32)]">
          <div className="text-xs uppercase tracking-wide text-[#a89dd4]">
            Table of contents
          </div>
          <nav className="mt-4 grid gap-2 sm:grid-cols-2">
            {toc.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-2xl border border-transparent px-4 py-2 text-sm text-[#d7c6ff] transition hover:border-[rgba(127,91,255,0.5)] hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#8f79ff]" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="mt-12 space-y-16">
        <section id="welcome" className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Welcome</h2>
          <p className="text-[#d7c6ff]">
            UmbraMarkets operates a cross-venue prediction exchange optimised for
            institutional order flow. This handbook documents trading systems, liquidity
            mechanics, operational controls, compliance requirements, and partner pathways
            that support 24/7 binary outcome markets across macro, crypto, politics,
            sports, and entertainment.
          </p>
          <div className="grid gap-4 rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(13,9,34,0.95)] p-6 sm:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-wide text-[#a89dd4]">
                Quick reference
              </div>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Venue coverage: BNB Chain mainnet with redundant rollup mirrors and
                  settlement relays.
                </li>
                <li>
                  Market structure: hybrid limit order book with Umbra Vault AMM depth and
                  RFQ overlays.
                </li>
                <li>
                  Collateral: USDC, BNB stables, and whitelisted institutional baskets
                  with dollar-parity proof.
                </li>
                <li>
                  Command bridge: ops@umbramarkets.exchange and TRD-ONCALL pager (24/7
                  triage).
                </li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-[#a89dd4]">
                Operational cadence
              </div>
              <ol className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Daily: launch stand-up, liquidity calibration, oracle diagnostics,
                  compliance attest signatures.
                </li>
                <li>
                  Weekly: incident review, fee reconciliation, partner scorecard, treasury
                  hedging sync.
                </li>
                <li>
                  Monthly: treasury report, risk model refresh, compliance audit,
                  marketing calendar rollout.
                </li>
                <li>
                  Quarterly: governance vote on fee tiers, listing mandates, incentive
                  budgets, and capital deployment.
                </li>
              </ol>
            </div>
          </div>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.34)] bg-[rgba(16,11,40,0.9)] p-6 text-sm text-[#d7c6ff]">
            <span className="font-semibold text-white">Core mission:</span> deliver
            institutional-grade liquidity, resolution certainty, and compliance discipline
            while scaling the UmbraMarkets narrative of discreet, signal-rich prediction
            flows.
          </div>
        </section>

        <section id="platform-overview" className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Platform Overview</h2>
          <p className="text-[#d7c6ff]">
            The UmbraMarkets stack combines exchange infrastructure, oracle routing, risk
            controls, wallet orchestration, and analytics telemetry. Each subsystem
            publishes health metrics to the command center and is backed by detailed
            runbooks.
          </p>
          <div className="overflow-hidden rounded-3xl border border-[rgba(127,91,255,0.3)]">
            <table className="min-w-full divide-y divide-[rgba(127,91,255,0.22)]">
              <thead className="bg-[rgba(19,13,50,0.94)] text-xs uppercase tracking-wide text-[#a89dd4]">
                <tr>
                  <th className="px-4 py-3 text-left">Subsystem</th>
                  <th className="px-4 py-3 text-left">Function</th>
                  <th className="px-4 py-3 text-left">Owner</th>
                  <th className="px-4 py-3 text-left">SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(127,91,255,0.16)] bg-[rgba(11,7,30,0.92)] text-sm text-[#d7c6ff]">
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Match Engine</td>
                  <td className="px-4 py-3">
                    Prioritises price-time, routes RFQ, and publishes fills to the audit
                    buffer.
                  </td>
                  <td className="px-4 py-3">Trading Systems</td>
                  <td className="px-4 py-3">50ms p95</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Umbra Vault</td>
                  <td className="px-4 py-3">
                    Dual-sided AMM inventory with sigmoid bonding curves and delta
                    hedging.
                  </td>
                  <td className="px-4 py-3">Liquidity Ops</td>
                  <td className="px-4 py-3">99.95% availability</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Oracle Router</td>
                  <td className="px-4 py-3">
                    Aggregates Chainlink, Pyth, Umbra desk reporters, and consensus
                    failover logic.
                  </td>
                  <td className="px-4 py-3">Data Integrity</td>
                  <td className="px-4 py-3">2 min failover</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Risk Sentinel</td>
                  <td className="px-4 py-3">
                    Exposure scoring, breaker management, AML heuristics, and velocity
                    checks.
                  </td>
                  <td className="px-4 py-3">Risk &amp; Controls</td>
                  <td className="px-4 py-3">Continuous</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Wallet Gateway</td>
                  <td className="px-4 py-3">
                    Session orchestration, signature relay, and custodial sub-account
                    syncing.
                  </td>
                  <td className="px-4 py-3">Wallet Core</td>
                  <td className="px-4 py-3">200ms p95</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">
                    Insight Warehouse
                  </td>
                  <td className="px-4 py-3">
                    Streams trades, liquidity metadata, and KPIs into Redshift + Lakehouse
                    bundles.
                  </td>
                  <td className="px-4 py-3">Analytics</td>
                  <td className="px-4 py-3">5 min freshness</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[rgba(127,91,255,0.3)]">
            <table className="min-w-full divide-y divide-[rgba(127,91,255,0.22)]">
              <thead className="bg-[rgba(19,13,50,0.94)] text-xs uppercase tracking-wide text-[#a89dd4]">
                <tr>
                  <th className="px-4 py-3 text-left">Environment</th>
                  <th className="px-4 py-3 text-left">RPC Endpoint</th>
                  <th className="px-4 py-3 text-left">Explorer</th>
                  <th className="px-4 py-3 text-left">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(127,91,255,0.16)] bg-[rgba(11,7,30,0.92)] text-sm text-[#d7c6ff]">
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Production</td>
                  <td className="px-4 py-3">https://rpc.umbramarkets.exchange</td>
                  <td className="px-4 py-3">https://scan.umbramarkets.exchange</td>
                  <td className="px-4 py-3">
                    3 geo-distributed validators, 1 hot standby
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Staging</td>
                  <td className="px-4 py-3">https://rpc.staging.umbramarkets.exchange</td>
                  <td className="px-4 py-3">
                    https://scan.staging.umbramarkets.exchange
                  </td>
                  <td className="px-4 py-3">Resets weekly with anonymised replay data</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Sandbox</td>
                  <td className="px-4 py-3">https://sandbox-rpc.umbramarkets.exchange</td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3">
                    Deterministic blocks for QA and partner certification
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.34)] bg-[rgba(16,11,40,0.9)] p-6 text-sm text-[#d7c6ff]">
            <h3 className="text-lg font-semibold text-white">Telemetry Feed</h3>
            <ul className="mt-3 space-y-2">
              <li>
                Grafana dashboards expose latency, fill ratios, and breaker posture.
              </li>
              <li>
                Prometheus scrapes on subsystem pods with 30s scrape interval and SLO burn
                alerts.
              </li>
              <li>
                Elastic observability indexes audit logs; retention: 12 months hot, 24
                months cold.
              </li>
              <li>
                PagerDuty routing keys map to Trading, Data, Wallet, and Security
                rotations.
              </li>
            </ul>
          </div>
        </section>

        <section id="market-lifecycle" className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Market Lifecycle</h2>
          <p className="text-[#d7c6ff]">
            UmbraMarkets listings progress through seven disciplined states. Strict
            gatekeeping ensures launch quality, accurate resolution, and orderly
            settlement across every binary outcome series.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-white">1. Intake</h3>
              <ul className="space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Proposals filed via admin console or partner API with SLA &lt; 4 hours.
                </li>
                <li>
                  Submission includes event synopsis, resolution criteria, oracle stack,
                  dispute referees.
                </li>
                <li>
                  Minimum seed liquidity: 5,000 USDC or approved institutional basket.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-white">2. Vetting</h3>
              <ul className="space-y-2 text-sm text-[#d7c6ff]">
                <li>Compliance clears proposers (KYC/KYB) and jurisdictional scope.</li>
                <li>
                  Data Integrity verifies oracle availability and fallback logic with
                  scorecard approval.
                </li>
                <li>
                  Risk sets exposure caps, leverage tiers, and fee modifiers informed by
                  volatility bands.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-white">3. Activation</h3>
              <ul className="space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Umbra Vault deploys initial inventory, calibrates bonding curves, seeds
                  YES/NO depth.
                </li>
                <li>
                  Risk Sentinel broadcasts price bands and circuit breaker thresholds to
                  trading UIs.
                </li>
                <li>
                  Marketing automation posts listings to live feed, partner widgets, and
                  affiliate webhooks.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-white">4. Live Trading</h3>
              <ul className="space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Hybrid matching: limit book priority, RFQ, and Umbra Vault backstop
                  liquidity.
                </li>
                <li>
                  Oracle Router posts indicative prices every 12s (crypto), 45s (macro),
                  90s (sports/politics).
                </li>
                <li>
                  Breakers: ±35% five-minute move, oracle lag &gt; 90s, dispute flag, or
                  risk spike &gt; 2σ.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-white">5. Halt</h3>
              <ul className="space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Trigger: scheduled halt, breaker, manual desk decision, or compliance
                  notice.
                </li>
                <li>
                  Liquidity quoting pauses; unwind and closing trades honoured per queue
                  timestamp.
                </li>
                <li>
                  Oracle snapshot stored for dispute reference and compliance archiving.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-white">6. Resolution</h3>
              <ol className="space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Primary oracle outcome fetched, secondary feeds cross-checked, manual
                  attestation logged.
                </li>
                <li>
                  Integrity desk reviews newswire, on-chain event proofs, and partner
                  attestations.
                </li>
                <li>
                  30-minute dispute window for overrides requiring Risk, Compliance, and
                  Governance multi-sig.
                </li>
              </ol>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-white">7. Settlement</h3>
              <ul className="space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Smart contracts release collateral to winning tokens, rebate makers,
                  settle incentives.
                </li>
                <li>
                  Treasury splits fees between liquidity vault, governance, affiliates,
                  and insurance fund.
                </li>
                <li>
                  Insight Warehouse receives final metrics for analytics dashboards and
                  partner billing.
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(14,10,36,0.9)] p-6 text-sm text-[#d7c6ff]">
            <h3 className="text-lg font-semibold text-white">Dispute Ladder</h3>
            <ol className="mt-3 space-y-2">
              <li>
                Taker dispute filed via console or partner API within 30 minutes
                post-resolution.
              </li>
              <li>
                Risk triage reviews logs, oracle proofs, and trade tape; stops payouts if
                necessary.
              </li>
              <li>
                Governance council convenes multi-sig; decision broadcast to wallets and
                status page.
              </li>
              <li>
                Post-mortem recorded in operations archive; policy updates circulate
                within 48 hours.
              </li>
            </ol>
          </div>
        </section>

        <section id="trading-settlement" className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Trading &amp; Settlement</h2>
          <p className="text-[#d7c6ff]">
            Order flow travels through the wallet gateway, match engine, and settlement
            layer. UmbraMarkets supports instant fills, passive quoting, programme
            trading, and automated payouts upon resolution with deterministic on-chain
            receipts.
          </p>
          <div className="overflow-hidden rounded-3xl border border-[rgba(127,91,255,0.3)]">
            <table className="min-w-full divide-y divide-[rgba(127,91,255,0.22)]">
              <thead className="bg-[rgba(19,13,50,0.94)] text-xs uppercase tracking-wide text-[#a89dd4]">
                <tr>
                  <th className="px-4 py-3 text-left">Order type</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(127,91,255,0.16)] bg-[rgba(11,7,30,0.92)] text-sm text-[#d7c6ff]">
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Instant Fill</td>
                  <td className="px-4 py-3">
                    Routes directly to Umbra Vault depth at current implied odds.
                  </td>
                  <td className="px-4 py-3">
                    Retail flow, urgency-driven takers, and automated responses.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Limit Order</td>
                  <td className="px-4 py-3">
                    Adds liquidity to book and executes when crossed.
                  </td>
                  <td className="px-4 py-3">
                    Market makers, prop desks, conditional strategies.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Range Quote</td>
                  <td className="px-4 py-3">
                    Deploys passive inventory along a price band via bonding curve.
                  </td>
                  <td className="px-4 py-3">
                    LPs seeking fee capture with controlled exposure.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Stop Trigger</td>
                  <td className="px-4 py-3">
                    Converts to market order when probability threshold is breached.
                  </td>
                  <td className="px-4 py-3">Risk hedges and managed accounts.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Program Trade</td>
                  <td className="px-4 py-3">
                    Atomic basket that rebalances correlated markets under one signature.
                  </td>
                  <td className="px-4 py-3">
                    Quant desks hedging macro or election slates.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Margin &amp; Exposure</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Positions fully collateralised in USDC/BNB; leverage tiers up to 3x for
                  authorised desks.
                </li>
                <li>
                  Risk Sentinel checks price impact, wallet credit, AML flags, and
                  sanctions posture pre-match.
                </li>
                <li>
                  Real-time PnL streams via WebSocket; reconciliation snapshots archived
                  hourly.
                </li>
                <li>
                  Portfolio Greeks (delta, gamma) available via partner analytics
                  endpoints.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Fee Model</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Taker fee: 35 bps (reduced to 20 bps for governance stakers and partner
                  flow).
                </li>
                <li>
                  Maker rebate: 10 bps credited to LP vaults, 5 bps seasonal boost via
                  incentive votes.
                </li>
                <li>
                  Settlement fee: 5 bps funds oracle operations, dispute council, and
                  insurance pool.
                </li>
                <li>
                  Fee splits: 60% LPs, 25% treasury, 10% affiliate program, 5% insurance
                  continuity.
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(14,10,36,0.9)] p-6 text-sm text-[#d7c6ff]">
            <h3 className="text-lg font-semibold text-white">Matching Pipeline</h3>
            <ol className="mt-3 space-y-2">
              <li>
                Wallet Gateway signs payloads and forwards to match engine with
                deterministic nonce.
              </li>
              <li>
                Risk Sentinel validates collateral, price impact, credit lines, and
                jurisdiction policy.
              </li>
              <li>
                Orders match against book; residual routes to Umbra Vault or RFQ
                counterparties.
              </li>
              <li>
                Trade confirmations stream via TCP/WebSocket and settle on-chain within 2
                blocks.
              </li>
            </ol>
            <h3 className="mt-6 text-lg font-semibold text-white">Settlement Flow</h3>
            <ul className="mt-3 space-y-2">
              <li>
                Resolution triggers automated payouts with Merkle proofs for affiliate
                accounting.
              </li>
              <li>
                Maker rebates, affiliate splits, and treasury allocations execute in a
                single batched transaction.
              </li>
              <li>
                Positions archive to Insight Warehouse; audit packets stored for 7 years.
              </li>
            </ul>
          </div>
        </section>

        <section id="liquidity-fees" className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Liquidity &amp; Fees</h2>
          <p className="text-[#d7c6ff]">
            UmbraMarkets sustains depth via protocol-owned capital, partner vaults, and
            affiliate programs. Bonding curves dynamically rebalance exposure while
            incentive layers reward stability and diversification.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Pool Composition</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Collateral mix: 70% USDC, 20% BNB stable baskets, 10% strategic hedges
                  (perpetual offsets).
                </li>
                <li>
                  Sigmoid bonding curve adjusts slope by realised volatility and liquidity
                  utilisation.
                </li>
                <li>
                  Vault tiers: protocol treasury, community vault, partner-managed books,
                  insurance tranche.
                </li>
                <li>
                  Vault governance sets guardrails: max exposure, asset inclusion,
                  rebalancing cadence.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Incentive Programs</h3>
              <table className="w-full text-sm text-[#d7c6ff]">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-[#a89dd4]">
                    <th className="pb-2">Program</th>
                    <th className="pb-2">Reward</th>
                    <th className="pb-2">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(127,91,255,0.2)]">
                  <tr>
                    <td className="py-2 font-semibold text-white">Vault Yield</td>
                    <td className="py-2">UMBRA token (continuous)</td>
                    <td className="py-2">
                      Pro-rata on time-weighted liquidity contribution.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-white">Depth Boosters</td>
                    <td className="py-2">USDC (weekly)</td>
                    <td className="py-2">
                      Targets thinly traded markets with automated scaling.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-white">Affiliate Split</td>
                    <td className="py-2">UMBRA &amp; USDC (monthly)</td>
                    <td className="py-2">
                      Shares taker fees from referred flow based on verified referrals.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-white">Governance Boost</td>
                    <td className="py-2">Bonus voting power</td>
                    <td className="py-2">
                      Rewards LPs who commit capital during volatility spikes.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(14,10,36,0.9)] p-6 text-sm text-[#d7c6ff]">
            <h3 className="text-lg font-semibold text-white">Risk Controls</h3>
            <ul className="mt-3 space-y-2">
              <li>
                Dynamic fee escalator widens spreads beyond 3σ volatility or low depth
                thresholds.
              </li>
              <li>
                Exposure caps guard against concentrated YES/NO skew and syndicate
                overreach.
              </li>
              <li>
                Vault auto-rebalances when delta drifts 15% from neutral; circuit engages
                at 25%.
              </li>
              <li>
                Insurance tranche accumulates 10% of protocol revenues to offset
                black-swan resolution.
              </li>
            </ul>
            <h3 className="mt-6 text-lg font-semibold text-white">Monitoring</h3>
            <ul className="mt-3 space-y-2">
              <li>
                Utilisation ratio: executed volume vs available liquidity by market
                cluster.
              </li>
              <li>
                Fee APR: annualised LP yield reported in portfolio dashboards and partner
                APIs.
              </li>
              <li>
                Inventory imbalance: real-time YES/NO exposure heatmap with automatic
                rebalance triggers.
              </li>
              <li>
                Whale tracking: alerts when single wallet concentration exceeds 12% of
                side depth.
              </li>
            </ul>
          </div>
        </section>

        <section id="wallet-security" className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Wallet &amp; Security</h2>
          <p className="text-[#d7c6ff]">
            UmbraMarkets supports self-custody wallets and managed institutional accounts.
            Security layers protect funds, enforce compliance posture, and coordinate
            rapid incident response across venues.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Supported wallets</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Phantom (BNB edition), Ledger via WalletConnect v2, OKX, Rainbow, Safe
                  {'}{'} for multi-sig desks.
                </li>
                <li>
                  Custodial API keys for prime brokers with sub-account oversight and
                  permission sets.
                </li>
                <li>
                  Internal cold storage for protocol treasury, insurance fund, and
                  governance nodes.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Session flow</h3>
              <ol className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  User initiates connect; nonce issued by Wallet Gateway referencing
                  device fingerprint.
                </li>
                <li>
                  Signed message establishes session (15-minute renewal cadence,
                  extendable to 2 hours).
                </li>
                <li>
                  Sessions bound to IP risk score, geo policy, and behavioural heuristics.
                </li>
                <li>
                  High-risk logins require step-up verification (MPC approval or SSO
                  attestation).
                </li>
              </ol>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Security stack</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  MPC signing for treasury wallets; hardware HSM for key shards and daily
                  rotation.
                </li>
                <li>
                  Rate limiting (10 auth attempts/min/IP) with bot scoring and anomaly
                  baselines.
                </li>
                <li>
                  Geo-fencing &amp; sanctions screening via Sumsub, Chainalysis, and
                  internal heuristics.
                </li>
                <li>
                  Continuous pen-testing and bounty coordination through vetted security
                  partners.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Incident response</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Withdrawals paused via admin circuit breakers with multi-sig override.
                </li>
                <li>
                  Compromised API keys revoked and rotated within 5 minutes; alerts sent
                  to partner SOC.
                </li>
                <li>
                  Transparent incident bulletins posted within one hour via status portal
                  and email.
                </li>
                <li>
                  RCA distributed within 72 hours; playbooks updated and reviewed with
                  compliance.
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(14,10,36,0.9)] p-6 text-sm text-[#d7c6ff]">
            <span className="font-semibold text-white">Compliance:</span> SOC 2 Type II in
            progress; quarterly external smart-contract audits; nightly PEP &amp;
            sanctions screening; GDPR data residency enforced for EU accounts; ISO 27001
            alignment review 2H 2025.
          </div>
        </section>

        <section id="integrations-partnerships" className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">
            Integrations &amp; Partnerships
          </h2>
          <p className="text-[#d7c6ff]">
            UmbraMarkets extends via REST, WebSocket, FIX bridge, and admin APIs.
            Strategic partnerships drive liquidity, affiliate expansion, market creation,
            and data distribution across aligned ecosystems.
          </p>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
            <h3 className="text-lg font-semibold text-white">API Surface</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
              <li>
                REST trading API: orders, positions, balances, listings, vault analytics,
                governance hooks.
              </li>
              <li>
                WebSocket feed: live trades, book updates, settlement events, breaker
                telemetry.
              </li>
              <li>
                Insights API: aggregated liquidity metrics, partner performance, referral
                KPIs, compliance exports.
              </li>
              <li>
                Admin API (restricted): listings, breakers, treasury, incentive
                management, and risk overrides.
              </li>
              <li>
                FIX gateway (beta): drop-copy fills, order acknowledgements, and session
                heartbeats.
              </li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[rgba(127,91,255,0.3)]">
            <table className="min-w-full divide-y divide-[rgba(127,91,255,0.22)]">
              <thead className="bg-[rgba(19,13,50,0.94)] text-xs uppercase tracking-wide text-[#a89dd4]">
                <tr>
                  <th className="px-4 py-3 text-left">Program</th>
                  <th className="px-4 py-3 text-left">Target</th>
                  <th className="px-4 py-3 text-left">Benefits</th>
                  <th className="px-4 py-3 text-left">Requirements</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(127,91,255,0.16)] bg-[rgba(11,7,30,0.92)] text-sm text-[#d7c6ff]">
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">
                    Affiliate Network
                  </td>
                  <td className="px-4 py-3">
                    Communities, research desks, content partners
                  </td>
                  <td className="px-4 py-3">
                    Revenue share on taker fees, co-marketing assets, analytics dashboard.
                  </td>
                  <td className="px-4 py-3">
                    KYC, minimum activity targets, quarterly reviews, brand alignment.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">
                    Liquidity Specialist
                  </td>
                  <td className="px-4 py-3">Market makers, prop funds</td>
                  <td className="px-4 py-3">
                    Fee reductions, inventory incentives, reporting tools, early listings.
                  </td>
                  <td className="px-4 py-3">
                    Baseline liquidity commitments, weekly metrics, capital verification.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Data Distributor</td>
                  <td className="px-4 py-3">Quant firms, media syndicates</td>
                  <td className="px-4 py-3">
                    Low-latency feeds, data licensing revenue, attribution tagging.
                  </td>
                  <td className="px-4 py-3">
                    Signed data agreement, usage policy adherence, audit rights.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">
                    Syndicate Launchpad
                  </td>
                  <td className="px-4 py-3">Hedge desks, DAO treasuries</td>
                  <td className="px-4 py-3">
                    Priority listings, umbrella marketing slots, liquidity bootstrapping.
                  </td>
                  <td className="px-4 py-3">
                    Capital lockups, compliance attestation, performance covenants.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(14,10,36,0.9)] p-6 text-sm text-[#d7c6ff]">
            <h3 className="text-lg font-semibold text-white">Integration Checklist</h3>
            <ol className="mt-3 space-y-2">
              <li>
                Request API credentials via partner desk; complete compliance onboarding
                and risk assessment.
              </li>
              <li>
                Review rate limits, error handling playbooks, sandbox certification pack,
                and FIX guidelines.
              </li>
              <li>
                Implement webhook/websocket listeners for trade, settlement, and breaker
                events.
              </li>
              <li>
                Schedule go-live verification with operations, risk, and security; sign
                monitoring MOU.
              </li>
            </ol>
          </div>
        </section>

        <section id="governance-treasury" className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Governance &amp; Treasury</h2>
          <p className="text-[#d7c6ff]">
            UmbraMarkets governance balances agility with accountability. Treasury
            management, capital allocation, and policy setting run through a three-tier
            structure combining token-based voting with expert councils.
          </p>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
            <table className="w-full text-sm text-[#d7c6ff]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-[#a89dd4]">
                  <th className="pb-2">Body</th>
                  <th className="pb-2">Mandate</th>
                  <th className="pb-2">Voting cadence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(127,91,255,0.18)]">
                <tr>
                  <td className="py-2 font-semibold text-white">Umbra Council</td>
                  <td className="py-2">
                    Approves listings, breaker policy, incentive budgets, emergency
                    actions.
                  </td>
                  <td className="py-2">Weekly (quorum 5/7)</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-white">Token Assembly</td>
                  <td className="py-2">
                    Sets fee tiers, vault allocations, long-term roadmap and governance
                    upgrades.
                  </td>
                  <td className="py-2">Quarterly (≥ 4% voting power)</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-white">Treasury Desk</td>
                  <td className="py-2">
                    Executes rebalancing, hedge overlays, insurance capital strategy.
                  </td>
                  <td className="py-2">Continuous, reports monthly</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Capital Policy</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Target treasury split: 45% liquidity operations, 25% runway, 20%
                  insurance, 10% ecosystem grants.
                </li>
                <li>
                  Rebalancing uses algorithmic thresholds with council oversight for
                  off-cycle actions.
                </li>
                <li>
                  Insurance fund held in diversified stable baskets + low-vol hedges.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Governance Process</h3>
              <ol className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Proposal drafted in governance forum with financial, risk, and
                  compliance annex.
                </li>
                <li>
                  Community temperature check (48 hours) prior to council agenda
                  placement.
                </li>
                <li>
                  Council review; if approved, escalates to Token Assembly where required.
                </li>
                <li>
                  Execution via Zodiac-safe module; results broadcast to status portal and
                  docs.
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section id="risk-compliance" className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Risk &amp; Compliance</h2>
          <p className="text-[#d7c6ff]">
            Risk discipline underpins every UmbraMarkets expansion. Controls span market
            surveillance, credit checks, compliance reporting, and global policy adherence
            with active regulator dialogue.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Market Surveillance</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Velocity, wash, and collusion heuristics; 5-minute anomaly windows.
                </li>
                <li>
                  Behavioral ML models ingest on-chain data, exchange feeds, and affiliate
                  referral metadata.
                </li>
                <li>
                  Alerts triaged by Risk Sentinel; escalations documented in case
                  management system.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Compliance Framework</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  KYC/KYB through multi-provider pipeline; high-risk jurisdictions require
                  manual approval.
                </li>
                <li>
                  Transaction monitoring with SAR/STR triggers and audit-ready evidence
                  trails.
                </li>
                <li>
                  Privacy posture aligns with GDPR, PDPA, and CCPA; records minimised via
                  tokenisation.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">
                Credit &amp; Counterparty
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Institutional desks assigned credit bands; automatic downgrade upon
                  breach or sanction trigger.
                </li>
                <li>
                  Custodial partners provide daily attestations; variance beyond 0.5%
                  flagged for council.
                </li>
                <li>
                  Managed accounts require collateral top-ups when utilisation &gt; 75%.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Reporting &amp; Audits</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Weekly regulatory snapshot exported to secure data room for partnered
                  jurisdictions.
                </li>
                <li>
                  Quarterly independent smart-contract and operational audits with public
                  summaries.
                </li>
                <li>
                  Annual SOC 2, ISO 27001 gap analyses, and regulator tabletop exercises.
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(14,10,36,0.9)] p-6 text-sm text-[#d7c6ff]">
            <h3 className="text-lg font-semibold text-white">Policy Library</h3>
            <ol className="mt-3 space-y-2">
              <li>
                Market Integrity Code — governs listings, disputes, oracle coordination.
              </li>
              <li>
                Compliance Handbook — regional onboarding, data retention, reporting
                flows.
              </li>
              <li>
                Risk Playbooks — threshold configurations, breaker scripts, treasury
                hedging policies.
              </li>
              <li>
                Partner Charter — responsibilities, escalation ladders, marketing rights.
              </li>
            </ol>
          </div>
        </section>

        <section id="analytics-reporting" className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Analytics &amp; Reporting</h2>
          <p className="text-[#d7c6ff]">
            Insight Warehouse powers UmbraMarkets decision-making, compliance exports, and
            partner analytics. Data pipelines prioritise freshness, auditability, and
            fine-grained access controls.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Data Architecture</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Ingestion: Kafka topics for trades, balances, liquidity, governance
                  events.
                </li>
                <li>
                  Processing: dbt models orchestrated via Airflow with 10-minute SLAs.
                </li>
                <li>
                  Storage: Redshift for analytics, S3 Lakehouse for long-term retention,
                  Elastic for search.
                </li>
                <li>
                  Access: role-based policies and row-level filters for affiliates,
                  regulators, and internal teams.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Dashboards</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Liquidity Pulse — depth, spreads, utilisation, whale alerts in real
                  time.
                </li>
                <li>
                  Revenue Matrix — fee capture, maker rebates, affiliate splits, cost of
                  incentives.
                </li>
                <li>
                  Risk Monitor — breaker posture, dispute queue, suspicious activity with
                  drill-down.
                </li>
                <li>
                  Partner 360 — referrals, conversion, regional heatmaps, marketing
                  attribution.
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(14,10,36,0.9)] p-6 text-sm text-[#d7c6ff]">
            <h3 className="text-lg font-semibold text-white">Reporting Cadence</h3>
            <table className="mt-3 w-full text-sm text-[#d7c6ff]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-[#a89dd4]">
                  <th className="pb-2">Report</th>
                  <th className="pb-2">Frequency</th>
                  <th className="pb-2">Recipients</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(127,91,255,0.16)]">
                <tr>
                  <td className="py-2 font-semibold text-white">Trading Desk Digest</td>
                  <td className="py-2">Daily</td>
                  <td className="py-2">Trading, Risk, Liquidity Ops</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-white">Compliance Ledger</td>
                  <td className="py-2">Weekly</td>
                  <td className="py-2">Compliance, Legal, Regulators</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-white">Treasury NAV</td>
                  <td className="py-2">Monthly</td>
                  <td className="py-2">Governance, Council, Investors</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-white">Partner Attribution</td>
                  <td className="py-2">Monthly</td>
                  <td className="py-2">Affiliate &amp; Liquidity Partners</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="operations-playbooks" className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Operations Playbooks</h2>
          <p className="text-[#d7c6ff]">
            Each desk maintains actionable playbooks to guarantee rapid response, clear
            accountability, and consistent communication across UmbraMarkets operations.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Incident Response</h3>
              <ol className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Alert triggered by Sentinel or manual report; severity scored within 5
                  minutes.
                </li>
                <li>
                  Incident commander appointed; stakeholders paged (trading, risk, comms,
                  compliance).
                </li>
                <li>
                  War-room established in Umbra Bridge; updates posted every 15 minutes
                  until resolution.
                </li>
                <li>
                  Debrief within 48 hours; action items assigned with tracked due dates.
                </li>
              </ol>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Listing Launch</h3>
              <ol className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Pre-launch QA on staging: liquidity scripts, oracle feed, copy,
                  analytics wiring.
                </li>
                <li>
                  Risk sign-off and compliance attestation recorded in launch ticket.
                </li>
                <li>
                  Soft launch via partner API; monitor order book health before public
                  announcement.
                </li>
                <li>
                  Post-launch review after 24 hours; adjust incentives or messaging as
                  needed.
                </li>
              </ol>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Dispute Handling</h3>
              <ol className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Capture trade/position IDs, claimant details, supporting evidence.
                </li>
                <li>
                  Risk + Integrity review logs, oracle proofs, communications history.
                </li>
                <li>Council vote if reversal or manual resolution required.</li>
                <li>
                  Communicate ruling to claimant, public status page, and analytics for
                  audit.
                </li>
              </ol>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Partner Onboarding</h3>
              <ol className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Compliance vetting, legal agreements, sandbox certification checklist.
                </li>
                <li>
                  Credentials issued with scoped permissions and monitoring requirements.
                </li>
                <li>Joint go-live rehearsal; ensure telemetry dashboards accessible.</li>
                <li>
                  Review after 14 days; adjust limits, incentives, or escalation paths.
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section id="business-continuity" className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Business Continuity</h2>
          <p className="text-[#d7c6ff]">
            Redundant infrastructure, failover drills, and crisis communication protocols
            ensure UmbraMarkets continuity. The aim is sub-five-minute RTO (Recovery Time
            Objective) and near-zero data loss across venues.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Infrastructure</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Active-active regional clusters; BNB validators mirrored across
                  Singapore, Frankfurt, São Paulo.
                </li>
                <li>
                  Critical services containerised with automated failover via service
                  mesh.
                </li>
                <li>
                  Daily state snapshots encrypted and stored across three cloud providers.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[rgba(127,91,255,0.3)] bg-[rgba(13,9,34,0.92)] p-6">
              <h3 className="text-lg font-semibold text-white">Crisis Comms</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#d7c6ff]">
                <li>
                  Incident Bridge publishes status within 10 minutes of major events.
                </li>
                <li>
                  Partner and regulator hotlines auto-notify with voice + email templated
                  updates.
                </li>
                <li>
                  Community updates posted to Twitter, Discord, and mailing list with
                  approved copy.
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(14,10,36,0.9)] p-6 text-sm text-[#d7c6ff]">
            <h3 className="text-lg font-semibold text-white">Testing Cadence</h3>
            <ol className="mt-3 space-y-2">
              <li>
                Monthly tabletop exercises covering oracle failure, liquidity drain,
                wallet compromise.
              </li>
              <li>
                Quarterly full failover to secondary region with production-like load.
              </li>
              <li>
                Annual blackhole simulation with external auditors observing response.
              </li>
              <li>
                Findings tracked in continuity backlog with ownership and deadlines.
              </li>
            </ol>
          </div>
        </section>

        <section id="roadmap" className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Roadmap &amp; Initiatives</h2>
          <p className="text-[#d7c6ff]">
            UmbraMarkets maintains a rolling roadmap balancing product expansion,
            compliance milestones, and liquidity growth initiatives. Timelines update
            monthly through governance review.
          </p>
          <div className="overflow-hidden rounded-3xl border border-[rgba(127,91,255,0.3)]">
            <table className="min-w-full divide-y divide-[rgba(127,91,255,0.22)] text-sm text-[#d7c6ff]">
              <thead className="bg-[rgba(19,13,50,0.94)] text-xs uppercase tracking-wide text-[#a89dd4]">
                <tr>
                  <th className="px-4 py-3 text-left">Initiative</th>
                  <th className="px-4 py-3 text-left">Target</th>
                  <th className="px-4 py-3 text-left">Quarter</th>
                  <th className="px-4 py-3 text-left">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(127,91,255,0.16)] bg-[rgba(11,7,30,0.92)]">
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Options Layer</td>
                  <td className="px-4 py-3">
                    Introduce skew-adjusted ladder options for macro markets.
                  </td>
                  <td className="px-4 py-3">2025 Q4</td>
                  <td className="px-4 py-3">Trading Systems</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">
                    Regulatory Passport
                  </td>
                  <td className="px-4 py-3">
                    Secure licensing and sandbox access in three priority jurisdictions.
                  </td>
                  <td className="px-4 py-3">2026 Q1</td>
                  <td className="px-4 py-3">Compliance</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">
                    Multi-Collateral Expansion
                  </td>
                  <td className="px-4 py-3">
                    Add ETH, BTC-backed stables with dynamic haircuts.
                  </td>
                  <td className="px-4 py-3">2026 Q2</td>
                  <td className="px-4 py-3">Treasury Desk</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Partner Live Ops</td>
                  <td className="px-4 py-3">
                    Launch managed market program with media + exchange partners.
                  </td>
                  <td className="px-4 py-3">2025 Q4</td>
                  <td className="px-4 py-3">Partnerships</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Risk Sentinel v3</td>
                  <td className="px-4 py-3">
                    Deploy behaviour graph models and automated sanction triggers.
                  </td>
                  <td className="px-4 py-3">2026 Q1</td>
                  <td className="px-4 py-3">Risk &amp; Controls</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(14,10,36,0.9)] p-6 text-sm text-[#d7c6ff]">
            <span className="font-semibold text-white">Roadmap governance:</span> Any
            initiative shifting more than 5% of annual budget must pass council review and
            token assembly approval before execution.
          </div>
        </section>

        <section id="appendix" className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Appendix</h2>
          <p className="text-[#d7c6ff]">
            Reference contacts, service guarantees, revision history, and vocabulary
            supporting operational readiness across UmbraMarkets.
          </p>
          <div className="overflow-hidden rounded-3xl border border-[rgba(127,91,255,0.3)]">
            <table className="min-w-full divide-y divide-[rgba(127,91,255,0.22)]">
              <thead className="bg-[rgba(19,13,50,0.94)] text-xs uppercase tracking-wide text-[#a89dd4]">
                <tr>
                  <th className="px-4 py-3 text-left">Function</th>
                  <th className="px-4 py-3 text-left">SLA</th>
                  <th className="px-4 py-3 text-left">Escalation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(127,91,255,0.16)] bg-[rgba(11,7,30,0.92)] text-sm text-[#d7c6ff]">
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Trading Core</td>
                  <td className="px-4 py-3">99.95% uptime</td>
                  <td className="px-4 py-3">PagerDuty TRD-ONCALL</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Oracle Router</td>
                  <td className="px-4 py-3">99.9% uptime</td>
                  <td className="px-4 py-3">PagerDuty DATA-ONCALL</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Wallet Gateway</td>
                  <td className="px-4 py-3">99.9% uptime</td>
                  <td className="px-4 py-3">PagerDuty WALLET-ONCALL</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-white">Compliance Desk</td>
                  <td className="px-4 py-3">24h response</td>
                  <td className="px-4 py-3">PagerDuty CMP-ONCALL</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(14,10,36,0.9)] p-6 text-sm text-[#d7c6ff]">
            <div className="text-xs uppercase tracking-wide text-[#a89dd4]">
              Contact directory
            </div>
            <ul className="mt-3 space-y-2">
              <li>Operations Bridge: ops@umbramarkets.exchange</li>
              <li>Security Hotline: security@umbramarkets.exchange</li>
              <li>Partnerships Desk: partners@umbramarkets.exchange</li>
              <li>Incident Bridge: https://status.umbramarkets.exchange</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(14,10,36,0.9)] p-6 text-sm text-[#d7c6ff]">
            <div className="text-xs uppercase tracking-wide text-[#a89dd4]">
              Document revisions
            </div>
            <table className="mt-3 w-full text-sm text-[#d7c6ff]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-[#a89dd4]">
                  <th className="pb-2">Version</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Author</th>
                  <th className="pb-2">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(127,91,255,0.16)]">
                <tr>
                  <td className="py-2 font-semibold text-white">3.5</td>
                  <td className="py-2">2025-10-19</td>
                  <td className="py-2">Trading Ops</td>
                  <td className="py-2">
                    Expanded governance, risk, analytics, and continuity playbooks.
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-white">3.1</td>
                  <td className="py-2">2025-08-02</td>
                  <td className="py-2">Liquidity Ops</td>
                  <td className="py-2">
                    Refined liquidity policy and partner onboarding guidelines.
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-white">2.6</td>
                  <td className="py-2">2024-07-08</td>
                  <td className="py-2">Risk &amp; Controls</td>
                  <td className="py-2">Introduced Risk Sentinel breaker thresholds.</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-white">1.0</td>
                  <td className="py-2">2023-11-21</td>
                  <td className="py-2">Founding Desk</td>
                  <td className="py-2">Inaugural UmbraMarkets operations manual.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-3xl border border-[rgba(127,91,255,0.32)] bg-[rgba(14,10,36,0.9)] p-6 text-sm text-[#d7c6ff]">
            <div className="text-xs uppercase tracking-wide text-[#a89dd4]">Glossary</div>
            <ul className="mt-3 space-y-2">
              <li>
                Umbra Vault — Capital pool supplying AMM depth and hedging inventory.
              </li>
              <li>Risk Sentinel — Real-time surveillance and breaker system.</li>
              <li>
                Dark Order — Reserved liquidity instruction hidden from public tape.
              </li>
              <li>Desk Cue — High-signal market highlight surfaced to traders.</li>
              <li>
                Insight Warehouse — Analytics stack powering dashboards and compliance
                exports.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
