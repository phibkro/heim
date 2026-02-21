# CLAUDE.md
## heim — Philip Bjørknes Krogh

Read this file first. For detailed specs, read the relevant doc in `docs/` before starting that part of the work.

**Critical rule: always run scaffolding/generator commands before writing files from scratch.** If a CLI can generate it, use the CLI.

---

## Docs

| Doc | Read when |
|---|---|
| `docs/setup.md` | Starting the project for the first time |
| `docs/architecture.md` | Building any route, data fetching, or collection |
| `docs/design-system.md` | Building any UI component or page |
| `docs/references.md` | Looking up official docs for any tool |
| `docs/prototype.html` | Visual ground truth — open this whenever building UI |

---

## Stack

Turborepo monorepo · bun · Next.js 15 (App Router) · Payload CMS 3.x · Neon (PostgreSQL) · Tailwind v4 · shadcn/ui · PostHog · Vercel

---

## Monorepo Layout

```
heim/
  apps/
    portfolio/        ← Next.js + Payload site
  packages/
    ui/               ← @heim/ui, shared blueprint design system
    tsconfig/         ← @heim/tsconfig
    eslint-config/    ← @heim/eslint-config
```

---

## Component Locations

| Location | What lives there |
|---|---|
| `packages/ui/src/components/` | Blueprint design system components (`@heim/ui`) |
| `apps/portfolio/components/ui/` | shadcn generated — run `bunx shadcn add <x>` |
| `apps/portfolio/components/layout/` | Header, Footer, MobileMenu |
| `apps/portfolio/components/providers/` | PostHogProvider |

---

## Conventions

- TypeScript strict — no `any`, no unsafe casts
- `'use client'` only when you need interactivity or browser APIs
- All borders `1px dashed` — never solid, never `border-solid`
- No `rounded-*` utilities — `--radius: 0` handles it globally
- `next/font` for fonts — not `<link>` tags
- `next/image` for all images
- Payload admin at `/admin` — do not change
- All `@heim/ui` components accept a `className` prop
- Colocate types with their collection definitions
- Formatter: oxfmt — runs on save/edit hooks, do not configure manually
- Linter: oxlint — runs on save/edit hooks, do not configure manually

---

## Commands

- `bun run dev` — start dev server (turbo)
- `bun run check-types` — typecheck all packages (turbo)
- `cd apps/portfolio && bun -e "import c from './payload.config'; import {generateTypes} from 'payload/node'; await generateTypes(await c); process.exit(0)"` — regenerate Payload types (`payload generate:types` CLI doesn't resolve .ts imports)
- `bunx shadcn add <component>` — add shadcn component (run from `apps/portfolio/`)

---

## Gotchas

- Payload config accepts `DATABASE_URI` or `DATABASE_URL` (Neon's Vercel integration sets `DATABASE_URL`)
- Payload `defaultSort` is a top-level CollectionConfig property, not under `admin`
- Client components using `useSearchParams` must be wrapped in `<Suspense>`
- `next.config.ts` "turbopack" warning is from `withPayload` — safe to ignore
- React/React-dom hoisted to monorepo root; `@heim/ui` uses `peerDependencies`
- Next.js must stay in Payload's supported range (currently 16.2.0-canary.x or 15.2.x)

---

## Payload Collections

| Collection | Slug | Key fields |
|---|---|---|
| Tags | `tags` | name (unique), slug (auto-gen) |
| Posts | `posts` | title, slug, content (richText), excerpt, publishedAt, tags, status |
| Projects | `projects` | name, slug, description, longDescription (richText), url, repoUrl, year, featured, tags, order |
| NowEntries | `now-entries` | content (max 200), date, tags, linkedPost |

All collections have `afterChange` hooks for on-demand ISR via `/api/revalidate`.

---

## Environment Variables

```bash
# apps/portfolio/.env.local
DATABASE_URI=
PAYLOAD_SECRET=
REVALIDATE_SECRET=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```
