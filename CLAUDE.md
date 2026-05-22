# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Claude Code Quiz** — a True/False web quiz about Claude Code, targeting business professionals and managers. Full spec is in [prd.md](prd.md).

Stack: React 18 + Vite, Tailwind CSS v3, React Router v6, Supabase (Auth + PostgreSQL + Realtime), deploy on Vercel.

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server (Vite)
npm run build        # production build
npm run preview      # preview production build locally
```

## Environment

Copy `.env.example` to `.env.local` and fill in:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Architecture

### Pages and routing (`/src/pages/`)

Four pages wired via React Router v6:
- `/` → `Home.jsx` — welcome screen + login gate (user must authenticate to play)
- `/quiz` → `Quiz.jsx` — main quiz flow, 15 sequential questions
- `/result` → `Result.jsx` — final score + auto-save to Supabase
- `/leaderboard` → `Leaderboard.jsx` — global ranking with Supabase Realtime

### State management

No external state library. Quiz state lives in the `useQuiz` hook (`src/hooks/useQuiz.js`), timer in `useTimer.js`, auth session in `useAuth.js`. These hooks are consumed directly by the page components.

### Data

Questions are static — a plain JS array in `src/data/questions.js`. Each question has `{ id, level, statement, answer, explanation }`. The 15 questions are ordered: 5 `"iniciante"` → 5 `"intermediário"` → 5 `"avançado"`. Do not reorder them.

### Supabase integration

`src/lib/supabase.js` initializes and exports the Supabase client. Auth is email/password (Supabase Auth). The `scores` table stores per-attempt results; the `leaderboard` view returns the best score per user. RLS is enabled — only authenticated users can insert their own scores.

### Design tokens

Tailwind is extended with the Anthropic/Claude color palette. Key tokens:
- `primary`: `#D97757` (coral orange) — CTAs, timer above 8s
- `success`: `#16A34A`, `error`: `#DC2626` — answer feedback
- Level badges: blue (iniciante), amber (intermediário), purple (avançado)

The timer is an SVG circle with `stroke-dasharray` animation; it changes color at 8s (amber) and 4s (red).

### Score rules

Correct answer within 20s = +1. Wrong or timeout = 0. No negatives. Only the highest score per user is shown in the leaderboard (enforced by the `leaderboard` view via `DISTINCT ON`).
