import { AnnotationLabel, BtnCrosshair, SpecBlock } from "@heim/ui"

export const revalidate = 3600

export default function HomePage() {
	return (
		<div className="mx-auto max-w-[var(--max-w)]">
			{/* Hero */}
			<section className="grid min-h-[70vh] items-center border-b border-dashed border-[var(--line)] px-4 py-16 md:grid-cols-2 md:gap-8">
				<div>
					<AnnotationLabel>identity</AnnotationLabel>
					<h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(3.5rem,7vw,7rem)] leading-[0.9] tracking-[-0.02em] text-[var(--fg)]">
						Philip
						<br />
						Bjørknes
						<br />
						Krogh
					</h1>
					<p className="mt-4 max-w-md text-[0.72rem] leading-relaxed text-[var(--muted)]">
						Developer building tools and interfaces. Currently exploring functional programming,
						agent systems, and the space between design and engineering.
					</p>
					<div className="mt-6 flex gap-3">
						<BtnCrosshair href="/projects">View Projects</BtnCrosshair>
						<BtnCrosshair href="/writing">Read Writing</BtnCrosshair>
					</div>
				</div>

				<div className="mt-8 flex flex-col gap-4 md:mt-0">
					<SpecBlock
						label="specification"
						rows={[
							{ key: "role", value: "Developer" },
							{ key: "location", value: "Oslo, Norway", accent: true },
							{ key: "focus", value: "Web · Systems · Design" },
							{ key: "stack", value: "TypeScript · React · Node" },
						]}
					/>
					<div className="flex items-center gap-2 px-1">
						<span className="h-2 w-2 bg-[var(--success)]" />
						<span className="text-[0.5rem] tracking-[0.08em] text-[var(--muted)]">
							Available for opportunities
						</span>
					</div>
				</div>
			</section>

			{/* Links */}
			<section className="border-b border-dashed border-[var(--line)] px-4 py-8">
				<AnnotationLabel withLine>links</AnnotationLabel>
				<div className="mt-4 flex flex-wrap gap-4">
					<BtnCrosshair href="https://github.com/phibkro">GitHub</BtnCrosshair>
					<BtnCrosshair href="https://linkedin.com/in/phibkro">LinkedIn</BtnCrosshair>
					<BtnCrosshair href="/about">About</BtnCrosshair>
				</div>
			</section>
		</div>
	)
}
