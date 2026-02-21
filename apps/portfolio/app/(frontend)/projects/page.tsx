import { getPayload } from "payload"
import config from "@payload-config"
import { RowItem, SectionHeader, Tag } from "@heim/ui"
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
					<RowItem
						key={project.id}
						index={String(i + 1).padStart(2, "0")}
						side={<span>{project.year}</span>}
						href={project.url ?? undefined}
					>
						<div>
							<h2 className="font-[family-name:var(--font-display)] text-[1.6rem] tracking-[-0.02em] text-[var(--fg)]">
								{project.name}
							</h2>
							<p className="mt-1 text-[0.72rem] leading-relaxed text-[var(--muted)]">
								{project.description}
							</p>
							{project.tags && (project.tags as TagType[]).length > 0 && (
								<div className="mt-2 flex flex-wrap gap-1.5">
									{(project.tags as TagType[]).map((tag) => (
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
