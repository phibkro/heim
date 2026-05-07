# CLAUDE.md
## heim — Philip Bjørknes Krogh

Read this file first. For detailed specs, read the relevant doc in `docs/` before starting that part of the work.

**Critical rule: always run scaffolding/generator commands before writing files from scratch.** If a CLI can generate it, use the CLI.

---

## Docs

| Doc | Read when |
|---|---|
| `docs/setup.md` | Starting the project for the first time |
| `docs/architecture.md` | Building any route or content collection (NOTE: pre-Astro, treat as stale until rewritten) |
| `docs/design-system.md` | Building any UI component or page |
| `docs/references.md` | Looking up official docs for any tool |
| `docs/prototype.html` | Visual ground truth — open this whenever building UI |

---

## Stack

Astro · bun · Tailwind v4 · React (islands only — `MobileMenu`, `NowFeed`) · markdown content collections · static dist (homelab-served)

Migrated from Turborepo + Next.js 16 + Payload + Postgres (`astro-migration` branch). Reasons: (a) operator likes writing markdown, (b) static output drops the entire runtime + DB dependency tree, (c) the bun-build-then-darkhttpd-serve pattern is the proven shape on the homelab. The Postgres `heim` DB + role from the prior attempt are orphaned and should be dropped manually:

```
sudo -u postgres dropdb heim && sudo -u postgres dropuser heim
```

---

## Layout

```
heim/
├── astro.config.mjs
├── package.json            # astro, @astrojs/react, @tailwindcss/vite, react, typescript
├── tsconfig.json
├── public/                 # static assets (favicon)
└── src/
    ├── content.config.ts   # Astro Content Collections schemas
    ├── content/
    │   ├── projects/       # one .md per project (frontmatter-only)
    │   ├── posts/          # one .md per writing post (frontmatter + body)
    │   └── now/            # one .md per /now entry (frontmatter-only)
    ├── layouts/
    │   └── Base.astro      # html shell + fonts + globals.css
    ├── pages/
    │   ├── index.astro     # home (hero)
    │   ├── about.astro
    │   ├── projects.astro
    │   ├── writing/
    │   │   ├── index.astro
    │   │   └── [slug].astro    # markdown body via getStaticPaths
    │   ├── now.astro       # mounts NowFeed React island
    │   ├── tags/
    │   │   ├── index.astro
    │   │   └── [slug].astro    # static-rendered tag detail
    │   └── 404.astro
    ├── components/
    │   ├── Header.astro
    │   ├── MobileMenu.tsx       # React island (client:load)
    │   ├── NowFeed.tsx          # React island (filter + sort, URL-param sync)
    │   ├── ScrollReveal.astro   # vanilla IntersectionObserver via <script>
    │   └── ui/                  # 6 Blueprint components, all .astro
    │       ├── AnnotationLabel.astro
    │       ├── CrosshairTarget.astro
    │       ├── RowItem.astro
    │       ├── SectionHeader.astro
    │       ├── SpecBlock.astro
    │       └── Tag.astro
    ├── lib/
    │   └── tags.ts         # tag slug → display name registry
    └── styles/
        └── globals.css     # Tailwind v4 @import + @theme + @layer base
```

---

## Conventions

- TypeScript strict — no `any`, no unsafe casts
- Astro components by default. React only for islands (interactive bits the page must hydrate). Each island opts in via `client:load` / `client:visible`.
- Tags are referenced from frontmatter by slug (`"typescript"`); display name lookup via `lib/tags.ts`
- Content authoring: edit/add `.md` files in `src/content/<collection>/`; frontmatter shape enforced by zod schemas in `content.config.ts`
- All borders `1px dashed` — never solid, never `border-solid`
- No `rounded-*` utilities — `--radius: 0` handles it globally
- Colocate types with their collection schemas (`content.config.ts`)
- Formatter: oxfmt — runs on save/edit hooks, do not configure manually
- Linter: oxlint — runs on save/edit hooks, do not configure manually

---

## Commands

- `bun install` — install deps
- `bun run dev` — start dev server
- `bun run build` — build to `./dist/`
- `bun run preview` — preview the built dist locally
- `bun run astro check` — Astro's type-check pass

---

## Adding content

- **New project**: drop a `.md` in `src/content/projects/`. Frontmatter requires `name`, `description`, `year`, `featured`, `tags`, `order`, optional `url`.
- **New writing post**: drop a `.md` in `src/content/posts/`. Frontmatter requires `title`, `excerpt`, `publishedAt`, `tags`, `status` (`draft`|`published`). Body is the post content (markdown).
- **New /now entry**: drop a `.md` in `src/content/now/`. Frontmatter requires `date`, `content`, `tags`, optional `linkedPost` (a writing post's filename without the `.md`).
- **New tag**: add an entry to `TAG_DISPLAY` in `src/lib/tags.ts`. Frontmatter then references the slug. The `/tags/[slug]` page renders the tag's items automatically.

---

## Homelab deploy

Served at `https://heim.nori.lan` from workstation. The homelab module at `phibkro/homelab:modules/server/heim.nix` runs `bun install + bun run build` on `just deploy-app heim`, then publishes the resulting `dist/` to `/var/lib/heim/dist` for darkhttpd to serve. Atomic publish (write to `dist.new`, swap, clean up).
