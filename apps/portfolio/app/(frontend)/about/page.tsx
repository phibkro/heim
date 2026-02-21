import { AnnotationLabel, SpecBlock } from "@heim/ui"

export const revalidate = 3600

export default function AboutPage() {
	return (
		<div className="mx-auto max-w-[var(--max-w)] px-4 py-12">
			<div className="grid gap-12 md:grid-cols-2">
				{/* Text column */}
				<div>
					<AnnotationLabel>about</AnnotationLabel>
					<h1 className="mt-3 font-[family-name:var(--font-display)] text-[2rem] tracking-[-0.02em] text-[var(--fg)]">
						Philip Bjørknes Krogh
					</h1>
					<div className="mt-6 flex flex-col gap-4 text-[0.72rem] leading-relaxed text-[var(--muted)]">
						<p>
							Developer based in Oslo, Norway. I build tools and interfaces at the intersection
							of design and engineering, with a focus on making complex systems feel simple.
						</p>
						<p>
							Currently exploring functional programming, agent systems, and the craft of
							building software that respects both the user and the machine.
						</p>
						<p>
							When not coding, you can find me reading about systems thinking, experimenting
							with new tools, or exploring the Norwegian outdoors.
						</p>
					</div>
				</div>

				{/* Spec tables column */}
				<div className="flex flex-col gap-6">
					<SpecBlock
						label="identity"
						rows={[
							{ key: "name", value: "Philip Bjørknes Krogh" },
							{ key: "location", value: "Oslo, Norway", accent: true },
							{ key: "coordinates", value: "59.91°N 10.75°E" },
							{ key: "timezone", value: "CET (UTC+1)" },
						]}
					/>
					<SpecBlock
						label="technical"
						rows={[
							{ key: "languages", value: "TypeScript · Rust · Python" },
							{ key: "frontend", value: "React · Next.js · Tailwind" },
							{ key: "backend", value: "Node · PostgreSQL · Redis" },
							{ key: "tools", value: "Neovim · Git · Docker" },
						]}
					/>
					<SpecBlock
						label="currently"
						rows={[
							{ key: "learning", value: "Functional programming", accent: true },
							{ key: "building", value: "Agent systems" },
							{ key: "reading", value: "Systems thinking" },
						]}
					/>
				</div>
			</div>
		</div>
	)
}
