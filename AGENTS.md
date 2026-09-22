<!-- generated-by: foundry@v1 -->

# AGENTS.md — project contract

Generated boilerplate from `homelab/foundry/profile-v1` (single source:
homelab/docs/PROJECTS.md, "Project conventions contract"). Hand edits here are
flagged as drift by `conventions-check`; record real divergences in
`.conventions-exceptions` instead.

## Contract

- **Mission state:** `STATE.md` is the single mission-state file. It declares a
  lifecycle — `idea | spec | spec-frozen | build | park | archive` — plus
  Now / Next / Blocked. Agents read it first; keep it current.
- **Agent doc:** this file is THE agent doc. Where a harness wants CLAUDE.md,
  it is a symlink to AGENTS.md. Never a second prose copy.
- **Specs:** design work lives in `docs/specs/`. Lifecycle ≥ spec requires
  that directory to exist.
- **Lifecycle gates:** idea → spec → spec-frozen → build → park → archive, one
  executable gate per transition (defined in the conventions contract).
  spec-frozen additionally requires `Frozen: yes` in STATE.md.
- **Checks:** `just check` is the repository's declared verification gate.
  `just conventions-check` detects convention drift. The project-specific section
  names the exact tools. Both gates must pass before merge.

## PROJECT-SPECIFIC (replace this section)

- Runtime and package manager: Bun, Astro, Tailwind CSS v4, and React only for interactive islands. Alchemy v2 publishes the static output as Cloudflare Worker assets.
- Verification: `just check` runs Astro diagnostics, deployment type checking, and the static build.
- Content: edit Markdown under `src/content/{projects,posts,now}`. `src/content.config.ts` owns the accepted frontmatter schemas; `src/lib/tags.ts` owns tag display names.
- UI: preserve the blueprint visual language in `src/styles/globals.css` and existing components—sharp corners, dashed structural borders, dot grid, monospace body, and display headings. `docs/prototype.html` is historical design reference, not runtime source.
- Public contract: `me.phibkro.org` is an assets-only Cloudflare Worker. There is no database, application server, Tunnel route, or homelab runtime.
- Deployment: inspect `bun run plan`, then use `bun run deploy` only with operator approval. CI checks; it does not deploy.
