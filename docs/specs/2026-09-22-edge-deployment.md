# Deploy Heim at the Cloudflare edge

Frozen: yes
Revision: 2026-09-22. The deployment disables the additional `workers.dev`
route.


## Goal

Serve Heim from Cloudflare without a home-server dependency.
Preserve the static site and its public domain.

## Contract

- `me.phibkro.org` serves the Astro output as Worker static assets.
- The deployment uploads no application server bundle.
- Alchemy owns the asset deployment and custom domain.
- Local commands use the `development` stage. Plan and deploy commands use the `production` stage.
- The Worker is publicly reachable only through `me.phibkro.org`.
- The repository owns its source, build, release, and rollback procedures.
- The homelab removes its Heim runtime only after production acceptance.

## Constraints

- Do not add a database or runtime API.
- Do not create a local MicroVM.
- Do not deploy from CI in this change.
- Do not change the site content or public URL.
- Do not replace Astro.

## Acceptance

1. Install dependencies from the committed lock file.
2. Run the Astro type check and static build.
3. With operator approval, bootstrap or upgrade the Alchemy state store if required, then inspect the plan without deploying service resources.
4. Make sure that the plan creates an assets-only deployment.
5. Make sure that the Worker disables its `workers.dev` route.
6. Transfer the hostname from the Tunnel route to the Worker in a controlled cutover.
7. Make sure that `me.phibkro.org` serves the complete site.
8. Make sure that the generated sitemap uses the canonical domain.
9. Make sure that rollback can restore the previous Cloudflare deployment.

Steps 3 and 6 through 9 require operator-approved provider changes.
