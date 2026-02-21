# Design System Spec
## Philip Myrvang Portfolio

> Blueprint-themed dark UI. Technical drawing aesthetic — dot grids, dashed borders, measurement annotations, crosshair targets. Every element should feel like it belongs in an engineering diagram.

---

## `globals.css`

This is the source of truth for all design tokens. Shadcn reads from these CSS variables directly, so overriding them here themes the whole system — no component-level overrides required.

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* ── Fonts ── */
  --font-display: 'Bebas Neue', sans-serif;
  --font-mono:    'IBM Plex Mono', monospace;

  /* ── Shadcn semantic aliases → our tokens ── */
  --color-background:          var(--bg);
  --color-foreground:          var(--fg);
  --color-card:                var(--bg2);
  --color-card-foreground:     var(--fg);
  --color-popover:             var(--bg2);
  --color-popover-foreground:  var(--fg);
  --color-primary:             var(--accent);
  --color-primary-foreground:  var(--bg);
  --color-secondary:           var(--bg2);
  --color-secondary-foreground: var(--fg);
  --color-muted:               var(--bg2);
  --color-muted-foreground:    var(--muted);
  --color-accent:              var(--accent);
  --color-accent-foreground:   var(--bg);
  --color-destructive:         oklch(55% 0.22 25);
  --color-border:              var(--line-strong);
  --color-input:               var(--line-strong);
  --color-ring:                var(--accent);

  /* ── Radius ── */
  --radius: 0rem;  /* sharp corners throughout — override locally if ever needed */
}

@layer base {
  :root {
    /* ── Base palette (oklch) ──────────────────────────────────────
       oklch(lightness% chroma hue)
       Blueprint blue hue axis: ~215–220
    ─────────────────────────────────────────────────────────────── */
    --bg:      oklch(10% 0.015 220);  /* #080c10  page background              */
    --bg2:     oklch(13% 0.015 220);  /* #0c1118  elevated surface, cards       */
    --fg:      oklch(85% 0.025 210);  /* #c8d8e8  primary text                 */
    --muted:   oklch(42% 0.030 215);  /* #506070  secondary text, placeholders  */
    --dim:     oklch(30% 0.025 215);  /* #3a4a5a  tertiary, index nums, coords  */

    /* ── Accent ── */
    --accent:  oklch(58% 0.090 220);  /* #4a9abb  blueprint blue, primary       */
    --accent2: oklch(72% 0.090 215);  /* #7bc4e0  hover states, lighter accent  */

    /* ── Borders — oklch with alpha channel ── */
    --line:        oklch(58% 0.090 220 / 0.15);  /* subtle dashed border   */
    --line-strong: oklch(58% 0.090 220 / 0.30);  /* prominent dashed border */

    /* ── Status ── */
    --success: oklch(78% 0.18 145);   /* #4ade80  availability dot             */

    /* ── Layout constants ── */
    --header-h:  57px;
    --dot-size:  24px;
    --max-w:     1400px;
    --col-index: 56px;   /* left index column width in row layouts */
  }

  @media (max-width: 768px) {
    :root {
      --dot-size: 20px;
    }
  }

  * {
    border-color: var(--line-strong);
  }

  body {
    background-color: var(--bg);
    color: var(--fg);
    font-family: var(--font-mono);
    font-weight: 300;
  }

  /* ── Global dot grid background ── */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image: radial-gradient(
      circle,
      oklch(58% 0.090 220 / 0.18) 1px,
      transparent 1px
    );
    background-size: var(--dot-size) var(--dot-size);
  }

  /* ── Vignette — fades dot grid toward edges ── */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    background: radial-gradient(
      ellipse 80% 80% at 50% 50%,
      transparent 30%,
      var(--bg) 100%
    );
  }
}
```

> **`--radius: 0rem`** — shadcn uses `--radius` everywhere for border-radius. Zero gives sharp corners sitewide without touching individual components. Override locally with `rounded-sm` on the rare component that needs softening (e.g. a toast).

---

## Color Reference

| Token | oklch | Hex approx | Usage |
|---|---|---|---|
| `--bg` | `oklch(10% 0.015 220)` | `#080c10` | Page background |
| `--bg2` | `oklch(13% 0.015 220)` | `#0c1118` | Cards, elevated surfaces |
| `--fg` | `oklch(85% 0.025 210)` | `#c8d8e8` | Primary text |
| `--muted` | `oklch(42% 0.030 215)` | `#506070` | Secondary text, placeholders |
| `--dim` | `oklch(30% 0.025 215)` | `#3a4a5a` | Index numbers, annotations |
| `--accent` | `oklch(58% 0.090 220)` | `#4a9abb` | Blueprint blue, primary accent |
| `--accent2` | `oklch(72% 0.090 215)` | `#7bc4e0` | Hover states, lighter accent |
| `--line` | `oklch(58% 0.090 220 / 0.15)` | — | Subtle dashed borders |
| `--line-strong` | `oklch(58% 0.090 220 / 0.30)` | — | Prominent dashed borders |
| `--success` | `oklch(78% 0.18 145)` | `#4ade80` | Availability indicator |
| `--destructive` | `oklch(55% 0.22 25)` | — | Errors (rare) |

