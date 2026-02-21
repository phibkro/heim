import { getPayload } from "payload"
import config from "@payload-config"
import { RowItem, SectionHeader, Tag } from "@heim/ui"
import type { Post, Tag as TagType } from "@/payload-types"

export const revalidate = false

function estimateReadTime(content: unknown): string {
	const text = JSON.stringify(content)
	const words = text.split(/\s+/).length
	const minutes = Math.max(1, Math.round(words / 200))
	return `${minutes} min read`
}

export default async function WritingPage() {
	const payload = await getPayload({ config })
	const { docs: posts } = await payload.find({
		collection: "posts",
		where: { status: { equals: "published" } },
		sort: "-publishedAt",
		depth: 1,
	})

	return (
		<div className="mx-auto max-w-[var(--max-w)]">
			<SectionHeader
				index="02"
				title="Writing"
				meta={`${posts.length} posts`}
			/>
			<div>
				{posts.map((post: Post, i: number) => (
					<RowItem
						key={post.id}
						index={String(i + 1).padStart(2, "0")}
						side={
							<div className="flex flex-col items-end gap-1">
								<span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
								<span className="text-[var(--dim)]">{estimateReadTime(post.content)}</span>
							</div>
						}
						href={`/writing/${post.slug}`}
					>
						<div>
							<h2 className="text-[0.85rem] text-[var(--fg)]">{post.title}</h2>
							{post.excerpt && (
								<p className="mt-1 text-[0.72rem] text-[var(--muted)]">{post.excerpt}</p>
							)}
							{post.tags && (post.tags as TagType[]).length > 0 && (
								<div className="mt-2 flex flex-wrap gap-1.5">
									{(post.tags as TagType[]).map((tag) => (
										<Tag key={tag.id} label={tag.name} />
									))}
								</div>
							)}
						</div>
					</RowItem>
				))}
			</div>
		</div>
	)
}
