import { getPayload } from "payload"
import config from "@payload-config"
import { RowItem, SectionHeader } from "@heim/ui"
import { ScrollReveal } from "@/components/ScrollReveal"
import type { Post, Tag as TagType } from "@/payload-types"

export const revalidate = false

function estimateReadTime(content: unknown): string {
	const text = JSON.stringify(content)
	const words = text.split(/\s+/).length
	const minutes = Math.max(1, Math.round(words / 200))
	return `${minutes} min`
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
				{posts.map((post: Post, i: number) => {
					const tags = (post.tags as TagType[] | undefined) ?? []
					const category = tags.map((t) => t.name).join(" · ")

					return (
						<ScrollReveal key={post.id} stagger={i}>
							<RowItem
								index={String(i + 1).padStart(2, "0")}
								side={
									<>
										<span className="text-[0.55rem] tracking-[0.08em] whitespace-nowrap text-[var(--muted)]">
											{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
										</span>
										<span className="text-[var(--dim)]">{estimateReadTime(post.content)}</span>
									</>
								}
								href={`/writing/${post.slug}`}
							>
								<div>
									{category && (
										<div className="mb-2 text-[0.5rem] tracking-[0.15em] uppercase text-[var(--accent)]">
											{category}
										</div>
									)}
									<h2 className="text-[0.95rem] italic text-[var(--fg)] transition-colors group-hover:text-[var(--accent2)]">
										{post.title}
									</h2>
								</div>
							</RowItem>
						</ScrollReveal>
					)
				})}
			</div>

			<div className="px-6 py-4 text-[0.5rem] tracking-[0.08em] text-[var(--dim)]">
				© {new Date().getFullYear()} Philip Bjørknes Krogh
			</div>
		</div>
	)
}
