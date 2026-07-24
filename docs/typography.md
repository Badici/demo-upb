# Typography system

Scoped primarily to **Second Homepage Type 2** (`/[locale]/second-homepage-type2`), with shared tokens available project-wide via `globals.css`.

## Font families

| Role | Family | CSS variable | Notes |
| --- | --- | --- | --- |
| Display / major headings | Oswald | `--shp-display` | Blueprint identity |
| Body / UI | Libre Franklin | `--shp-body` | Romanian `latin-ext` |
| Labels / coords | IBM Plex Mono | `--shp-mono` | Intentional 3rd-family exception |

Loaded with `next/font` in `src/features/second-homepage-type2/fonts.ts` (weights actually used only).

Main site continues to use **Rubik** (`--font-rubik`).

## Semantic roles

| Role | Class | Typical element |
| --- | --- | --- |
| Display | `shp2-text-display` | Hero `h1` |
| Page title | `shp2-text-page-title` | Page `h1` |
| Section title | `shp2-text-section-title` | Section `h2` |
| Subsection title | `shp2-text-subsection-title` | `h3` |
| Card title | `shp2-text-card-title` | Card `h3` |
| Eyebrow | `shp2-text-eyebrow` / `shp-marker` | Overline |
| Lead | `shp2-text-lead` | Intro paragraph |
| Body | `shp2-text-body` | Paragraph |
| Small body | `shp2-text-body-sm` | Supporting copy |
| Caption / meta | `shp2-text-caption` / `shp2-text-meta` | Figcaptions, plate labels |
| Label | `shp2-text-label` | Form / UI labels |
| Helper | `shp2-text-helper` | Helper text |

Component API:

```tsx
import { Typography } from "@/components/second-homepage-type2/typography";

<Typography as="h2" variant="sectionTitle">
  Faculties
</Typography>

<Typography variant="lead" measure="narrow">
  Discover our centres…
</Typography>
```

`as` stays independent from `variant` so semantics are preserved.

## Scale (fluid)

```css
--font-display: clamp(2.75rem, 1.85rem + 3.2vw, 5.5rem);
--font-h1: clamp(2.35rem, 1.75rem + 2.4vw, 4.25rem);
--font-h2: clamp(1.875rem, 1.55rem + 1.4vw, 3.25rem);
--font-h3: clamp(1.5rem, 1.3rem + 0.85vw, 2.25rem);
--font-body-large: clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem);
--font-body: 1rem;
--font-body-small: 0.875rem;
--font-caption: 0.75rem;
```

## Line height

- Display / H1: ~`1.05–1.1`
- H2: `--leading-heading` (`1.15`)
- Body: `--leading-body` (`1.6`) — never below `1.5` for long-form
- Buttons / nav: ~`1.3`

## Measures

- Hero display: `--measure-hero` (`14ch`)
- Headings: `--measure-heading` (`22ch`)
- Lead: `--measure-narrow` (`45ch`)
- Body: `--measure-default` (`65ch`)

## Correct usage

```tsx
<h2 className="shp2-text-section-title">Events</h2>
<p className="shp2-text-lead">Short section intro…</p>
```

## Incorrect usage

```tsx
// ❌ arbitrary micro type
<p className="text-[0.58rem] leading-[1.1]">…</p>

// ❌ heading level chosen for size
<div className="text-5xl font-bold">Section</div>

// ❌ multiple H1s
```

## Accessibility

- Body ≥ 16px (`1rem`)
- Supporting text ≥ 14px (`0.875rem`)
- Avoid text &lt; 12px (`0.75rem`)
- WCAG AA contrast on paper/ink palette
- Text remains resizable; no fixed-height text boxes
- Respect `prefers-reduced-motion` for animated type

## Intentional exceptions

1. **IBM Plex Mono** as a third family for blueprint plate labels.
2. **Uppercase display headings** retained for architectural identity.
3. Original `/second-homepage` keeps its previous typography until explicitly migrated.
