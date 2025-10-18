# Wallet & Security

This guide outlines wallet support, security guarantees, and incident response procedures.

## Supported Wallets

- **Phantom (BNB Chain edition)** – Primary recommendation for retail users.
- **WalletConnect v2** – Enables Ledger, Rainbow, and OKX wallets to connect.
- **Custodial API Keys** – Available for institutional partners via managed sub-accounts.

## Session Flow

1. User initiates connect flow from BETNB web app.
2. Wallet Gateway generates a nonce and prompts the user to sign.
3. Signed message establishes the session; token stored in secure HTTP-only cookie.
4. Session auto-renews every 15 minutes of activity.

## Security Layers

- **MPC Signing:** Platform treasury wallets leverage multi-party computation to avoid single-point private keys.
- **Rate Limiting:** Wallet Gateway throttles authentication attempts (max 10/minute per IP).
- **Device Fingerprinting:** Optional friction for new devices to mitigate credential stuffing.
- **Geo Restrictions:** Certain jurisdictions flagged; access requires enhanced due diligence.

## Incident Response

- Immediate actions:
  - Pause withdrawals via admin circuit breaker.
  - Revoke compromised API keys using Wallet Gateway tooling.
  - Notify affected users through in-app banners and email alerts.
- Post-incident:
  - Perform root-cause analysis with security and infra teams.
  - Publish transparency report within 72 hours.
  - Update threat models and penetration testing scope.

## Compliance

- SOC 2 Type II certification in progress; quarterly audits with external partners.
- KYC vendor: Sumsub; liveness checks and document verification.
- PEP / sanctions screening runs nightly.

> **Reminder:** Encourage users to enable hardware wallet support when trading large sizes. The Wallet Gateway seamlessly supports Ledger devices through WalletConnect v2.
