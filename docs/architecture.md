# Architecture
## heim/apps/portfolio

---

## Payload Collections

Define in `apps/portfolio/collections/`. Each file exports a `CollectionConfig`.

### Tags
```ts
slug: 'tags'
fields:
  - name: string, required, unique
  - slug: string, required, unique (auto-generated from name via beforeValidate hook)
admin:
  useAsTitle: 'name'
```

Shared across Posts, Projects, and NowEntries. One collection, many relations.

### Posts
```ts
slug: 'posts'
fields:
  - title: string, required
  - slug: string, required, unique (auto-generated from title)
  - content: richText (Lexical)
  - excerpt: textarea
  - publishedAt: date, required
  - tags: relationship → Tags, hasMany: true
  - status: select ['draft', 'published'], defaultValue: 'draft'
admin:
  useAsTitle: 'title'
  defaultColumns: ['title', 'status', 'publishedAt', 'tags']
access:
  read: ({ req }) => req.user ? true : { status: { equals: 'published' } }
```

### Projects
```ts
slug: 'projects'
fields:
  - name: string, required
  - slug: string, required, unique
  - description: textarea, required
  - longDescription: richText (optional)
  - url: text (optional)
  - repoUrl: text (optional)
  - year: number, required
  - featured: checkbox, defaultValue: false
  - tags: relationship → Tags, hasMany: true
  - order: number (manual sort)
admin:
  useAsTitle: 'name'
  defaultColumns: ['name', 'year', 'featured', 'tags']
```

### NowEntries
```ts
slug: 'now-entries'
fields:
  - content: textarea, required (~200 chars max)
  - date: date, required
  - tags: relationship → Tags, hasMany: true
  - linkedPost: relationship → Posts, hasMany: false (optional)
defaultSort: '-date'
admin:
  useAsTitle: 'content'
  defaultColumns: ['content', 'date', 'tags']
```

---

## Routes & Rendering

```
/                  → ISR, revalidate: 3600
/projects          → ISR + on-demand revalidation
/writing           → ISR + on-demand revalidation
/writing/[slug]    → ISR per post + on-demand revalidation
/now               → ISR, revalidate: 60
/tags              → ISR + on-demand revalidation
/tags/[slug]       → ISR + on-demand revalidation, generateStaticParams for known tags
```

---

## On-demand Revalidation

`apps/portfolio/app/(payload)/api/revalidate/route.ts`

Protected by `REVALIDATE_SECRET` request header. Called from Payload `afterChange` hooks on all collections. Calls `revalidatePath()` for affected routes.

---

## Data Fetching

Use Payload's local API in server components — never the REST API.

```ts
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

// fetch published posts
const posts = await payload.find({
  collection: 'posts',
  where: { status: { equals: 'published' } },
  sort: '-publishedAt',
  depth: 1,  // resolves tag relations (name + slug only)
})
```

Always pass `depth: 1` for tag relations. Always filter `status: 'published'` on Posts from frontend routes.

---

## Tag System

`/tags/[slug]` queries all collections in parallel and merges results into a unified feed.

```ts
const [posts, projects, nowEntries] = await Promise.all([
  payload.find({
    collection: 'posts',
    where: { 'tags.slug': { equals: slug }, status: { equals: 'published' } },
    depth: 1,
  }),
  payload.find({
    collection: 'projects',
    where: { 'tags.slug': { equals: slug } },
    depth: 1,
  }),
  payload.find({
    collection: 'now-entries',
    where: { 'tags.slug': { equals: slug } },
    depth: 1,
  }),
])
```

Merge, sort by date, render with a type badge (post / project / now).

---

## Now Page — Client-side Filtering

Fetch all NowEntries server-side, pass to a client component. Filter state in URL query params:

- `?tags=agents,fp` — comma-separated active tags (multi-select)
- `?sort=asc` or `?sort=desc` (default `desc`)

Use `useSearchParams` + `useRouter` — not `useState` — so filters are shareable and back button works.

---

## Rich Text

```tsx
import { RichText } from '@payloadcms/richtext-lexical/react'

<div className="prose">
  <RichText data={post.content} />
</div>
```

Override Tailwind Typography's default prose colors in `globals.css` to match design tokens.

---

## App Router File Structure

```
app/
  (frontend)/
    layout.tsx            ← globals.css, Header, Footer
    page.tsx              ← homepage
    projects/page.tsx
    writing/
      page.tsx
      [slug]/page.tsx
    now/page.tsx
    tags/
      page.tsx
      [slug]/page.tsx
  (payload)/
    admin/[[...segments]]/page.tsx
    api/
      [...payload]/route.ts
      revalidate/route.ts

collections/
  Tags.ts
  Posts.ts
  Projects.ts
  NowEntries.ts

payload.config.ts
```
