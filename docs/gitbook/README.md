# BETNB Documentation

Welcome to the official BETNB documentation set. This guide explains how the prediction exchange operates, the data flows that power pricing, and the controls that keep user funds and positions secure.

Use the navigation on the left (or the `SUMMARY.md` file if importing into GitBook) to jump into any section. Each page is written for product, risk, and integration teams to shorten onboarding time.

> **Release:** v0.9.0 (October 2025)
>
> **Audience:** Internal operators, liquidity partners, market makers, and compliance stakeholders.

## Quick Reference

- **Trading hours:** 24/7, markets settle when the referenced oracle posts a final value.
- **Collateral:** BNB and BUSD test collateral with deterministic pricing curves.
- **Oracle latency:** Median 46 seconds for sports; 18 seconds for crypto feeds.
- **Support:** docs@betnb.exchange (routes to triage channel).

## How to Use These Docs

1. Start with the [Platform Overview](platform/overview.md) to learn the core modules.
2. Review the [Market Lifecycle](markets/lifecycle.md) to understand creation, resolution, and dispute windows.
3. When ready to integrate, jump to [Trading & Settlement](trading/settlement.md) for order flow expectations.
4. Liquidity providers should study [Liquidity & Fees](liquidity/pool-economics.md) to model incentives.
5. Wallet, security, and compliance requirements live under [Wallet & Security](wallet/security.md).
6. External developers should grab API specs in [Integrations](integrations/partners.md).

Each chapter closes with operational checklists and escalation contacts so teams can act quickly during incidents.
