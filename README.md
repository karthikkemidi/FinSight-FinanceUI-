# FinSight — Finance Dashboard UI

A responsive finance dashboard built with React, Vite, TypeScript, Tailwind/shadcn, and Recharts. It delivers summary cards, charts, transactions with role-based controls, insights, CSV export, and localStorage persistence—all frontend-only, no backend.

## Key Features
- Dashboard overview: total balance, income, expenses with tabbed navigation (Overview vs Transactions).
- Visuals: monthly balance trend (area) and spending breakdown (pie) with hover highlight.
- Transactions: search, filter, sort; admin-only add/edit/delete/import (CSV/JSON); viewer is read-only; CSV export; reset to seeded data; shown on dedicated tab.
- Role switcher: viewer/admin toggle with guarded actions.
- Theming: light/dark toggle backed by design tokens.
- Insights: highest spending category, balance growth, expense trend.
- UX: responsive layout, empty states, tooltip theming, no external branding.

## Screens & Assets
- Main dashboard, charts, transactions, insights: run locally to view.
- Placeholder and favicon live in `public/` (`placeholder.svg`, `favicon.svg`). Replace with your own logos if desired.

## Getting Started
```bash
npm install          # install deps
npm run dev          # start dev server (default http://localhost:5173)
npm run lint         # lint (known fast-refresh warnings from shared UI exports)
npm test             # vitest suite
```

## Usage Notes
- Role toggle in header: switch to Admin to add/edit/delete transactions; Viewer is read-only.
- Export CSV downloads current transactions; Import CSV/JSON is available only in Admin; Reset Data restores seeded mock data.
- Data and role persist in localStorage; clear storage to start fresh.

## Project Structure
- `src/pages`: `Index` (dashboard), `NotFound`.
- `src/components/dashboard`: summary cards, charts, insights, role switcher, transactions table.
- `src/components/ui`: shadcn/ui primitives.
- `src/data`: types, mock transactions, monthly series.
- `src/hooks`: `useLocalStorage`.

## Assumptions
- Mock/local data only; no backend.
- Charts use static monthly series + live transaction breakdown.
- Design tokens/theme in `src/index.css`; no third-party watermarks.

## Optional Enhancements
- Mock API layer with React Query for latency simulation (seeds from localStorage/mocks).
- Extra animations for table/charts and deploy to Vercel/Netlify.