oklch alpha syntax: `oklch(L% C H / alpha)`. The alpha on `--line` and `--line-strong` lets the dot grid show faintly through borders.

---

## Typography

```ts
// tokens/typography.ts
export const fonts = {
  display: "'Bebas Neue', sans-serif",    // hero, section names, project titles
  mono:    "'IBM Plex Mono', monospace",  // body, labels, metadata — everything else
}

export const fontSizes = {
  xxs:  '0.45rem',               // nav index numbers
  xs:   '0.5rem',                // labels, tags, annotations
  sm:   '0.58rem',               // secondary text, metadata
  base: '0.72rem',               // body copy, descriptions
  md:   '0.85rem',               // post titles
  lg:   '1.1rem',                // section headers (display font)
  xl:   '1.6rem',                // project names (display font)
  hero: 'clamp(3.5rem, 7vw, 7rem)', // hero headline
}

export const fontWeights = {
  light:   300,
  regular: 400,
  medium:  500,
}

export const letterSpacing = {
  tight:  '-0.02em',  // display headlines
  normal:  '0em',
  wide:    '0.08em',  // metadata
  wider:   '0.12em',  // labels, tags
  widest:  '0.18em',  // logo subtitle
}
```

---

## Spacing

Base-8 scale. All values are multiples of `0.5rem` (8px).

```ts
// tokens/spacing.ts
export const space = {
  1: '0.5rem',  //  8px
  2: '1rem',    // 16px
  3: '1.5rem',  // 24px
  4: '2rem',    // 32px
  6: '3rem',    // 48px
  8: '4rem',    // 64px
}
```

---

## Borders

All borders are **dashed**, not solid. This is a hard constraint of the blueprint aesthetic — never use `border-solid` anywhere.

```ts
// tokens/borders.ts
export const borders = {
  subtle: '1px dashed var(--line)',
  strong: '1px dashed var(--line-strong)',
  accent: '1px dashed var(--accent)',
}
```

---

## Components

### `<SectionHeader>`

Sticky header at the top of each content section.

```tsx
// components/blueprint/SectionHeader.tsx
interface SectionHeaderProps {
  index: string    // "01"
  title: string    // "Projects"
  meta?: string    // "3 items · sorted by recency"
}
```

- Left column (`--col-index` wide): vertical index number, `border-right: strong`
- `position: sticky`, `top: var(--header-h)`, `z-index: 10`
- Backdrop blur + semi-transparent bg for legibility when scrolling

---

### `<SpecBlock>`

Labeled dashed-border box for key/value pairs. Used on homepage and about page.

```tsx
// components/blueprint/SpecBlock.tsx
interface SpecBlockProps {
  label: string    // "// specification"
  rows: { key: string; value: string; accent?: boolean }[]
}
```

- Label floats above top border: `position: absolute; top: -0.6rem; background: var(--bg)`
- Row separator: `border-bottom: subtle`
- `.accent` value uses `color: var(--accent2)`

---

### `<CrosshairTarget>`

Wrapper that reveals blueprint corner brackets when its parent row is hovered. Applied to the **content cell** of a row — not the full row width.

```tsx
// components/blueprint/CrosshairTarget.tsx
interface CrosshairTargetProps {
  children: React.ReactNode
  className?: string
  size?: number   // bracket arm length in px, default 10
}
```

```tsx
// usage — parent needs className="group"
<div className="group grid grid-cols-[56px_1fr_auto]">
  <span className="index-col">01</span>
  <CrosshairTarget className="p-6">
    <h3>Project name</h3>
    <p>Description</p>
  </CrosshairTarget>
  <span className="meta-col">2025</span>
</div>
```

