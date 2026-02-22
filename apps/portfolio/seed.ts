import { getPayload } from "payload"
import config from "./payload.config"

async function seed() {
	const payload = await getPayload({ config })

	console.log("Seeding tags...")
	const tagNames = [
		"TypeScript",
		"AI Agents",
		"CLI",
		"Architecture",
		"Multi-agent",
		"Security",
		"React",
		"Next.js",
		"Research",
		"FP",
		"Craft",
		"Building",
		"Web",
		"Writing",
		"Reading",
	]

	const tags: Record<string, string> = {}
	for (const name of tagNames) {
		const existing = await payload.find({
			collection: "tags",
			where: { name: { equals: name } },
			limit: 1,
		})
		if (existing.docs.length > 0) {
			tags[name] = existing.docs[0].id
			console.log(`  Tag "${name}" already exists`)
		} else {
			const tag = await payload.create({ collection: "tags", data: { name } })
			tags[name] = tag.id
			console.log(`  Created tag "${name}"`)
		}
	}

	console.log("\nSeeding projects...")
	const projects = [
		{
			name: "agent-toolkit",
			description:
				"Unified toolkit for Claude Code agents. Handles structured execution planning, context separation across fetch/synthesis/execution boundaries, and multi-repo coordination.",
			year: 2025,
			featured: true,
			tags: [tags["TypeScript"], tags["AI Agents"], tags["CLI"], tags["Architecture"]],
			order: 1,
			url: "https://github.com/phibkro/agent-toolkit",
		},
		{
			name: "ai-code-audit",
			description:
				"Multi-agent system for automated code review, security analysis, and architectural assessment across large codebases.",
			year: 2025,
			featured: true,
			tags: [tags["Multi-agent"], tags["TypeScript"], tags["Security"]],
			order: 2,
			url: "https://github.com/phibkro/ai-code-audit",
		},
		{
			name: "agent-interface",
			description:
				"Research interface for scientific study search. AI agents handle retrieval, synthesis, and source ranking.",
			year: 2024,
			featured: false,
			tags: [tags["React"], tags["Next.js"], tags["Research"]],
			order: 3,
			url: "https://github.com/phibkro/agent-interface",
		},
	]

	for (const project of projects) {
		const existing = await payload.find({
			collection: "projects",
			where: { name: { equals: project.name } },
			limit: 1,
		})
		if (existing.docs.length > 0) {
			await payload.update({ collection: "projects", id: existing.docs[0].id, data: project })
			console.log(`  Updated project "${project.name}"`)
		} else {
			await payload.create({ collection: "projects", data: project })
			console.log(`  Created project "${project.name}"`)
		}
	}

	console.log("\nSeeding posts...")
	const posts = [
		{
			title: "On context management in long-running agents",
			excerpt:
				"How to handle context windows, memory hierarchies, and state across extended agent sessions without losing coherence.",
			publishedAt: "2025-02-15T00:00:00.000Z",
			tags: [tags["AI Agents"], tags["Architecture"]],
			status: "published" as const,
		},
		{
			title: "Why I think about software architecture like music theory",
			excerpt:
				"Composition, counterpoint, and the structural patterns shared between music and well-designed systems.",
			publishedAt: "2025-01-20T00:00:00.000Z",
			tags: [tags["Architecture"], tags["Craft"]],
			status: "published" as const,
		},
		{
			title: "Functional patterns that actually matter in TypeScript",
			excerpt:
				"Moving beyond map/filter/reduce to the patterns that genuinely improve TypeScript codebases.",
			publishedAt: "2024-12-10T00:00:00.000Z",
			tags: [tags["FP"], tags["TypeScript"]],
			status: "published" as const,
		},
	]

	const createdPosts: Record<string, string> = {}
	for (const post of posts) {
		const existing = await payload.find({
			collection: "posts",
			where: { title: { equals: post.title } },
			limit: 1,
		})
		if (existing.docs.length > 0) {
			createdPosts[post.title] = existing.docs[0].id
			console.log(`  Post "${post.title}" already exists`)
		} else {
			const created = await payload.create({ collection: "posts", data: post })
			createdPosts[post.title] = created.id
			console.log(`  Created post "${post.title}"`)
		}
	}

	console.log("\nSeeding now entries...")
	const nowEntries = [
		{
			date: "2025-02-21T00:00:00.000Z",
			content: "Started building portfolio with Payload CMS + Next.js",
			tags: [tags["Building"], tags["Web"]],
		},
		{
			date: "2025-02-10T00:00:00.000Z",
			content: "Published a post on functional patterns in TypeScript",
			tags: [tags["Writing"], tags["FP"], tags["TypeScript"]],
			linkedPost: createdPosts["Functional patterns that actually matter in TypeScript"],
		},
		{
			date: "2025-02-01T00:00:00.000Z",
			content:
				"Deep in agent-toolkit context management — separating fetch / synthesis / execution is harder than it sounds",
			tags: [tags["Building"], tags["AI Agents"], tags["Architecture"]],
		},
		{
			date: "2025-01-20T00:00:00.000Z",
			content: "Exploring Effect-TS as a replacement for raw Promise chains in agent pipelines",
			tags: [tags["FP"], tags["TypeScript"], tags["AI Agents"]],
		},
		{
			date: "2025-01-15T00:00:00.000Z",
			content: "Picked up SICP again — third attempt, this time it's clicking",
			tags: [tags["Reading"], tags["FP"]],
		},
		{
			date: "2025-01-08T00:00:00.000Z",
			content: "Published a post on software architecture and music theory",
			tags: [tags["Writing"], tags["Architecture"]],
			linkedPost: createdPosts["Why I think about software architecture like music theory"],
		},
		{
			date: "2024-12-20T00:00:00.000Z",
			content: "Finished ai-code-audit MVP — multi-agent code review actually works",
			tags: [tags["Building"], tags["AI Agents"], tags["Architecture"]],
		},
		{
			date: "2024-12-05T00:00:00.000Z",
			content:
				"Reading about Lean 4 and dependent types. Formal verification feels increasingly practical",
			tags: [tags["Reading"], tags["FP"], tags["Architecture"]],
		},
		{
			date: "2024-11-18T00:00:00.000Z",
			content:
				"Started agent-interface — scientific search is a great use case for structured agent pipelines",
			tags: [tags["Building"], tags["AI Agents"]],
		},
	]

	for (const entry of nowEntries) {
		const existing = await payload.find({
			collection: "now-entries",
			where: { content: { equals: entry.content } },
			limit: 1,
		})
		if (existing.docs.length > 0) {
			console.log(`  Now entry already exists: "${entry.content.slice(0, 40)}..."`)
		} else {
			await payload.create({ collection: "now-entries", data: entry })
			console.log(`  Created now entry: "${entry.content.slice(0, 40)}..."`)
		}
	}

	console.log("\nSeed complete!")
	process.exit(0)
}

seed().catch((err) => {
	console.error("Seed failed:", err)
	process.exit(1)
})
