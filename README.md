# Service Excellence Edge GmbH — Website

A fully static website (plain HTML/CSS/JS — no React, no Node.js, no build
step required). Every page is a self-contained `.html` file that links to
the shared `styles.css` and `script.js`.

## Files

```
index.html          Home
services.html        Services (all 12 services, grouped by the capability matrix)
ai-agents.html        AI Agents (5 agent profiles)
case-studies.html     Case Studies (4 full write-ups)
pricing.html          Pricing (3 tiers + FAQ)
contact.html          Contact (form + direct contact details)
styles.css            Shared stylesheet (design tokens, layout, components)
script.js             Shared behaviour (mobile nav, scroll reveal, contact form)
assets/logo.png        Full logo lockup (used in the footer)
assets/logo-mark.png    Compact logo mark (used in the header)
vercel.json           Optional config for deploying on Vercel
```

## Deploy to Vercel

**Option A — Vercel dashboard (no CLI needed)**
1. Go to vercel.com → **Add New… → Project**.
2. Choose **"Deploy without Git"** / drag-and-drop, and upload this whole
   folder (or the zip, unzipped).
3. Framework preset: choose **"Other"** — no build command, no output
   directory override needed. Vercel will serve the static files as-is.
4. Click **Deploy**.

**Option B — Vercel CLI**
```bash
npm i -g vercel
cd path/to/this/folder
vercel --prod
```
No `build` step is needed since there's no framework — Vercel will detect
and serve the static files directly.

## Deploy to any other static host

This is a plain static site, so it works unchanged on Netlify, GitHub
Pages, Cloudflare Pages, an S3 + CloudFront bucket, or a normal shared
web host — just upload all the files (keeping them in the same folder,
flat, as-is) so that the relative links between pages continue to work.

## Before you launch

- **Contact form**: `contact.html` currently falls back to opening the
  visitor's email client (`mailto:`) when submitted, since a static site
  has no backend to receive form data. To collect submissions properly,
  sign up for a form service (e.g. Formspree, Netlify Forms, Getform) and
  replace `REPLACE_WITH_YOUR_FORM_ENDPOINT` in the `data-endpoint`
  attribute of the `<form id="contact-form">` element in `contact.html`
  with your real endpoint URL and `method="POST"` action.
- **Email address**: replace `hello@serviceexcellenceedge.com` (used in
  the footer, contact page, and `script.js` mailto fallback) with your
  real inbox if different.
- **Fonts**: the site uses the native system font stack (`-apple-system` /
  San Francisco on Apple devices, with sensible fallbacks elsewhere) —
  the same approach Apple's own site uses. No web font files or
  external font requests are needed.
- **Legal pages**: no privacy policy / imprint page is included yet —
  add one if required for your jurisdiction (a German GmbH typically
  needs an *Impressum*).

## Editing content

There's no build process — just edit the HTML files directly. Each page
repeats the same header/footer markup; if you change the navigation or
footer, update it in all six `.html` files.
