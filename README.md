# ITSM Process Studio — standalone build

A click-through interview that generates a process map, SIPOC table, and RACI
matrix for standard ITIL/ITSM processes (Incident, Problem, Change, Request
Fulfillment, SLA, Knowledge, Release, Asset/Config Management).

This is the same app you saw as a Claude.ai artifact, packaged as a normal
Vite + React project so it can be deployed anywhere. The only change: the
Claude-artifact-only `window.storage` API has been replaced with a
`localStorage`-backed equivalent in `src/lib/storage.js`, so saved
interviews persist in the visitor's own browser instead of Claude's backend.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Deploy it

### Option A — Vercel (easiest)
1. Push this folder to a GitHub repo.
2. Go to vercel.com → "Add New Project" → import the repo.
3. Framework preset: Vite. Leave build command (`npm run build`) and output
   directory (`dist`) as default. Deploy.

### Option B — Netlify
1. Push this folder to a GitHub repo (or drag-and-drop the `dist/` folder
   after running `npm run build` into Netlify's manual deploy screen).
2. If connecting via Git: build command `npm run build`, publish directory
   `dist`.

### Option C — Any static host (GitHub Pages, S3, Cloudflare Pages, etc.)
```bash
npm run build
```
This produces a `dist/` folder — upload its contents to any static file
host. No server/backend is required; everything runs client-side.

## Notes on data persistence

- Data is stored in the visitor's browser (`localStorage`), scoped to this
  app. It is **not** shared across devices or browsers, and clearing browser
  data will remove it.
- If you want interviews shared across a team or persisted centrally,
  replace `src/lib/storage.js` with calls to a real backend (e.g. a small
  API + database, Supabase, or Firebase) — the rest of the app only calls
  `window.storage.get/set/delete/list`, so you only need to change that one
  file.

## Customizing content

All ITIL process definitions (activities, RACI assignments, SIPOC entries,
role options) live in the `PROCESSES` object near the top of `src/App.jsx`.
Edit there to match your organization's actual process design.
