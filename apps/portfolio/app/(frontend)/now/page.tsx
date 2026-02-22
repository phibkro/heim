import { Suspense } from "react"
import { getPayload } from "payload"
import config from "@payload-config"
import { SectionHeader } from "@heim/ui"
import type { NowEntry, Tag as TagType } from "@/payload-types"
import { NowFeed } from "./NowFeed"

export const revalidate = 60

export default async function NowPage() {
	const payload = await getPayload({ config })
	const { docs: entries } = await payload.find({
		collection: "now-entries",
		sort: "-date",
		depth: 1,
		limit: 200,
	})

	const allTags = new Map<string, string>()
	for (const entry of entries as NowEntry[]) {
		if (entry.tags) {
			for (const tag of entry.tags as TagType[]) {
				allTags.set(tag.slug, tag.name)
			}
		}
	}

	const slimEntries = (entries as NowEntry[]).map((e) => ({
		id: e.id,
		content: e.content,
		date: e.date,
		tags: e.tags
			? (e.tags as TagType[]).map((t) => ({ id: t.id, slug: t.slug, name: t.name }))
			: [],
		linkedPost: e.linkedPost
			? { slug: (e.linkedPost as { slug: string }).slug }
			: undefined,
	}))

	return (
		<div className="mx-auto max-w-[var(--max-w)]">
			<SectionHeader
				index="03"
				title="Now"
				meta={`${entries.length} entries`}
			/>
			<Suspense fallback={<div className="px-6 py-10 text-[0.7rem] text-[var(--dim)]">Loading...</div>}>
				<NowFeed
					entries={slimEntries}
					availableTags={Array.from(allTags.entries()).map(([slug, name]) => ({ slug, name }))}
				/>
			</Suspense>

			<div className="px-6 py-4 text-[0.5rem] tracking-[0.08em] text-[var(--dim)]">
				© {new Date().getFullYear()} Philip Bjørknes Krogh
			</div>
		</div>
	)
}
