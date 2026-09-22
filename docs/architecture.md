# Architecture

Heim is a static Astro site.
Alchemy publishes the generated files as assets in one Cloudflare Worker.
The production system has no database or application server.

## Source layout

| Path | Responsibility |
|---|---|
| `src/content.config.ts` | Schemas for projects, posts, and now entries |
| `src/content/` | Markdown content that Astro loads during the build |
| `src/pages/` | Static routes and build-time content queries |
| `src/layouts/Base.astro` | HTML shell, metadata, fonts, and global styles |
| `src/components/` | Astro components and the two React islands |
| `src/lib/tags.ts` | Tag slug and display-name registry |
| `src/styles/globals.css` | Design tokens and shared visual rules |
| `astro.config.mjs` | React, sitemap, Tailwind, and canonical-site configuration |
| `alchemy.run.ts` | Cloudflare Worker, asset, and custom-domain resources |

## Content model

`src/content.config.ts` is the schema source.
Astro stops the build when Markdown frontmatter does not match these schemas.

| Collection | Required fields | Optional fields |
|---|---|---|
| `projects` | `name`, `description`, `year`, `tags`, `order` | `featured`, `url` |
| `posts` | `title`, `excerpt`, `publishedAt`, `tags` | `status` |
| `now` | `date`, `content`, `tags` | `linkedPost` |

Published posts use the Markdown body as article content.
Project and now entries use frontmatter only.
Tag slugs resolve through `src/lib/tags.ts`.

## Routes

| Route | Source |
|---|---|
| `/` | `src/pages/index.astro` |
| `/about` | `src/pages/about.astro` |
| `/projects` | `src/pages/projects.astro` |
| `/writing` | `src/pages/writing/index.astro` |
| `/writing/<slug>` | `src/pages/writing/[slug].astro` |
| `/now` | `src/pages/now.astro` |
| `/tags` | `src/pages/tags/index.astro` |
| `/tags/<slug>` | `src/pages/tags/[slug].astro` |
| `/404` | `src/pages/404.astro` |

Astro creates these routes during the build.
The canonical site is `https://me.phibkro.org`.
The sitemap and page metadata use that value.

## Browser code

Most components render static HTML.
`MobileMenu.tsx` and `NowFeed.tsx` are the only React islands.
Both use `client:load` because their controls need browser state.

`NowFeed` stores its tag and sort state in URL query parameters.
This makes filtered views linkable and preserves browser navigation.

## Deployment boundary

Run `bun run dev` for the complete local Worker path.
Run `bun run check` before a release.
Inspect `bun run plan` before any production change.
Run `bun run deploy` only with operator approval.

The repository owns the Worker and `me.phibkro.org` custom domain.
The homelab does not build, route, or serve Heim.
