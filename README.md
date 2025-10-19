## UmbraMarkets

UmbraMarkets is a dark-pool inspired prediction exchange experience tuned for the BNB Chain ecosystem. The demo ships as a polished, self-contained product surface that mirrors the institutional desk narrative without relying on production services.

- 📘 Documentation lives at `/docs` and captures the UmbraMarkets playbook, data model, and operations guidance.
- Curated home experience with hero markets, liquidity pulse, and live event feed.
- Markets catalogue featuring sortable tables, category filters, and detail screens with liquidity vitals.
- Portfolio, insights, and leaderboard routes showcasing balances, analytics, and trader stories.
- Wallet connection flow that simulates popular providers without touching real funds.

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
