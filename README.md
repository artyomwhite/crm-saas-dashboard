# CRM SaaS Dashboard

**A production-style CRM product simulation** — built to mirror how real startup SaaS teams ship client-facing business software.

This is not a tutorial demo. It is a fully navigable CRM workspace with dashboard analytics, client management, deal pipeline, task tracking, and user settings — the core modules every B2B SaaS CRM needs on day one.

---

## What This Product Simulates

A lightweight CRM platform for sales teams who need one place to:

- Monitor pipeline health at a glance
- Manage client relationships
- Track deals through a sales funnel
- Stay on top of daily follow-ups

The experience is designed to feel like a **real MVP you'd ship to early customers** — clean UI, focused workflows, no clutter.

---

## Key Features

| Module | What it delivers |
|--------|------------------|
| **Dashboard** | Live KPIs — clients, active deals, open tasks — plus a recent activity feed |
| **Clients** | Searchable client directory with add, edit, and status management |
| **Deals** | Visual pipeline board — Lead → Negotiation → Won / Lost |
| **Tasks** | Action list with quick add, completion tracking, and cleanup |
| **Settings** | User profile workspace for account context |

Data persists in the browser via localStorage. No backend setup required.

---

## Business Value

Modern sales teams lose deals when information is scattered across spreadsheets, inboxes, and notes.

This CRM simulation demonstrates how a **unified workspace** solves that:

- **Visibility** — leadership sees pipeline and workload in one view
- **Consistency** — every client and deal follows the same workflow
- **Accountability** — tasks and activity create a clear audit trail
- **Speed** — focused UI means less friction, faster follow-ups

Built as a portfolio piece to show end-to-end product thinking: business logic, UX structure, and production-ready frontend engineering.

---

## Tech Stack

- **Next.js 16** — App Router, static-ready pages
- **TypeScript** — typed domain models and state
- **Tailwind CSS 4** — consistent design system
- **React Context + localStorage** — client-side state with persistence

No database. No API keys. Deploy anywhere in minutes.

---

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Redirects to dashboard |
| `/dashboard` | KPI overview and activity feed |
| `/clients` | Client directory and management |
| `/deals` | Sales pipeline board |
| `/tasks` | Task list and completion |
| `/settings` | User profile |

---

## Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — lands on `/dashboard`.

Production build:

```bash
npm run build
npm start
```

---

## Deploy on Vercel

1. Push this repo to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Deploy — **no environment variables required**

Zero-config. Production-ready out of the box.

---

## Project Structure

```
src/
├── app/           # Routes and page layouts
├── components/    # UI primitives and shell layout
├── context/       # Global CRM state
└── lib/           # Types, seed data, storage helpers
```

---

MIT License
