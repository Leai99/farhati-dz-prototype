# Farhati DZ — Interactive Prototype

**Farhati DZ** is an Algerian digital platform for organizing all kinds of events (not weddings only) — this repo is a clickable, front-end-only interactive prototype of it, built as a graduation project and as supporting material for a "Label" program application. The priority at this stage is UX/UI quality and a professional, navigable feel, not a production backend.

## Tech stack

- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4** for the design system (colors/fonts wired in as design tokens — see `src/styles/tokens.ts`)
- **React Router v7** for navigation between screens
- **Mock data only** (`src/mock-data/`) — no real API, no database; all interactions (booking, login, moderation, …) are visually simulated
- Full RTL Arabic layout throughout

## The three apps

This one codebase contains three separate front ends sharing the same design system:

| App | Entry point | Who it's for |
|---|---|---|
| **Customer App** | `/` (splash → onboarding → login → …) | People planning an event, browsing and booking services |
| **Service Provider App** | reached from `/choose-account-type` → "مقدّم خدمة" (Service Provider), or directly at `/provider-app/dashboard` | Businesses listing services and managing booking requests |
| **Admin App** | reached via the small, low-contrast **"Admin"** text link at the bottom of the `/login` screen (or directly at `/admin`, which redirects to `/admin/overview`) | Platform staff — users, providers, content moderation, activity log, stats |

Every `/admin/*` screen shows a thin gold-tinted notice bar confirming this — the Admin app has no real access control in this prototype, so that link is intentionally its only gate.

## Deliberate assumptions & simplifications

Called out here in one place rather than scattered as comments, so it's clear what's a conscious prototype-stage decision and not an oversight:

- **No real authentication anywhere.** Login, sign-up, and logout all just redirect between screens; there's no session, no password check against anything real.
- **The Admin app has no real access gate.** It's reachable only through a small, unobtrusive link on the Login screen — there's no login flow, role check, or permission system in front of it.
- **"My Event" reuses the Favorites store.** There's no separate event-builder yet; whatever a customer has saved to Favorites is what shows up as "My Event" and its estimated budget.
- **No cross-app data sync.** Edits a Service Provider makes (adding/editing a service, accepting/declining a request) and decisions an Admin makes (approving/flagging content, suspending a user) do **not** flow back into what a Customer sees — each app reads its own data source independently rather than one shared backend state.
- **Favorites is the only state that persists** (saved to `localStorage`). Everything else — services added/edited as a provider, request statuses, moderation decisions, profile edits — lives only in memory for that session and resets on page refresh.
- **Provider Profile folds together Profile, Notifications, and Settings** into one screen, since each would otherwise be a very thin screen (a language switch, one toggle) on its own.
- **The language switcher (Arabic/French/English) is visual only** — it doesn't actually translate any content.
- Ratings, review counts, and most stats shown are static mock data; only the Provider Dashboard and Admin Overview tiles genuinely recompute live from whatever's changed in the current session.

## Running it locally

```bash
npm install
npm run dev      # starts the Vite dev server (http://localhost:5173)
npm run build    # type-checks (tsc -b) and produces a production build in dist/
```
