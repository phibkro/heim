import { SpecBlock } from "@heim/ui"

export const revalidate = 3600

export default function HomePage() {
	return (
		<div className="mx-auto max-w-[var(--max-w)]">
			{/* Hero */}
			<section className="relative grid min-h-[calc(100vh-var(--header-h))] border-b border-dashed border-[var(--line-strong)] md:grid-cols-2">
				{/* L-bracket top-left */}
				<span className="pointer-events-none absolute top-4 left-4 h-4 w-4 border-t border-l border-[var(--dim)]" />
				{/* L-bracket bottom-right */}
				<span className="pointer-events-none absolute right-4 bottom-4 h-4 w-4 border-r border-b border-[var(--dim)]" />

				{/* Left column */}
				<div className="flex flex-col justify-between border-b border-dashed border-[var(--line-strong)] p-6 md:border-r md:border-b-0 md:p-12">
					<div className="hero-fade-1 text-[0.55rem] tracking-[0.1em] text-[var(--dim)]">
						59.91°N, 10.75°E · OSLO, NO
					</div>

					<h1 className="hero-fade-2 mt-8 font-[family-name:var(--font-display)] text-[clamp(3.5rem,7vw,7rem)] leading-[0.9] tracking-[0.05em] text-[var(--fg)]">
						Building
						<br />
						<span className="text-[var(--accent)]">Systems</span>
						<br />
						<span className="outline-text">That Last</span>
					</h1>

					<div className="hero-fade-3 mt-8">
						<div className="mb-5 inline-flex items-center gap-2 border border-dashed border-[var(--line-strong)] px-3 py-2 text-[0.58rem] tracking-[0.12em] uppercase text-[var(--muted)]">
							<span className="h-[5px] w-[5px] rounded-full bg-[var(--success)] [animation:pulse_2.5s_ease-in-out_infinite]" />
							Available · Spring 2026
						</div>
						<p className="max-w-[42ch] text-[0.8rem] leading-[1.9] text-[var(--muted)]">
							Developer building tools and interfaces. Currently exploring functional
							programming, agent systems, and the space between design and engineering.
						</p>
					</div>
				</div>

				{/* Right column */}
				<div className="flex flex-col justify-between p-6 md:p-12">
					<div className="hero-fade-4">
						<SpecBlock
							label="specification"
							rows={[
								{ key: "Entity", value: "Philip Bjørknes Krogh" },
								{ key: "Role", value: "Software Developer", accent: true },
								{ key: "Location", value: "Oslo, Norway" },
								{ key: "Stack", value: "TypeScript · React · Next.js" },
								{ key: "Interests", value: "FP · Architecture · Agents" },
								{ key: "Status", value: "Open to work", accent: true },
							]}
						/>
					</div>

					<div className="hero-fade-5 mt-6 flex flex-wrap">
						<a
							href="https://github.com/phibkro"
							className="flex-1 border border-dashed border-[var(--line-strong)] border-r-0 px-3 py-3 text-center text-[0.58rem] tracking-[0.12em] uppercase text-[var(--muted)] no-underline transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 hover:text-[var(--accent2)]"
						>
							GitHub
						</a>
						<a
							href="https://linkedin.com/in/phibkro"
							className="flex-1 border border-dashed border-[var(--line-strong)] border-r-0 px-3 py-3 text-center text-[0.58rem] tracking-[0.12em] uppercase text-[var(--muted)] no-underline transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 hover:text-[var(--accent2)]"
						>
							LinkedIn
						</a>
						<a
							href="mailto:philip@phibkro.dev"
							className="flex-1 border border-dashed border-[var(--line-strong)] border-r-0 px-3 py-3 text-center text-[0.58rem] tracking-[0.12em] uppercase text-[var(--muted)] no-underline transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 hover:text-[var(--accent2)]"
						>
							Email
						</a>
						{/* oxlint-disable-next-line nextjs/no-html-link-for-pages -- external file, not a Next.js route */}
						<a
							href="/cv"
							className="flex-1 border border-dashed border-[var(--line-strong)] px-3 py-3 text-center text-[0.58rem] tracking-[0.12em] uppercase text-[var(--muted)] no-underline transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 hover:text-[var(--accent2)]"
						>
							CV ↗
						</a>
					</div>
				</div>
			</section>

			<div className="px-6 py-4 text-[0.5rem] tracking-[0.08em] text-[var(--dim)]">
				© {new Date().getFullYear()} Philip Bjørknes Krogh
			</div>
		</div>
	)
}
