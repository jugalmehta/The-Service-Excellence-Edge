# Service Excellence Edge — Website (Next.js)

A 10-page Next.js 15 site built with TypeScript, Tailwind CSS, and Framer Motion,
designed for deployment on Vercel.

## Stack

- **Next.js 15.5.24** (App Router) — pinned to this exact version because it is the
  latest patched release in the 15.x line as of writing (it fixes a critical RCE,
  CVE-2025-66478, and two follow-up vulnerabilities disclosed December 11, 2025).
  **Do not downgrade `next` in `package.json` without checking
  [nextjs.org/blog](https://nextjs.org/blog) for newer security releases first.**
- **React 19.1+**
- **Tailwind CSS 3** for styling (design tokens in `tailwind.config.ts`)
- **Framer Motion** for the hero workflow animation, the framework roadmap, and menu
  transitions
- **lucide-react** for icons

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, capability matrix, service/agent/framework previews, case studies, CTA |
| `/about` | About SEE — mission, vision, why SEE, founder expertise |
| `/services` | 16 services split AI Transformation / IT Service Excellence |
| `/ai-agents` | 12 AI agents + interactive ticket-triage demo |
| `/workflow-automation` | Before/after automation examples + platform integrations |
| `/it-service-management` | ITIL lifecycle modules + interactive maturity assessment |
| `/ai-transformation-framework` | Animated 5-stage framework roadmap |
| `/enterprise-ai-capabilities` | Capability grid + integrations |
| `/case-studies` | 4 detailed case studies |
| `/contact` | Contact form (see "Wiring the contact form" below) |

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Building and running production locally

```bash
npm run build
npm run start
```

## Deploying to Vercel

**Option A — Vercel dashboard**
1. Push this project to a Git repository (GitHub/GitLab/Bitbucket).
2. In Vercel, "Add New… → Project" and import the repo.
3. Framework preset: Vercel auto-detects Next.js — no configuration needed.
4. Deploy.

**Option B — Vercel CLI**
```bash
npm i -g vercel
vercel --prod
```

## Wiring the contact form

The form at `/contact` posts to `app/api/contact/route.ts`, which currently
**validates and logs submissions but does not send email** — there is no email
provider configured yet. Before launch:

1. Sign up for a transactional email provider — [Resend](https://resend.com) is the
   simplest fit for Vercel/Next.js.
2. `npm install resend`
3. Add `RESEND_API_KEY` to your Vercel project's Environment Variables.
4. Uncomment and complete the send call in `app/api/contact/route.ts` (the TODO is
   marked clearly in that file).

## Editing content

Nearly all copy — services, AI agents, workflow examples, ITIL modules, framework
stages, capabilities, case studies, contact form options — lives in one file:
**`lib/content.ts`**. Edit the arrays there rather than hunting through each page.

Icons are looked up by name from **`lib/icons.tsx`**; add a new lucide-react icon
there if `content.ts` references one that isn't mapped yet.

## Design tokens

Color, gradient, and shadow tokens are defined in `tailwind.config.ts`
(`colors`, `backgroundImage`, `boxShadow`). Glassmorphism utility classes
(`.glass-panel`, `.glass-panel-dark`) live in `app/globals.css`.

The typeface is the native system font stack (`-apple-system` / San Francisco on
Apple devices, sensible fallbacks elsewhere) — no web font files or external font
requests are used.

## SEO

Metadata, keywords (English + German), and Open Graph tags are set in
`app/layout.tsx` and per-page `metadata` exports. An `alternates.languages` entry
points to `/de` for a future German version — that route doesn't exist yet; add it
when you're ready to localize.

## What's not yet done

- **German translation** — the architecture is German-ready (metadata references
  `/de`), but no German page content exists yet.
- **Email delivery** — see "Wiring the contact form" above.
- **Legal pages** — no privacy policy / Impressum is included; a German GmbH
  typically needs one.
- **Analytics** — no analytics/tag manager is wired in.
