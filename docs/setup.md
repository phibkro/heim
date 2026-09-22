# Setup

Heim is a static Astro site.
Alchemy builds the site and publishes the output as Cloudflare Worker assets.
The production deployment has no application server or database.

## Local development

```sh
bun install --frozen-lockfile
bun run dev
```

Run the complete local check before a commit:

```sh
bun run check
```

The check runs Astro diagnostics, the deployment type check, and the static build.

## Production deployment

Production changes require operator approval and a Cloudflare profile with Worker access.
CI checks the repository but does not deploy it.

The first plan can bootstrap or upgrade the shared `alchemy-state-store` Worker.
That is a provider mutation and is part of the required approval.

```sh
bun install --frozen-lockfile
bun run check
bun run plan
bun run deploy
```

Inspect the plan before deployment.
The plan must contain an assets-only Worker for `me.phibkro.org`.
It must not add a database or an application server bundle.

The Cloudflare cutover completed on September 22, 2026. The public hostname and
static assets now belong to this repository's Worker. No Tunnel, Caddy route,
or homelab runtime remains in the release path.

## Rollback

Use a clean worktree at the last known-good revision. Install its lock file, run
its checks, inspect `bun run plan`, and run `bun run deploy` only after operator
approval. Verify the complete site and generated sitemap.

Do not use `alchemy destroy` as a rollback command. The former Tunnel and
homelab runtime are cutover history, not available fallback infrastructure.
