"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useCallback } from "react"
import { Tag } from "@heim/ui"
import type { NowEntry, Tag as TagType } from "@/payload-types"

interface NowFeedProps {
	entries: NowEntry[]
	availableTags: { slug: string; name: string }[]
}

export function NowFeed({ entries, availableTags }: NowFeedProps) {
	const searchParams = useSearchParams()
	const router = useRouter()

	const activeTags = searchParams.get("tags")?.split(",").filter(Boolean) ?? []
	const sort = searchParams.get("sort") === "asc" ? "asc" : "desc"

	const updateParams = useCallback(
		(updates: Record<string, string | null>) => {
			const params = new URLSearchParams(searchParams.toString())
			for (const [key, value] of Object.entries(updates)) {
				if (value === null) {
					params.delete(key)
				} else {
					params.set(key, value)
				}
			}
			router.push(`?${params.toString()}`, { scroll: false })
		},
		[searchParams, router],
	)

	const toggleTag = (slug: string) => {
		const next = activeTags.includes(slug)
			? activeTags.filter((t) => t !== slug)
			: [...activeTags, slug]
		updateParams({ tags: next.length > 0 ? next.join(",") : null })
	}

	const toggleSort = () => {
		updateParams({ sort: sort === "desc" ? "asc" : null })
	}

	const filtered = entries.filter((entry) => {
		if (activeTags.length === 0) return true
		const entryTags = (entry.tags as TagType[] | undefined) ?? []
		return activeTags.some((slug) => entryTags.some((t) => t.slug === slug))
	})

	const sorted = filtered.toSorted((a, b) => {
		const da = new Date(a.date).getTime()
		const db = new Date(b.date).getTime()
		return sort === "asc" ? da - db : db - da
	})

	return (
		<div>
			{/* Filters */}
			<div className="flex flex-wrap items-center gap-2 border-b border-dashed border-[var(--line)] px-4 py-3">
				{availableTags.map((tag) => (
					<Tag
						key={tag.slug}
						label={tag.name}
						active={activeTags.includes(tag.slug)}
						onClick={() => toggleTag(tag.slug)}
					/>
				))}
				<button
					type="button"
					onClick={toggleSort}
					className="ml-auto cursor-pointer text-[0.5rem] tracking-[0.08em] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
				>
					{sort === "desc" ? "↓ newest first" : "↑ oldest first"}
				</button>
			</div>

			{/* Entries */}
			<div>
				{sorted.map((entry) => (
					<div
						key={entry.id}
						className="border-b border-dashed border-[var(--line)] px-4 py-4"
					>
						<p className="text-[0.72rem] leading-relaxed text-[var(--fg)]">{entry.content}</p>
						<div className="mt-2 flex items-center gap-3">
							<span className="text-[0.5rem] tracking-[0.08em] text-[var(--dim)]">
								{new Date(entry.date).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
								})}
							</span>
							{entry.tags && (entry.tags as TagType[]).length > 0 && (
								<div className="flex gap-1.5">
									{(entry.tags as TagType[]).map((tag) => (
										<Tag key={tag.id} label={tag.name} size="sm" />
									))}
								</div>
							)}
						</div>
					</div>
				))}
				{sorted.length === 0 && (
					<div className="px-4 py-8 text-center text-[0.72rem] text-[var(--muted)]">
						No entries match the selected filters.
					</div>
				)}
			</div>
		</div>
	)
}
