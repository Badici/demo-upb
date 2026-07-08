# UNST Politehnica București

Next.js (App Router) + [Payload CMS](https://payloadcms.com) with PostgreSQL, multilingual (RO/EN) frontend, and dark/light theme.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Payload 3** headless CMS (admin at `/admin`, REST/GraphQL under `/api`)
- **PostgreSQL** via `@payloadcms/db-postgres`
- **next-intl** for i18n — locales `ro` (default) and `en`, prefixed routes (`/ro`, `/en`)
- **next-themes** for dark/light mode (class strategy)
- **Tailwind CSS v4**
- **Rubik** font via `next/font`

## Getting started

1. Copy env and set a secret:
   ```bash
   cp .env.example .env
   # PAYLOAD_SECRET is required — generate one with:
   openssl rand -hex 32
   ```
2. Start PostgreSQL (Docker):
   ```bash
   docker compose up -d
   ```
3. Install deps and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open:
   - Frontend: http://localhost:3000 (redirects to `/ro`)
   - Payload admin: http://localhost:3000/admin (create the first user)

## Project structure

```
src/
  app/
    (frontend)/[locale]/   # Public, localized site (layout, globals.css, pages)
    (payload)/             # Payload admin + API (not localized)
  collections/             # Payload collections (Users, Media)
  components/              # UI components (theme toggle, locale switcher, ...)
  i18n/                    # next-intl routing, navigation, request config
  lib/                     # fonts, cn() helper
  providers/               # ThemeProvider
  payload.config.ts        # Payload configuration
messages/                  # ro.json, en.json translation catalogs
```

## Useful scripts

- `npm run dev` — start dev server
- `npm run build` / `npm start` — production build / serve
- `npm run generate:types` — regenerate `src/payload-types.ts` from collections
- `npm run generate:importmap` — regenerate Payload admin import map
- `npm run lint` — ESLint
