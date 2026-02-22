import Link from "next/link"

const links = [
	{ label: "GitHub", href: "https://github.com/phibkro" },
	{ label: "LinkedIn", href: "https://linkedin.com/in/phibkro" },
	{ label: "Email", href: "mailto:philip@phibkro.dev" },
	{ label: "RSS", href: "/rss.xml" },
]

export function Footer() {
	return (
		<footer className="border-t border-dashed border-[var(--line-strong)]">
			<div className="mx-auto grid max-w-[var(--max-w)] grid-cols-1 md:grid-cols-[var(--col-index)_1fr]">
				<span className="hidden h-full border-r border-dashed border-[var(--line-strong)] md:block" />
				<div className="flex items-center justify-between px-4 py-5">
					<span className="shrink-0 text-[0.55rem] tracking-[0.08em] whitespace-nowrap text-[var(--muted)]">
						© {new Date().getFullYear()} Philip Bjørknes Krogh
					</span>
					<div className="flex shrink-0">
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								target={link.href.startsWith("http") || link.href.startsWith("mailto") ? "_blank" : undefined}
								rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
								className="border-l border-dashed border-[var(--line-strong)] px-3 py-1 text-[0.55rem] tracking-[0.12em] uppercase text-[var(--muted)] no-underline transition-colors hover:text-[var(--accent2)]"
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
