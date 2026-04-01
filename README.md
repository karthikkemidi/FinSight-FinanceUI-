# Finance Dashboard UI

A responsive finance dashboard built with React, Vite, TypeScript, Tailwind/shadcn, and Recharts. It showcases a clean UI, role-based controls (viewer/admin), transaction management, insights, and export-ready mock data. Everything runs fully on the frontend with local storage persistence.

## Features
- Summary cards for balance, income, and expenses.
- Time-series and categorical visuals (balance trend, spending breakdown).
- Transactions table with search, filter, sort, and admin-only add/edit/delete.
- Role switcher (viewer vs admin) with guarded actions.
- Insights for top spend, balance growth, and expense trend.
- CSV export and one-click data reset to seeded mock data.
- Local storage persistence for role and transactions, responsive layout, and empty states.

## Getting Started
```bash
# install deps
npm install

# run dev server
npm run dev

# lint
npm run lint

# tests (vitest)
npm test
```

Open the dev URL shown in the terminal. Switch roles via the header toggle; admin can add/edit/delete transactions. Use Export CSV to download current transactions and Reset Data to restore the seeded mock set.

## Notes & Assumptions
- Mock data is local; no backend required.  
- Charts use mocked monthly trend data plus live transaction breakdowns.  
- Local storage may be cleared anytime to start fresh.  
- No third-party branding or watermarks are present.  Implementation uses only OSS dependencies.  

## Project Structure
- `src/pages`: Dashboard (`Index`) and 404.  
- `src/components/dashboard`: Cards, charts, insights, role switcher, transactions table.  
- `src/components/ui`: shadcn/ui primitives.  
- `src/data`: Types, mock transactions, monthly series.  
- `src/hooks`: Local storage helper.  

## Next Enhancements (optional)
- Light/dark toggle using the existing design tokens.  
- Import from CSV/JSON, richer filters (date range/category), and grouping.  
- Mock API layer with latency to exercise React Query.  
- Animations for table interactions and chart transitions.  
