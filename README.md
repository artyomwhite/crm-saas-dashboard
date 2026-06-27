# CRM SaaS Dashboard

A clean, modern CRM dashboard MVP built with Next.js — perfect for portfolio and client demos.

## Features

- **Dashboard** — stats cards (clients, deals, tasks) + recent activity feed
- **Clients** — searchable table with add/edit/delete
- **Deals** — Kanban board (Lead → Negotiation → Won/Lost) with stage navigation
- **Tasks** — checklist with add/toggle/delete
- **Settings** — editable mock user profile

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Mock data + localStorage persistence (no backend)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/dashboard`.

## Deploy on Vercel

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Deploy — no env variables required

```bash
npm run build
```

## Project Structure

```
src/
├── app/           # Pages (dashboard, clients, deals, tasks, settings)
├── components/    # UI + layout components
├── context/       # CRM state provider
└── lib/           # Types, mock data, localStorage helpers
```

## License

MIT
