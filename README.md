# POLITEHNICA București — Platformă Modernă

Revamp modern al platformei oficiale [upb.ro](https://upb.ro), construit cu Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion și React Three Fiber.

## Caracteristici

- **Design premium** — glassmorphism unificat, tipografie Rubik, animații fluide
- **Multilingv** — Română (implicit) și Engleză via `next-intl`
- **Dark/Light mode** — comutare temă cu `next-themes`
- **3D Hero** — tocă de absolvire 3D animată (React Three Fiber)
- **Arhitectură scalabilă** — servicii abstracte pentru CMS/DAM viitor
- **Performanță** — Server Components by default, lazy loading pentru 3D
- **Docker** — build multi-stage pentru producție
- **CI/CD** — GitHub Actions (lint, typecheck, build)

## Stack Tehnologic

| Tehnologie | Rol |
|---|---|
| Next.js 16 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animații UI |
| React Three Fiber | Scene 3D |
| next-intl | Internaționalizare |
| CVA + clsx + tailwind-merge | Design system |
| Docker + Makefile | Containerizare & DX |

## Structură Proiect

```
src/
├── app/                    # Rute App Router
│   └── [locale]/           # Rute localizate (ro, en)
├── components/
│   ├── ui/                 # Primitive UI (Button, GlassCard, Badge)
│   ├── layout/             # Header, Footer, navigare
│   ├── sections/           # Secțiuni homepage
│   ├── animations/         # FadeInView, Stagger, Counter
│   └── 3d/                 # Scene Three.js
├── services/               # CMS/DAM adapters
├── data/mock/              # Date mock (temporar)
├── i18n/                   # Mesaje ro/en
├── types/                  # Tipuri domain
└── config/                 # Configurare app
```

## Comenzi Rapide

### Cu Makefile

```bash
make install      # Instalează dependențe
make dev          # Server dezvoltare (http://localhost:3000)
make build        # Build producție
make start        # Pornește server producție
make prod         # Build + start
make lint         # ESLint
make typecheck    # Verificare TypeScript
make format       # Prettier
make clean        # Curăță .next și node_modules
make docker-build # Build imagine Docker
make docker-up    # Pornește container producție
make docker-down  # Oprește containere
make docker-dev   # Dezvoltare în Docker
```

### Cu npm

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Variabile de Mediu

Copiază `.env.example` în `.env.local`:

```bash
cp .env.example .env.local
```

| Variabilă | Descriere | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL public site | `http://localhost:3000` |
| `CONTENT_PROVIDER` | Provider conținut | `mock` |
| `MEDIA_PROVIDER` | Provider media | `mock` |

## Docker

**Producție:**
```bash
make docker-build
make docker-up
```

**Dezvoltare:**
```bash
make docker-dev
```

## Pagini

| Rută | Descriere |
|---|---|
| `/ro` | Homepage în română |
| `/en` | Homepage în engleză |

## Secțiuni Homepage

1. **Hero** — layout cinematic, fundal animat, CTA-uri, statistici glass
2. **3D Graduation Cap** — tocă de absolvire 3D rotativă
3. **Buletin Anunțuri** — filtrare pe tag-uri, carduri glass
4. **Facultăți** — 12 facultăți cu carduri interactive
5. **Evenimente** — festivaluri și conferințe academice
6. **Statistici** — contoare animate
7. **Footer** — footer instituțional multi-coloană

## Cursor Agent Rules

Reguli AI în `.cursor/rules/` pentru:
- Arhitectură, componente, design system
- Accesibilitate, animații, performanță
- i18n, styling, Docker, deployment
- SEO, securitate, CMS/DAM integration

## Integrări Viitoare

Proiectul este pregătit pentru:
- **CMS** — Strapi, Sanity (via `ContentService` adapter)
- **DAM** — Cloudinary, Imgix (via `MediaService` adapter)
- **Autentificare** — route groups `(admin)`
- **News/Events** — servicii abstracte existente

## Licență

Proiect demonstrativ pentru UNSTPB / POLITEHNICA București.
