import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    year: z.number(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()),
    order: z.number(),
    url: z.string().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()),
    status: z.enum(["draft", "published"]).default("published"),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/now" }),
  schema: z.object({
    date: z.coerce.date(),
    content: z.string(),
    tags: z.array(z.string()),
    linkedPost: z.string().optional(),
  }),
});

export const collections = { projects, posts, now };
