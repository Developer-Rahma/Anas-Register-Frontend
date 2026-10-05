# Anas Registration

An Arabic-first frontend for registering local activities in Fayoum and reviewing demo records in a browser-local admin view.

## Run & Operate

- `pnpm dev` — run the Next.js frontend
- `pnpm run typecheck` — typecheck the frontend
- `pnpm run build` — create the static export in `out/`
- No API, database, or required application secrets; demo records stay in browser storage.

## Stack

- Next.js App Router, React, TypeScript, and a single root-level `package.json`
- Static export for deployment; browser `localStorage` holds demo registrations and admin status changes
- CSS is organized in the app source; no utility-CSS build pipeline is required

## Where things live

- `src/app/` — App Router pages and root layout
- `src/features/registration/` — landing, registration wizard, confirmation, and browser-local data
- `src/features/records/` — demo admin records dashboard
- `src/shared/` — reusable modal and privacy notice
- `public/` — static assets

## Architecture decisions

- Feature folders are source organization only; dependencies and scripts belong to the root manifest.
- Static export is intentional: there is no separate API or server-side data layer.

## Product

The app lets users register a local activity through a four-step Arabic form, see a confirmation, and explore sample/admin records stored only in the browser.

## User preferences

- Keep this as one frontend Next.js + TypeScript app with one root `package.json` and feature-based folders.
- Do not add an API or database; retain browser-local demo behavior.

## Gotchas

- Browser storage must only be read after hydration or from user events so exported routes remain safe to render.

## Pointers

