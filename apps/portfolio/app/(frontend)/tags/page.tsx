import { getPayload } from "payload"
import config from "@payload-config"
import { RowItem, SectionHeader } from "@heim/ui"
import type { Tag as TagType } from "@/payload-types"

export const revalidate = false

export default async function TagsPage() {
	const payload = await getPayload({ config })
	const { docs: tags } = await payload.find({
		collection: "tags",
		sort: "name",
		limit: 200,
	})

	const tagCounts = await Promise.all(
		(tags as TagType[]).map(async (tag) => {
			const [posts, projects, nowEntries] = await Promise.all([
				payload.count({ collection: "posts", where: { "tags.slug": { equals: tag.slug }, status: { equals: "published" } } }),
				payload.count({ collection: "projects", where: { "tags.slug": { equals: tag.slug } } }),
				payload.count({ collection: "now-entries", where: { "tags.slug": { equals: tag.slug } } }),
			])
			return { tag, count: posts.totalDocs + projects.totalDocs + nowEntries.totalDocs }
		}),
	)

	return (
		<div className="mx-auto max-w-[var(--max-w)]">
			<SectionHeader
				index="—"
				title="Tags"
				meta={`${tags.length} tags`}
			/>
			<div>
				{tagCounts.map(({ tag, count }, i) => (
					<RowItem
						key={tag.id}
						index={String(i + 1).padStart(2, "0")}
						side={<span>{count} items</span>}
						href={`/tags/${tag.slug}`}
					>
						<span className="text-[0.85rem] text-[var(--accent)]">{tag.name}</span>
					</RowItem>
				))}
			</div>
		</div>
	)
}
