# Liquidity & Fees

BETNB uses a concentric bonding curve design to keep bid-ask spreads tight while rewarding LPs for inventory risk.

## Pool Composition

- **Collateral Basket:** 70% USDC, 30% BNB stables (auto-rebalanced daily).
- **Bonding Curve:** Sigmoid function with dynamic slope adjustments based on volatility.
- **Inventory Buckets:**
  - Core liquidity (protocol-owned)
  - Community vault (LPs staking liquidity shares)
  - Partner managed lines (institutional market makers)

## Incentives

| Program             | Duration      | Reward Token | Notes                                                           |
| ------------------- | ------------- | ------------ | --------------------------------------------------------------- |
| **Vault Yield**     | Continuous    | BETNB        | Distributed pro-rata based on time-weighted liquidity.          |
| **Depth Boosters**  | Weekly epochs | USDC         | Bonus for markets with low initial depth.                       |
| **Affiliate Split** | Monthly       | BETNB & USDC | Portion of trading fees returned to takers brought by partners. |

## Fee Distribution

1. Taker fees enter Treasury smart contract.
2. Contract streams 60% to liquidity providers, 30% to Treasury reserves, 10% to affiliate pool.
3. Settlement fees cover oracle costs and dispute arbitrage.

## Risk Controls

- Dynamic fee escalator widens spreads when volatility > 3σ.
- Exposure caps enforced per market to prevent concentrated inventory.
- Liquidity Vault rebalances inventory whenever delta > 15% from neutral.

## Monitoring Metrics

- **Utilisation Ratio:** Filled volume vs. available liquidity.
- **Fee APR:** Annualized yield for LPs (displayed in Portfolio dashboard).
- **Inventory Imbalance:** Tracks skew across YES/NO outcomes.

## Off-boarding Liquidity

- LPs queue withdrawals with a 24-hour cooldown.
- Emergency withdrawal enabled when protocol health score < 0.7.
- Liquidity Vault publishes state snapshots to IPFS for transparency.

> **Note:** Liquidity events should be announced in the live feed so traders can anticipate spread changes. Coordinate with Marketing and Treasury before executing major rebalances.