Brackets are `::before` (top-left) and `::after` (bottom-right), opacity driven by `group-hover:opacity-100`.

---

### `<Tag>`

Dashed pill for taxonomy. Static (display-only) or interactive (toggleable filter).

```tsx
// components/blueprint/Tag.tsx
interface TagProps {
  label: string
  active?: boolean
  onClick?: () => void   // if provided, renders as a button
  size?: 'sm' | 'md'
}
```

States: default `color: accent, border: line-strong` → hover/active `bg: accent/12, border: accent, color: accent2`.

---

### `<RowItem>`

Base layout component for project, post, and now-entry rows.

```tsx
// components/blueprint/RowItem.tsx
interface RowItemProps {
  index: string
  children: React.ReactNode   // content cell — wrapped in CrosshairTarget internally
  side?: React.ReactNode      // right-aligned metadata column
  href?: string
}
```

Grid: `var(--col-index) 1fr auto`. Index column hidden below `md` breakpoint.

---

### `<BlueprintBox>`

Generic dashed-border container. The primitive underlying `SpecBlock`.

```tsx
// components/blueprint/BlueprintBox.tsx
interface BlueprintBoxProps {
  children: React.ReactNode
  className?: string
  corners?: boolean   // show static crosshair corners (not hover-driven)
}
```

---

### `<AnnotationLabel>`

Small uppercase label matching the `// label` pattern used throughout.

```tsx
// components/blueprint/AnnotationLabel.tsx
interface AnnotationLabelProps {
  children: React.ReactNode
  withLine?: boolean   // trailing decorative dashed line
}
```

---

### `<BtnCrosshair>`

Button or anchor with crosshair corner brackets that appear on hover.

```tsx
// components/blueprint/BtnCrosshair.tsx
interface BtnCrosshairProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
}
```

---

## Shadcn

Shadcn is the base layer for interactive primitives. The `globals.css` above already remaps all shadcn color variables to your tokens — components like `<Dialog>`, `<Tooltip>`, and `<Command>` inherit the right colors with no further work.

**Init:**
```bash
npx shadcn@latest init
# TypeScript · App Router · no default styles (globals.css is yours)
```

**Pull in selectively:**

| Component | When |
|---|---|
| `tooltip` | Icon-only buttons needing hover labels |
| `dialog` | Lightboxes, confirmations |
| `command` | Search / command palette (future) |
| `dropdown-menu` | Context menus (future) |

**Never use** shadcn's default color theme, hardcoded color classes, or `rounded-*` utilities — `--radius: 0` handles corners globally.

Custom blueprint components live in `components/blueprint/`, separate from shadcn's auto-generated `components/ui/`. The distinction matters: `ui/` is generated and can be re-generated; `blueprint/` is yours.

---

## Interaction Patterns

**Crosshair hover** — brackets on content cell, `group` / `group-hover:` pattern. Also standalone on `BtnCrosshair`.

**Tag filtering** — multi-select, state in URL query params for shareability. Client-side filtering, no debounce needed at this data volume.

**Sort toggle** — `↓ newest first` / `↑ oldest first`, URL query param alongside tags.

**Scroll reveal** — `IntersectionObserver`, `threshold: 0.08`. `opacity-0 translate-y-4` → visible. Fires once, not on re-entry. Stagger siblings with `animation-delay`.

---

## Responsive Breakpoints

```ts
// tokens/breakpoints.ts
export const breakpoints = {
  sm: '480px',
  md: '768px',   // main breakpoint — grids collapse, index columns hide
  lg: '900px',   // header coords hide
  xl: '1400px',  // max-width cap
}
```

---

## File Structure

```
app/
  globals.css              ← single source of truth — tokens + shadcn overrides

components/
  ui/                      ← shadcn auto-generated (don't hand-edit)
    button.tsx
    dialog.tsx
    tooltip.tsx
    ...
  blueprint/               ← custom blueprint system
    SectionHeader.tsx
    SpecBlock.tsx
    CrosshairTarget.tsx
    Tag.tsx
    RowItem.tsx
    BlueprintBox.tsx
    AnnotationLabel.tsx
    BtnCrosshair.tsx
  layout/
    Header.tsx
    Footer.tsx
    MobileMenu.tsx

tokens/
  typography.ts
  spacing.ts
  borders.ts
  breakpoints.ts
  index.ts                 ← re-exports everything
```
