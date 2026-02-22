import Link from "next/link"
import { MobileMenu } from "./MobileMenu"

const nav = [
	{ label: "Projects", href: "/projects", index: "01" },
	{ label: "Writing", href: "/writing", index: "02" },
	{ label: "Now", href: "/now", index: "03" },
	{ label: "About", href: "/about", index: "04" },
]

export function Header() {
	return (
		<header className="fixed top-0 right-0 left-0 z-50 h-[var(--header-h)] border-b border-dashed border-[var(--line-strong)] bg-[var(--bg)]/92 backdrop-blur-[12px]">
			<div className="mx-auto flex h-full max-w-[var(--max-w)] items-stretch">
				<Link
					href="/"
					className="flex shrink-0 flex-col justify-center gap-0.5 border-r border-dashed border-[var(--line-strong)] px-4 no-underline md:px-6"
				>
					<span className="font-[family-name:var(--font-display)] text-[1.2rem] leading-none tracking-[0.12em] text-[var(--fg)]">
						Philip Krogh
					</span>
					<span className="text-[0.5rem] tracking-[0.18em] uppercase text-[var(--muted)]">
						Software Architect
					</span>
				</Link>

				<div className="hidden items-center border-r border-dashed border-[var(--line-strong)] px-5 text-[0.52rem] tracking-[0.1em] whitespace-nowrap text-[var(--dim)] lg:flex">
					59.91°N · 10.75°E
				</div>

				<nav className="ml-auto hidden md:flex">
					{nav.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="flex flex-col items-center justify-center gap-0.5 border-l border-dashed border-[var(--line-strong)] px-5 text-[0.6rem] tracking-[0.15em] uppercase text-[var(--muted)] no-underline transition-colors hover:bg-[var(--accent)]/5 hover:text-[var(--accent2)]"
						>
							<span className="text-[0.45rem] text-[var(--dim)]">{item.index}</span>
							{item.label}
						</Link>
					))}
				</nav>

				<MobileMenu nav={nav} />
			</div>
		</header>
	)
}
