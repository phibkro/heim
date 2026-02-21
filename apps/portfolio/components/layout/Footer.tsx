import Link from "next/link"

const links = [
	{ label: "GitHub", href: "https://github.com/phibkro" },
	{ label: "LinkedIn", href: "https://linkedin.com/in/phibkro" },
]

export function Footer() {
	return (
		<footer className="border-t border-dashed border-[var(--line-strong)]">
			<div className="mx-auto grid max-w-[var(--max-w)] grid-cols-[var(--col-index)_1fr] items-center">
				<span className="flex h-full items-center justify-center border-r border-dashed border-[var(--line-strong)] py-4 text-[0.45rem] tracking-[0.08em] text-[var(--dim)]">
					©
				</span>
				<div className="flex items-center justify-between px-4 py-4">
					<span className="text-[0.5rem] tracking-[0.08em] text-[var(--dim)]">
						{new Date().getFullYear()} Philip Bjørknes Krogh
					</span>
					<div className="flex items-center gap-4">
						<span className="hidden text-[0.45rem] tracking-[0.08em] text-[var(--dim)] sm:inline">
							59.91°N 10.75°E
						</span>
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-[0.5rem] tracking-[0.08em] text-[var(--muted)] no-underline transition-colors hover:text-[var(--accent2)]"
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}
