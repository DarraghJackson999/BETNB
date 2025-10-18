# Trading & Settlement

This section explains how orders flow through the system and how positions settle after resolution.

## Order Types

| Type                   | Description                                                                     | Typical Use Case                           |
| ---------------------- | ------------------------------------------------------------------------------- | ------------------------------------------ |
| **Instant (AMM) Fill** | Executes against pool liquidity at current implied probability.                 | Retail traders seeking immediate exposure. |
| **Limit Order**        | Books a price level on the order book; fills when the market crosses the quote. | Market makers and advanced traders.        |
| **Stop Trigger**       | Converts to market order when the implied probability passes a threshold.       | Risk management hedges.                    |
| **Range Order**        | Adds range-bound liquidity via the AMM bonding curve.                           | Passive LPs deploying capital for fees.    |

## Margin & Exposure

- Positions are fully collateralized in USDC or BNB.
- Max leverage: 3x notional for whitelisted partners (collateral held in escrow).
- Exposure caps enforced by Risk Guardian per market.
- Unrealized PnL settles to the wallet gateway every block for portfolio tracking.

## Fee Model

- **Taker Fee:** 35 bps, discounted to 20 bps for accounts staking BETNB governance tokens.
- **Maker Rebate:** 10 bps credited to LP vault after fill confirmation.
- **Settlement Fee:** 5 bps applied on winning payouts to cover oracle costs.
- Fees stream into Treasury, then redistributed weekly to LPs and governance pool.

## Matching Pipeline

1. Order submitted via web app or API.
2. Wallet Gateway signs and forwards to Match Engine.
3. Risk Guardian evaluates price impact, collateral sufficiency, and AML heuristics.
4. Orders that pass validation either match against book or route to AMM.
5. Trade confirmation emitted to WebSocket feed and recorded on-chain.

## Settlement Process

- Once a market is `RESOLVED`, payout instructions generate automatically.
- Smart contracts transfer winnings and return unused collateral.
- Positions flip to `CLOSED`; historical data gets archived to the Insights warehouse.
- Disputed settlements route to Operations for manual overrides using Admin Console tools.

## Failure Handling

- **On-chain Failures:** Retries with exponential backoff; if still failing, alerts the on-call engineer.
- **Oracle Discrepancy:** Settlement paused, dispute window extended, pushes notification to compliance.
- **Stuck Orders:** Automatically cancelled if unfilled for 72 hours unless flagged as strategic liquidity.

> **Best Practice:** Encourage traders to confirm wallet balances post-settlement. The Wallet Gateway broadcasts an event but clients should refresh session state to avoid stale UI data.
