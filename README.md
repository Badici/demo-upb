# UNST Politehnica București — Homepage Demo

Static **Second Homepage Type 2** demo for Vercel free tier. No Payload, no database — all content is hardcoded.

## Quick start

```bash
npm install
npm run dev
```

- Site: http://localhost:3000 → `/ro`
- English: http://localhost:3000/en

## Deploy on Vercel

1. Push this repo and import it in Vercel.
2. Set env var `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://your-app.vercel.app`).
3. Framework preset: **Next.js** (default). No database or blob storage needed.

## Stack

- Next.js 16 (App Router) + React 19
- next-intl (RO/EN)
- Tailwind CSS v4 + Motion
- Hardcoded demo data in `src/data/homepage.ts`
- Static assets under `public/demo/`
