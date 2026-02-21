import { notFound } from "next/navigation"
import { getPayload } from "payload"
import config from "@payload-config"
import Link from "next/link"
import { SectionHeader, Tag } from "@heim/ui"
import type { Post, Project, NowEntry, Tag as TagType } from "@/payload-types"

export const revalidate = false

export async function generateStaticParams() {
	const payload = await getPayload({ config })
	const { docs: tags } = await payload.find({
		collection: "tags",
		limit: 200,
	})
	return tags.map((tag: TagType) => ({ slug: tag.slug }))
}

type FeedItem =
	| { type: "post"; date: string; data: Post }
	| { type: "project"; date: string; data: Project }
	| { type: "now"; date: string; data: NowEntry }

export default async function TagDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })

	const { docs: tags } = await payload.find({
		collection: "tags",
		where: { slug: { equals: slug } },
		limit: 1,
	})

	const tag = tags[0] as TagType | undefined
	if (!tag) notFound()

	const [posts, projects, nowEntries] = await Promise.all([
		payload.find({
			collection: "posts",
			where: { "tags.slug": { equals: slug }, status: { equals: "published" } },
			depth: 1,
		}),
		payload.find({
			collection: "projects",
			where: { "tags.slug": { equals: slug } },
			depth: 1,
		}),
		payload.find({
			collection: "now-entries",
			where: { "tags.slug": { equals: slug } },
			depth: 1,
		}),
	])

	const feed: FeedItem[] = [
		...posts.docs.map((p: Post) => ({ type: "post" as const, date: p.publishedAt, data: p })),
		...projects.docs.map((p: Project) => ({ type: "project" as const, date: String(p.year), data: p })),
		...nowEntries.docs.map((n: NowEntry) => ({ type: "now" as const, date: n.date, data: n })),
	].toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	return (
		<div className="mx-auto max-w-[var(--max-w)]">
			<SectionHeader
				index="—"
				title={tag.name}
				meta={`${feed.length} items`}
			/>
			<div>
				{feed.map((item) => (
					<div
						key={`${item.type}-${"id" in item.data ? item.data.id : ""}`}
						className="border-b border-dashed border-[var(--line)] px-4 py-4"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<Tag label={item.type} size="sm" />
								<div className="mt-2">
									{item.type === "post" && (
										<Link
											href={`/writing/${(item.data as Post).slug}`}
											className="text-[0.85rem] text-[var(--fg)] no-underline hover:text-[var(--accent2)]"
										>
											{(item.data as Post).title}
										</Link>
									)}
									{item.type === "project" && (
										<span className="font-[family-name:var(--font-display)] text-[1.1rem] tracking-[-0.02em] text-[var(--fg)]">
											{(item.data as Project).name}
										</span>
									)}
									{item.type === "now" && (
										<p className="text-[0.72rem] text-[var(--fg)]">
											{(item.data as NowEntry).content}
										</p>
									)}
								</div>
							</div>
							<span className="shrink-0 text-[0.5rem] tracking-[0.08em] text-[var(--dim)]">
								{new Date(item.date).toLocaleDateString("en-US", {
									month: "short",
									year: "numeric",
								})}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
