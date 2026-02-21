import { notFound } from "next/navigation"
import { getPayload } from "payload"
import config from "@payload-config"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { AnnotationLabel, Tag } from "@heim/ui"
import type { Post, Tag as TagType } from "@/payload-types"

export const revalidate = false

export async function generateStaticParams() {
	const payload = await getPayload({ config })
	const { docs: posts } = await payload.find({
		collection: "posts",
		where: { status: { equals: "published" } },
		limit: 100,
	})
	return posts.map((post: Post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const payload = await getPayload({ config })
	const { docs } = await payload.find({
		collection: "posts",
		where: {
			slug: { equals: slug },
			status: { equals: "published" },
		},
		depth: 1,
		limit: 1,
	})

	const post = docs[0] as Post | undefined
	if (!post) notFound()

	return (
		<div className="mx-auto max-w-[var(--max-w)] px-4 py-12">
			<div className="mx-auto max-w-2xl">
				<AnnotationLabel>writing</AnnotationLabel>
				<h1 className="mt-3 font-[family-name:var(--font-display)] text-[2rem] tracking-[-0.02em] text-[var(--fg)]">
					{post.title}
				</h1>
				<div className="mt-3 flex items-center gap-4 text-[0.5rem] tracking-[0.08em] text-[var(--muted)]">
					<span>
						{new Date(post.publishedAt).toLocaleDateString("en-US", {
							month: "long",
							day: "numeric",
							year: "numeric",
						})}
					</span>
				</div>
				{post.tags && (post.tags as TagType[]).length > 0 && (
					<div className="mt-3 flex flex-wrap gap-1.5">
						{(post.tags as TagType[]).map((tag) => (
							<Tag key={tag.id} label={tag.name} />
						))}
					</div>
				)}

				<div className="prose-blueprint mt-10">
					{post.content && <RichText data={post.content} />}
				</div>
			</div>
		</div>
	)
}
