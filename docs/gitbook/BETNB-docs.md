# BETNB Documentation Compendium

> **Release:** v0.9.0 (October 2025)
>
> **Audience:** Internal operators, liquidity partners, market makers, compliance teams, and integration engineers.

## Table of Contents

1. [Welcome](#welcome)
2. [Platform Overview](#platform-overview)
3. [Market Lifecycle](#market-lifecycle)
4. [Trading & Settlement](#trading--settlement)
5. [Liquidity & Fees](#liquidity--fees)
6. [Wallet & Security](#wallet--security)
7. [Integrations & Partnerships](#integrations--partnerships)
8. [Appendix](#appendix)

## Welcome

Welcome to the official BETNB documentation set. This guide explains how the prediction exchange operates, the data flows that power pricing, and the controls that keep user funds and positions secure.

Use the table of contents above to jump into any section. Each chapter is written for product, risk, and integration teams to shorten onboarding time.

### Quick Reference

- **Trading hours:** 24/7, markets settle when the referenced oracle posts a final value.
- **Collateral:** BNB and BUSD test collateral with deterministic pricing curves.
- **Oracle latency:** Median 46 seconds for sports; 18 seconds for crypto feeds.
- **Support:** `docs@betnb.exchange` (routes to the triage channel).

### How to Navigate This Doc

1. Start with [Platform Overview](#platform-overview) to learn the core modules.
2. Review [Market Lifecycle](#market-lifecycle) to understand creation, resolution, and dispute windows.
3. When ready to integrate, jump to [Trading & Settlement](#trading--settlement) for order flow expectations.
4. Liquidity providers should study [Liquidity & Fees](#liquidity--fees) to model incentives.
5. Wallet, security, and compliance requirements live under [Wallet & Security](#wallet--security).
6. External developers should grab API specs in [Integrations & Partnerships](#integrations--partnerships).

## Platform Overview

BETNB is a venue for binary outcome prediction markets optimised for the BNB Chain. The platform marries an automated market maker (AMM) core with curated event onboarding to deliver tight spreads and rapid time-to-listing.

### Core Services

| Service             | Description                                                                           | Owner           | SLA                 |
| ------------------- | ------------------------------------------------------------------------------------- | --------------- | ------------------- |
| **Match Engine**    | Processes limit/market orders, runs order-matching checks, and coordinates AMM fills. | Trading Systems | 50 ms p95           |
| **Liquidity Vault** | Multi-asset pool that provides two-sided liquidity using sigmoid bonding curves.      | Liquidity Ops   | 99.95% availability |
| **Oracle Router**   | Pulls resolution data from Chainlink, Pyth, and first-party scrapers.                 | Data Integrity  | 2 min failover      |
| **Risk Guardian**   | Sandboxed worker that validates price impact, margin, and suspicious activity.        | Risk & Controls | Real-time           |
| **Wallet Gateway**  | Handles Phantom and WalletConnect session handshakes, relays signed transactions.     | Wallet Core     | 200 ms p95          |

### Environment Matrix

| Environment    | RPC Endpoint                         | Explorer                              | Notes                                                         |
| -------------- | ------------------------------------ | ------------------------------------- | ------------------------------------------------------------- |
| **Production** | `https://rpc.betnb.exchange`         | `https://scan.betnb.exchange`         | Backed by three geo-distributed validator nodes.              |
| **Staging**    | `https://rpc.staging.betnb.exchange` | `https://scan.staging.betnb.exchange` | Reset weekly. Contains synthetic data for regression testing. |
| **Sandbox**    | `https://sandbox-rpc.betnb.exchange` | n/a                                   | Local validator with deterministic block times for QA.        |

### Governance Model

- **Listing Committee:** Reviews new market proposals daily. Requires three-of-five multi-sig to activate.
- **Risk Council:** Can pause trading or adjust fees during high-volatility events. Maintains a runbook for each asset class.
- **Treasury Stewards:** Manage liquidity mining budgets, affiliate payments, and buyback programs.

### Operational Cadence

- **Daily** – Market launch stand-up, oracle health check, liquidity rebalancing snapshot.
- **Weekly** – Incident review, fee revenue reconciliation, partner sentiment scan.
- **Monthly** – Treasury report, roadmap checkpoint, compliance / KYC audit trail verification.

### Control Surfaces

1. **Admin Console:** Web dashboard with circuit breaker toggles, fee sliders, and oracle override tools.
2. **CLI Toolkit:** Scripts for importing historical market data, seeding liquidity, and backfilling order books.
3. **Observability Suite:** Grafana dashboards, Loki log scrapers, and PagerDuty runbooks for automated escalation.

> **Tip:** Ensure on-call engineers have access to both the Admin Console and CLI Toolkit. During an outage the runbook requires toggling circuit breakers and injecting manual oracle values within five minutes.

## Market Lifecycle

Each BETNB market progresses through clearly defined states. Understanding these states helps operations teams coordinate listings, liquidity, and settlement tasks.

### 1. Intake

- **Trigger:** Proposal submitted via Admin Console or API.
- **Checklist:**
  - Event summary (<140 characters)
  - Resolution criteria with data source hierarchy
  - Proposed trading halt time and settlement buffer
  - Liquidity seed (min 5,000 USDC or equivalent)
- **Outputs:** Market ID reserved, slug created, and due diligence ticket opened in Jira.

### 2. Vetting

- KYC / compliance screening on proposers
- Oracle coverage validation (Chainlink primary, Pyth backup)
- Legal sign-off for jurisdictions with restrictions
- Risk Council computes max exposure cap and leverage limits

### 3. Activation

- Liquidity Vault deposits two-sided inventory
- Risk Guardian publishes guard-rails (price bounds, max order size)
- Match Engine toggled to `OPEN`
- Marketing automation schedules announcement in live feed

### 4. Live Trading

- Continuous double auction augmented by AMM depth
- Maker/taker fees applied per [Liquidity & Fees](#liquidity--fees)
- Oracle Router publishes indicative prices every 12 seconds
- Circuit breakers:
  - Volatility halt: ±35% move within 5 minutes
  - Data freeze: Oracle update lag >90 seconds

### 5. Halt

- Trigger events:
  - Scheduled halt time
  - Manual halt via Risk Council
  - Automatic due to breaker thresholds
- Liquidity Vault stops quoting new ranges but honours close orders
- Oracle Router finalizes last trusted price snapshot

### 6. Resolution

1. Oracle Router fetches official outcome from the primary feed.
2. Risk Guardian cross-checks with backup feeds and manual reports.
3. Dispute window (30 minutes) opens for integrity team.
4. Once confirmed, market status flips to `RESOLVED`.

### 7. Settlement

- Payout engine processes winning positions on-chain.
- Rebates for makers and affiliates executed.
- Treasury books fee revenue and liquidity provider rebates.
- Post-mortem: Market metrics logged to data warehouse for insights.

### State Diagram

```
INTAKE -> VETTING -> ACTIVATION -> LIVE -> HALT -> RESOLUTION -> SETTLEMENT -> ARCHIVED
          ^                                         |
          |-----------------------------------------|
```

> **Reminder:** Never skip the dispute window. Even self-evident outcomes require the integrity sign-off to maintain Chainlink SLA compliance.

## Trading & Settlement

This section explains how orders flow through the system and how positions settle after resolution.

### Order Types

| Type                   | Description                                                                     | Typical Use Case                           |
| ---------------------- | ------------------------------------------------------------------------------- | ------------------------------------------ |
| **Instant (AMM) Fill** | Executes against pool liquidity at current implied probability.                 | Retail traders seeking immediate exposure. |
| **Limit Order**        | Books a price level on the order book; fills when the market crosses the quote. | Market makers and advanced traders.        |
| **Stop Trigger**       | Converts to market order when the implied probability passes a threshold.       | Risk management hedges.                    |
| **Range Order**        | Adds range-bound liquidity via the AMM bonding curve.                           | Passive LPs deploying capital for fees.    |

### Margin & Exposure

- Positions are fully collateralized in USDC or BNB.
- Max leverage: 3x notional for whitelisted partners (collateral held in escrow).
- Exposure caps enforced by Risk Guardian per market.
- Unrealized PnL settles to the wallet gateway every block for portfolio tracking.

### Fee Model

- **Taker Fee:** 35 bps, discounted to 20 bps for accounts staking BETNB governance tokens.
- **Maker Rebate:** 10 bps credited to LP vault after fill confirmation.
- **Settlement Fee:** 5 bps applied on winning payouts to cover oracle costs.
- Fees stream into Treasury, then redistributed weekly to LPs and governance pool.

### Matching Pipeline

1. Order submitted via web app or API.
2. Wallet Gateway signs and forwards to Match Engine.
3. Risk Guardian evaluates price impact, collateral sufficiency, and AML heuristics.
4. Orders that pass validation either match against book or route to AMM.
5. Trade confirmation emitted to WebSocket feed and recorded on-chain.

### Settlement Process

- Once a market is `RESOLVED`, payout instructions generate automatically.
- Smart contracts transfer winnings and return unused collateral.
- Positions flip to `CLOSED`; historical data gets archived to the Insights warehouse.
- Disputed settlements route to Operations for manual overrides using Admin Console tools.

### Failure Handling

- **On-chain Failures:** Retries with exponential backoff; if still failing, alerts the on-call engineer.
- **Oracle Discrepancy:** Settlement paused, dispute window extended, pushes notification to compliance.
- **Stuck Orders:** Automatically cancelled if unfilled for 72 hours unless flagged as strategic liquidity.

> **Best Practice:** Encourage traders to confirm wallet balances post-settlement. The Wallet Gateway broadcasts an event but clients should refresh session state to avoid stale UI data.

## Liquidity & Fees

BETNB uses a concentric bonding curve design to keep bid-ask spreads tight while rewarding LPs for inventory risk.

### Pool Composition

- **Collateral Basket:** 70% USDC, 30% BNB stables (auto-rebalanced daily).
- **Bonding Curve:** Sigmoid function with dynamic slope adjustments based on volatility.
- **Inventory Buckets:**
  - Core liquidity (protocol-owned)
  - Community vault (LPs staking liquidity shares)
  - Partner managed lines (institutional market makers)

### Incentives

| Program             | Duration      | Reward Token | Notes                                                           |
| ------------------- | ------------- | ------------ | --------------------------------------------------------------- |
| **Vault Yield**     | Continuous    | BETNB        | Distributed pro-rata based on time-weighted liquidity.          |
| **Depth Boosters**  | Weekly epochs | USDC         | Bonus for markets with low initial depth.                       |
| **Affiliate Split** | Monthly       | BETNB & USDC | Portion of trading fees returned to takers brought by partners. |

### Fee Distribution

1. Taker fees enter Treasury smart contract.
2. Contract streams 60% to liquidity providers, 30% to Treasury reserves, 10% to affiliate pool.
3. Settlement fees cover oracle costs and dispute arbitrage.

### Risk Controls

- Dynamic fee escalator widens spreads when volatility > 3σ.
- Exposure caps enforced per market to prevent concentrated inventory.
- Liquidity Vault rebalances inventory whenever delta > 15% from neutral.

### Monitoring Metrics

- **Utilisation Ratio:** Filled volume vs. available liquidity.
- **Fee APR:** Annualized yield for LPs (displayed in Portfolio dashboard).
- **Inventory Imbalance:** Tracks skew across YES/NO outcomes.

### Off-boarding Liquidity

- LPs queue withdrawals with a 24-hour cooldown.
- Emergency withdrawal enabled when protocol health score < 0.7.
- Liquidity Vault publishes state snapshots to IPFS for transparency.

> **Note:** Liquidity events should be announced in the live feed so traders can anticipate spread changes. Coordinate with Marketing and Treasury before executing major rebalances.

## Wallet & Security

This guide outlines wallet support, security guarantees, and incident response procedures.

### Supported Wallets

- **Phantom (BNB Chain edition)** – Primary recommendation for retail users.
- **WalletConnect v2** – Enables Ledger, Rainbow, and OKX wallets to connect.
- **Custodial API Keys** – Available for institutional partners via managed sub-accounts.

### Session Flow

1. User initiates connect flow from the BETNB web app.
2. Wallet Gateway generates a nonce and prompts the user to sign.
3. Signed message establishes the session; token stored in secure HTTP-only cookie.
4. Session auto-renews every 15 minutes of activity.

### Security Layers

- **MPC Signing:** Platform treasury wallets leverage multi-party computation to avoid single-point private keys.
- **Rate Limiting:** Wallet Gateway throttles authentication attempts (max 10/minute per IP).
- **Device Fingerprinting:** Optional friction for new devices to mitigate credential stuffing.
- **Geo Restrictions:** Certain jurisdictions flagged; access requires enhanced due diligence.

### Incident Response

- Immediate actions:
  - Pause withdrawals via admin circuit breaker.
  - Revoke compromised API keys using Wallet Gateway tooling.
  - Notify affected users through in-app banners and email alerts.
- Post-incident:
  - Perform root-cause analysis with security and infrastructure teams.
  - Publish transparency report within 72 hours.
  - Update threat models and penetration testing scope.

### Compliance

- SOC 2 Type II certification in progress; quarterly audits with external partners.
- KYC vendor: Sumsub; liveness checks and document verification.
- PEP / sanctions screening runs nightly.

> **Reminder:** Encourage users to enable hardware wallet support when trading large sizes. The Wallet Gateway seamlessly supports Ledger devices through WalletConnect v2.

## Integrations & Partnerships

BETNB extends beyond the core trading interface through APIs, widgets, and data distribution channels.

### API Overview

- **REST Trading API** – Place/cancel orders, view positions, pull market metadata.
- **WebSocket Feed** – Real-time trades, order book updates, and settlement events.
- **Insights API** – Aggregated statistics for analysts and downstream dashboards.
- **Admin API** – Restricted endpoints for listings, circuit breakers, and treasury moves.

### Partner Programs

| Program                  | Target                        | Benefits                          | Requirements                                 |
| ------------------------ | ----------------------------- | --------------------------------- | -------------------------------------------- |
| **Affiliate Network**    | Content creators, communities | Revenue share on taker fees       | KYC, minimum user activity thresholds        |
| **Liquidity Specialist** | Market makers, funds          | Reduced fees, vault incentives    | Provide baseline liquidity, weekly reporting |
| **Data Distributor**     | Quant firms, media            | High-throughput feeds, SLA-backed | Signed data sharing agreement                |

### Integration Checklist

1. Request API credentials via partner desk.
2. Complete KYC / compliance onboarding.
3. Review rate limits and error handling guidelines.
4. Implement sandbox integration; run automated regression pack.
5. Schedule go-live certification with operations team.

### Reporting & Analytics

- Daily partner report emailed with volume, fee share, and referral metrics.
- API endpoints available for real-time dashboards (`/partner/metrics`).
- Quarterly reviews with Strategic Partnerships to adjust incentives.

### Offboarding Procedure

- Partners submit exit request with 7-day notice.
- Access tokens revoked and data subscriptions sunset.
- Treasury reconciles outstanding incentives; marketing removes public listings.

> **Tip:** Encourage affiliates to embed the BETNB market widget. It pulls live prices and supports deep-link trading flows, increasing conversion while providing transparency.

## Appendix

Complementary resources, reference tables, and operational contacts.

### SLA Summary

| Function       | SLA           | Escalation                |
| -------------- | ------------- | ------------------------- |
| Trading Core   | 99.95% uptime | PagerDuty `TRD-ONCALL`    |
| Oracle Router  | 99.9% uptime  | PagerDuty `DATA-ONCALL`   |
| Wallet Gateway | 99.9% uptime  | PagerDuty `WALLET-ONCALL` |

### Contact Directory

- **Operations Bridge:** `ops@betnb.exchange`
- **Security Hotline:** `security@betnb.exchange`
- **Partnerships Desk:** `partners@betnb.exchange`
- **Incident Bridge:** `https://status.betnb.exchange`

### Document Revisions

| Version | Date       | Author   | Notes                                                      |
| ------- | ---------- | -------- | ---------------------------------------------------------- |
| 0.2.0   | 2024-04-05 | Ops Docs | Added trading & settlement details, integrations programs. |
| 0.1.0   | 2024-03-12 | Founders | Initial draft for GitBook import.                          |

### Glossary

- **AMM:** Automated Market Maker powering instant trades and passive liquidity.
- **Circuit Breaker:** Mechanism to halt trading when volatility or oracle issues occur.
- **Dispute Window:** Post-resolution period to raise challenges before settlement finalizes.
- **LP:** Liquidity Provider supplying capital to the market.

### Related Links

- Product Roadmap (Notion) – Internal only.
- Incident Runbooks – Stored in PagerDuty knowledge base.
- Brand Assets – See Marketing drive for logos and typography guidance.

> **Reminder:** Update the Document Revisions table whenever significant process or policy changes occur. Maintaining a clear audit trail is a regulatory requirement.
