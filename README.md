## BETNB

BETNB is a Polymarket-inspired prediction exchange experience tuned for the BNB Chain ecosystem. The UI showcases:

- Realistic market catalogue with categories (politics, crypto, macro, sports, and more)
- Rich market detail views featuring pricing charts, liquidity vitals, and contextual news
- Interactive portfolio dashboard with simulated balances, PnL, and exposure analytics
- Wallet connection flow that mimics popular providers without touching real funds

The app ships with mock market, position, and balance data stored locally under `src/lib/data` to keep the experience vivid while remaining self-contained.

## Stack

- Next.js App Router (TypeScript)
- Tailwind CSS v4 (inline theme tokens)
- shadcn/ui-inspired primitives (buttons, cards, tables, tabs)
- Recharts for price and PnL visualisations
- Husky & lint-staged for pre-commit quality gates

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the experience. The header navigation links to the portfolio, insights, and leaderboard screens. Markets under `/markets/[slug]` are statically generated from the mock dataset.

## Quality Tooling

- `npm run lint` – Next.js + ESLint checks (0 warnings enforced)
- `npm run lint:fix` – Autofix lint issues via ESLint
- `npm run typecheck` – TypeScript project validation
- `npm run format` / `npm run format:check` – Prettier formatting helpers

Husky runs `lint-staged` on each commit, applying ESLint + Prettier fixes to staged files.

## Project Structure Highlights

- `src/app` – App Router routes and page layouts
- `src/components` – Reusable UI and market widgets
- `src/lib/data` – Mock JSON data powering the interface
- `src/lib/utils.ts` – Helper utilities for formatting and class merging

## Notes

- The wallet connection dialog is an intentional simulation for demo purposes.
- Charts and figures are derived from local mock data; wire to live feeds when integrating blockchain or backend services.
