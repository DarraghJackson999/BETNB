# Platform Overview

BETNB is a venue for binary outcome prediction markets optimised for the BNB Chain. The platform marries an automated market maker (AMM) core with curated event onboarding to deliver tight spreads and rapid time-to-listing.

## Core Services

| Service             | Description                                                                           | Owner           | SLA                 |
| ------------------- | ------------------------------------------------------------------------------------- | --------------- | ------------------- |
| **Match Engine**    | Processes limit/market orders, runs order-matching checks, and coordinates AMM fills. | Trading Systems | 50 ms p95           |
| **Liquidity Vault** | Multi-asset pool that provides two-sided liquidity using sigmoid bonding curves.      | Liquidity Ops   | 99.95% availability |
| **Oracle Router**   | Pulls resolution data from Chainlink, Pyth, and first-party scrapers.                 | Data Integrity  | 2 min failover      |
| **Risk Guardian**   | Sandboxed worker that validates price impact, margin, and suspicious activity.        | Risk & Controls | Real-time           |
| **Wallet Gateway**  | Handles Phantom and WalletConnect session handshakes, relays signed transactions.     | Wallet Core     | 200 ms p95          |

## Environment Matrix

| Environment    | RPC Endpoint                         | Explorer                              | Notes                                                         |
| -------------- | ------------------------------------ | ------------------------------------- | ------------------------------------------------------------- |
| **Production** | `https://rpc.betnb.exchange`         | `https://scan.betnb.exchange`         | Backed by three geo-distributed validator nodes.              |
| **Staging**    | `https://rpc.staging.betnb.exchange` | `https://scan.staging.betnb.exchange` | Reset weekly. Contains synthetic data for regression testing. |
| **Sandbox**    | `https://sandbox-rpc.betnb.exchange` | n/a                                   | Local validator with deterministic block times for QA.        |

## Governance Model

- **Listing Committee:** Reviews new market proposals daily. Requires three-of-five multi-sig to activate.
- **Risk Council:** Can pause trading or adjust fees during high-volatility events. Maintains a runbook for each asset class.
- **Treasury Stewards:** Manage liquidity mining budgets, affiliate payments, and buyback programs.

## Operational Cadence

- **Daily** – Market launch stand-up, oracle health check, liquidity rebalancing snapshot.
- **Weekly** – Incident review, fee revenue reconciliation, partner sentiment scan.
- **Monthly** – Treasury report, roadmap checkpoint, compliance / KYC audit trail verification.

## Control Surfaces

1. **Admin Console:** Web dashboard with circuit breaker toggles, fee sliders, and oracle override tools.
2. **CLI Toolkit:** Scripts for importing historical market data, seeding liquidity, and backfilling order books.
3. **Observability Suite:** Grafana dashboards, Loki log scrapers, and PagerDuty runbooks for automated escalation.

> **Tip:** Ensure on-call engineers have access to both the Admin Console and CLI Toolkit. During an outage the runbook requires toggling circuit breakers and injecting manual oracle values within five minutes.
