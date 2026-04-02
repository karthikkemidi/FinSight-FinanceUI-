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

## Submission Notes (Assignment Form)

### Primary Framework or Library Used
- React.js with TypeScript

### Features Implemented
- Dashboard Overview with Summary Cards
- Time Based Visualization (Monthly Balance Trend)
- Categorical Visualization (Spending Breakdown)
- Transaction List with Details
- Transaction Filtering
- Transaction Sorting and Search
- Role Based UI (Viewer and Admin)
- Insights Section
- State Management (React state + localStorage + React Query)
- Responsive Design

### Technical Decisions and Trade-offs
- Chose React + TypeScript + Vite for fast development speed, type safety, and clean component architecture.
- Used Tailwind and reusable UI primitives for consistent styling and responsive behavior.
- Used a hybrid state strategy:
	- Local component state for UI concerns (tabs, filters, sorting, forms).
	- localStorage-backed state for persisted role and transactions.
	- React Query with a mock API to simulate async data loading and realistic frontend flow.
- Simulated role-based behavior on the frontend (viewer/admin) without backend auth to stay aligned with assignment scope.
- Kept data frontend-only with mock + persistence to prioritize UX, interaction quality, and component design over backend complexity.
- Added CSV and JSON export plus CSV/JSON import to improve practicality while keeping implementation lightweight.

### Additional Notes
- This project is intentionally frontend-focused and uses mock/local persistence rather than a production backend.
- Role behaviors are enforced in UI interactions: viewer is read-only, admin can add/edit/delete/import.
- The dashboard includes empty-state handling for charts and transaction views.
- Data persists across reloads via localStorage.
- Theming supports light/dark modes.
- Recent improvements made for submission quality:
	- Fixed transaction hydration logic so local edits are not overwritten after initial load.
	- Added JSON export alongside CSV export.
	- Added a quick analytics strip (active records, top spending category, net position).
	- Added clear-filters control and filtered-result count in Transactions.

### Known Limitations / Next Improvements
- Test coverage is basic and can be expanded (role behavior, CRUD flows, filtering/sorting correctness).
- Bundle size can be optimized using code-splitting for heavier sections.
- CSV parsing is intentionally simple and can be enhanced to handle quoted commas and stricter validation.
- Accessibility can be improved further with broader keyboard-navigation and ARIA refinements.
