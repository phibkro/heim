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
			<div className="mx-auto flex h-full max-w-[var(--max-w)] items-center justify-between px-4">
				<Link href="/" className="flex items-baseline gap-3 no-underline">
					<span className="font-[family-name:var(--font-display)] text-[1.4rem] tracking-[-0.02em] text-[var(--fg)]">
						PBK
					</span>
					<span className="hidden text-[0.45rem] tracking-[0.18em] uppercase text-[var(--dim)] sm:inline">
						Developer Portfolio
					</span>
				</Link>

				<div className="flex items-center gap-1">
					<span className="mr-4 hidden text-[0.45rem] tracking-[0.08em] text-[var(--dim)] lg:inline">
						59.91°N 10.75°E
					</span>

					<nav className="hidden items-center gap-1 md:flex">
						{nav.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="group flex items-baseline gap-1.5 px-3 py-1.5 text-[0.58rem] tracking-[0.08em] uppercase text-[var(--muted)] no-underline transition-colors hover:text-[var(--fg)]"
							>
								<span className="text-[0.45rem] text-[var(--dim)]">{item.index}</span>
								{item.label}
							</Link>
						))}
					</nav>

					<MobileMenu nav={nav} />
				</div>
			</div>
		</header>
	)
}
