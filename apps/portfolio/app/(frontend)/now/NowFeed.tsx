"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useCallback } from "react"
import { CrosshairTarget, Tag } from "@heim/ui"
import type { NowEntry, Post, Tag as TagType } from "@/payload-types"

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
			<div className="flex flex-wrap items-center gap-2 border-b border-dashed border-[var(--line-strong)] px-4 py-3">
				<span className="shrink-0 text-[0.5rem] tracking-[0.15em] uppercase text-[var(--dim)]">
					Filter:
				</span>
				<div className="flex flex-1 flex-wrap gap-2">
					{availableTags.map((tag) => (
						<Tag
							key={tag.slug}
							label={tag.name}
							active={activeTags.includes(tag.slug)}
							onClick={() => toggleTag(tag.slug)}
						/>
					))}
				</div>
				<button
					type="button"
					onClick={toggleSort}
					className="ml-auto shrink-0 cursor-pointer whitespace-nowrap border border-dashed border-[var(--line-strong)] bg-transparent px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.5rem] tracking-[0.12em] uppercase text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent2)]"
				>
					{sort === "desc" ? "↓ newest first" : "↑ oldest first"}
				</button>
			</div>

			{/* Entries */}
			<div className="flex flex-col">
				{sorted.map((entry, i) => {
					const linkedPost = entry.linkedPost as Post | undefined
					return (
						<div
							key={entry.id}
							className="grid grid-cols-[40px_1fr] border-b border-dashed border-[var(--line)] transition-colors hover:bg-[var(--accent)]/3 md:grid-cols-[56px_110px_1fr_auto]"
						>
							{/* Index */}
							<div className="flex items-center justify-center border-r border-dashed border-[var(--line-strong)] py-4 text-[0.48rem] text-[var(--dim)]">
								{String(i + 1).padStart(2, "0")}
							</div>

							{/* Date — hidden on mobile */}
							<div className="hidden items-center border-r border-dashed border-[var(--line)] px-4 py-4 text-[0.58rem] tracking-[0.06em] whitespace-nowrap text-[var(--dim)] md:flex">
								{new Date(entry.date).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
								})}
							</div>

							{/* Content */}
							<CrosshairTarget className="flex flex-col justify-center gap-2 px-4 py-4 md:px-6">
								<span className="text-[0.78rem] leading-[1.7] text-[var(--fg)]">
									{entry.content}
								</span>
								{entry.tags && (entry.tags as TagType[]).length > 0 && (
									<div className="flex flex-wrap gap-1.5">
										{(entry.tags as TagType[]).map((tag) => (
											<Tag key={tag.id} label={tag.name} size="sm" />
										))}
									</div>
								)}
							</CrosshairTarget>

							{/* Side — hidden on mobile */}
							{linkedPost ? (
								<a
									href={`/writing/${linkedPost.slug}`}
									className="hidden items-center border-l border-dashed border-[var(--line)] px-5 text-[0.65rem] text-[var(--dim)] no-underline transition-colors hover:text-[var(--accent2)] md:flex"
								>
									↗
								</a>
							) : (
								<div className="hidden border-l border-dashed border-[var(--line)] px-5 md:block" />
							)}
						</div>
					)
				})}
				{sorted.length === 0 && (
					<div className="px-6 py-10 text-[0.7rem] italic text-[var(--dim)]">
						// no entries match the current filter
					</div>
				)}
			</div>
		</div>
	)
}
