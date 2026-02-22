import { getPayload } from "payload"
import config from "@payload-config"
import { RowItem, SectionHeader, Tag } from "@heim/ui"
import { ScrollReveal } from "@/components/ScrollReveal"
import type { Project, Tag as TagType } from "@/payload-types"

export const revalidate = false

export default async function ProjectsPage() {
	const payload = await getPayload({ config })
	const { docs: projects } = await payload.find({
		collection: "projects",
		sort: "order",
		depth: 1,
	})

	return (
		<div className="mx-auto max-w-[var(--max-w)]">
			<SectionHeader
				index="01"
				title="Projects"
				meta={`${projects.length} items`}
			/>
			<div>
				{projects.map((project: Project, i: number) => (
					<ScrollReveal key={project.id} stagger={i}>
						<RowItem
							index={String(i + 1).padStart(3, "0")}
							side={
								<>
									<span className="text-[0.58rem] tracking-[0.1em] text-[var(--dim)]">{project.year}</span>
									<span className="text-[0.7rem] text-[var(--accent)] opacity-0 -translate-x-1.5 transition-all group-hover:opacity-100 group-hover:translate-x-0">→</span>
								</>
							}
							href={project.url ?? undefined}
						>
							<div>
								<h2 className="font-[family-name:var(--font-display)] text-[1.6rem] leading-none tracking-[0.08em] text-[var(--fg)] transition-colors group-hover:text-[var(--accent2)]">
									{project.name}
								</h2>
								<p className="mt-3 max-w-[55ch] text-[0.72rem] leading-[1.8] text-[var(--muted)]">
									{project.description}
								</p>
								{project.tags && (project.tags as TagType[]).length > 0 && (
									<div className="mt-4 flex flex-wrap gap-2">
										{(project.tags as TagType[]).map((tag) => (
											<Tag key={tag.id} label={tag.name} />
										))}
									</div>
								)}
							</div>
						</RowItem>
					</ScrollReveal>
				))}
			</div>

			<div className="px-6 py-4 text-[0.5rem] tracking-[0.08em] text-[var(--dim)]">
				© {new Date().getFullYear()} Philip Bjørknes Krogh
			</div>
		</div>
	)
}
