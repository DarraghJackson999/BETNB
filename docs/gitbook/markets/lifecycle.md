# Market Lifecycle

Each BETNB market progresses through clearly defined states. Understanding these states helps operations teams coordinate listings, liquidity, and settlement tasks.

## 1. Intake

- **Trigger:** Proposal submitted via Admin Console or API.
- **Checklist:**
  - Event summary (<140 characters)
  - Resolution criteria with data source hierarchy
  - Proposed trading halt time and settlement buffer
  - Liquidity seed (min 5,000 USDC or equivalent)
- **Outputs:** Market ID reserved, slug created, and due diligence ticket opened in Jira.

## 2. Vetting

- KYC / compliance screening on proposers
- Oracle coverage validation (Chainlink primary, Pyth backup)
- Legal sign-off for jurisdictions with restrictions
- Risk Council computes max exposure cap and leverage limits

## 3. Activation

- Liquidity Vault deposits two-sided inventory
- Risk Guardian publishes guard-rails (price bounds, max order size)
- Match Engine toggled to `OPEN`
- Marketing automation schedules announcement in live feed

## 4. Live Trading

- Continuous double auction augmented by AMM depth
- Maker/taker fees applied per [Liquidity & Fees](../liquidity/pool-economics.md)
- Oracle Router publishes indicative prices every 12 seconds
- Circuit breakers:
  - Volatility halt: ±35% move within 5 minutes
  - Data freeze: Oracle update lag >90 seconds

## 5. Halt

- Trigger events:
  - Scheduled halt time
  - Manual halt via Risk Council
  - Automatic due to breaker thresholds
- Liquidity Vault stops quoting new ranges but honours close orders
- Oracle Router finalizes last trusted price snapshot

## 6. Resolution

1. Oracle Router fetches official outcome from the primary feed
2. Risk Guardian cross-checks with backup feeds and manual reports
3. Dispute window (30 minutes) opens for integrity team
4. Once confirmed, Market status flips to `RESOLVED`

## 7. Settlement

- Payout engine processes winning positions on-chain
- Rebates for makers and affiliates executed
- Treasury books fee revenue and liquidity provider rebates
- Post-mortem: Market metrics logged to data warehouse for insights

## State Diagram

```
INTAKE -> VETTING -> ACTIVATION -> LIVE -> HALT -> RESOLUTION -> SETTLEMENT -> ARCHIVED
          ^                                         |
          |-----------------------------------------|
```

> **Reminder:** Never skip the dispute window. Even self-evident outcomes require the integrity sign-off to maintain Chainlink SLA compliance.
