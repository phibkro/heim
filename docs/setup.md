# Setup
## heim/apps/portfolio

Run these commands in order. Do not write files that a generator would produce — run the generator first, read what it produces, then build on top.

---

## Scaffolding Commands

```bash
# 1. Monorepo
npx create-turbo@latest heim --package-manager bun
cd heim

# 2. Next.js app
cd apps
bunx create-next-app@latest portfolio --typescript --tailwind --app --use-bun --no-src-dir
cd portfolio

# 3. Payload CMS (into the existing Next.js app)
bunx create-payload-app@latest --no-examples
# select: Blank template, use existing Next.js app

# 4. shadcn
bunx shadcn@latest init
# select: TypeScript, App Router, no default styles, CSS variables

# 5. @heim/ui shared package (from repo root)
cd ../..
npx turbo gen workspace --name @heim/ui --type package
```

After each command, read the generated files before continuing.

---

## Build Order

Work in this order — each step depends on the previous.

1. **Scaffold** — run all commands above, confirm dev server starts and Payload admin loads at `/admin`
2. **Payload collections** — Tags, Posts, Projects, NowEntries; confirm they appear in admin
3. **`globals.css`** — full token spec from `docs/design-system.md`; install fonts via `next/font`
4. **`@heim/ui` components** — all blueprint components per `docs/design-system.md` interfaces
5. **Layout** — Header, Footer, MobileMenu
6. **Homepage** — static, no data fetching
7. **Projects page**
8. **Writing list page**
9. **Writing detail page** — Lexical rich text render
10. **Now page** — server fetch + client filter/sort
11. **Tags index** — `/tags`
12. **Tag detail page** — `/tags/[slug]`, unified cross-collection feed
13. **Revalidation webhook** — on-demand ISR
14. **PostHog** — see `docs/references.md` for official docs
15. **Seed data** — add placeholder content in Payload admin so every page renders
