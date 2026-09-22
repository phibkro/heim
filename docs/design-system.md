# Design system

Heim uses a blueprint-style dark interface.
The runtime source is `src/styles/globals.css` and the components under `src/components/`.
The file `docs/prototype.html` is a historical visual reference.
It is not a source for routes, content, or current technology choices.

## Visual rules

Keep these rules in new components:

- Use sharp corners.
- Use dashed borders for structural divisions.
- Use the dot grid as the page background.
- Use IBM Plex Mono for body text.
- Use Bebas Neue for display headings.
- Use the blue accent for focus, hover, and status emphasis.
- Keep text readable against the dark background.

Do not copy token values into components.
Use the custom properties from `globals.css`.

| Token | Purpose |
|---|---|
| `--bg` | Page background |
| `--bg2` | Elevated surface |
| `--fg` | Primary text |
| `--muted` | Secondary text |
| `--dim` | Tertiary labels |
| `--accent` | Primary accent |
| `--accent2` | Hover accent |
| `--line` | Subtle dashed rule |
| `--line-strong` | Strong dashed rule |

Tailwind maps its semantic colors to these custom properties.
The global radius is zero.

## Components

| Component | Responsibility |
|---|---|
| `Header.astro` | Shared site navigation |
| `MobileMenu.tsx` | Interactive mobile navigation |
| `NowFeed.tsx` | Tag filtering and date sorting |
| `ScrollReveal.astro` | Progressive reveal behavior |
| `ui/AnnotationLabel.astro` | Small technical annotation |
| `ui/CrosshairTarget.astro` | Crosshair interaction frame |
| `ui/RowItem.astro` | Indexed content row |
| `ui/SectionHeader.astro` | Numbered section heading |
| `ui/SpecBlock.astro` | Labeled specification block |
| `ui/Tag.astro` | Shared tag presentation |

Reuse these components before you create another visual mechanism.
Use Astro by default.
Use React only when the browser must own interactive state.

## Layout

The shared page shell limits content with `--max-w`.
The desktop layout uses the indexed left column from `--col-index`.
Responsive rules remove decorative detail before they reduce readability.

Keep the existing hierarchy:

1. Display heading
2. Section number and title
3. Content rows or specification blocks
4. Dim metadata and annotations

## Accessibility

Use semantic links, buttons, headings, and lists.
Keep a visible focus state for every control.
Do not use color as the only status indicator.
Keep interactive targets usable at narrow viewport widths.
Respect reduced-motion preferences in new motion effects.

## Change procedure

1. Change shared tokens in `src/styles/globals.css`.
2. Change shared structure in `src/components/`.
3. Use page-local classes only for page-specific layout.
4. Run `bun run check`.
5. Inspect the changed page at desktop and mobile widths.
