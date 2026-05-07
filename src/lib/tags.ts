// Tag registry — display name + slug derivation. Tags are referenced by
// slug from content frontmatter; the display name comes from this map.
//
// Adding a tag: add an entry here (preserves the original ordering from
// the seed). Frontmatter uses the slug, not the display name.

export const TAG_DISPLAY: Record<string, string> = {
  typescript: "TypeScript",
  "ai-agents": "AI Agents",
  cli: "CLI",
  architecture: "Architecture",
  "multi-agent": "Multi-agent",
  security: "Security",
  react: "React",
  "next-js": "Next.js",
  research: "Research",
  fp: "FP",
  craft: "Craft",
  building: "Building",
  web: "Web",
  writing: "Writing",
  reading: "Reading",
};

export function tagName(slug: string): string {
  return TAG_DISPLAY[slug] ?? slug;
}

export function allTagSlugs(): string[] {
  return Object.keys(TAG_DISPLAY);
}
