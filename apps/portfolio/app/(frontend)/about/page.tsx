import { SectionHeader, SpecBlock } from "@heim/ui"
import { ScrollReveal } from "@/components/ScrollReveal"

export const revalidate = 3600

export default function AboutPage() {
	return (
		<div className="mx-auto max-w-[var(--max-w)]">
			<SectionHeader index="04" title="About" meta="v1.0" />

			<div className="grid md:grid-cols-2">
				{/* Text column */}
				<ScrollReveal className="h-full">
					<div className="h-full border-b border-dashed border-[var(--line-strong)] p-6 md:border-r md:border-b-0 md:p-8">
						<div className="flex flex-col gap-4 text-[0.78rem] leading-[1.95] text-[var(--muted)]">
							<p>
								Developer based in Oslo, Norway. I build tools and interfaces at the
								intersection of design and engineering, with a focus on making complex
								systems feel simple.
							</p>
							<p>
								Currently exploring <strong className="font-normal text-[var(--fg)]">functional programming, agent systems</strong>,
								and the craft of building software that respects both the user and the machine.
							</p>
							<p>
								When not coding, you can find me reading about <em className="not-italic text-[var(--accent2)]">systems thinking</em>,
								experimenting with new tools, or exploring the Norwegian outdoors.
							</p>
						</div>
					</div>
				</ScrollReveal>

				{/* Spec tables column */}
				<ScrollReveal stagger={1}>
					<div className="flex flex-col gap-6 p-6 md:p-8">
						<SpecBlock
							label="identity"
							rows={[
								{ key: "Location", value: "Oslo, Norway" },
								{ key: "Coordinates", value: "59.91°N 10.75°E" },
								{ key: "Timezone", value: "CET (UTC+1)" },
							]}
						/>
						<SpecBlock
							label="technical"
							rows={[
								{ key: "Primary", value: "TypeScript, React, Next.js" },
								{ key: "Languages", value: "TypeScript · Rust · Python" },
								{ key: "Tools", value: "Neovim · Git · Docker" },
								{ key: "Exploring", value: "Effect-TS, Lean 4" },
							]}
						/>
						<SpecBlock
							label="currently"
							rows={[
								{ key: "Building", value: "Agent systems, this site" },
								{ key: "Reading", value: "Systems thinking" },
							]}
						/>
					</div>
				</ScrollReveal>
			</div>

			<div className="px-6 py-4 text-[0.5rem] tracking-[0.08em] text-[var(--dim)]">
				© {new Date().getFullYear()} Philip Bjørknes Krogh
			</div>
		</div>
	)
}
