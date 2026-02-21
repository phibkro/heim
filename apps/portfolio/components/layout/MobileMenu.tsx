"use client"

import Link from "next/link"
import { useState } from "react"

interface NavItem {
	label: string
	href: string
	index: string
}

export function MobileMenu({ nav }: { nav: NavItem[] }) {
	const [open, setOpen] = useState(false)

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				className="flex cursor-pointer flex-col gap-1 p-2 md:hidden"
				aria-label="Open menu"
			>
				<span className="block h-px w-4 bg-[var(--fg)]" />
				<span className="block h-px w-4 bg-[var(--fg)]" />
				<span className="block h-px w-4 bg-[var(--fg)]" />
			</button>

			{open && (
				<div className="fixed inset-0 z-[100] flex flex-col bg-[var(--bg)] p-6 md:hidden">
					<div className="flex justify-end">
						<button
							type="button"
							onClick={() => setOpen(false)}
							className="cursor-pointer p-2 text-[var(--fg)]"
							aria-label="Close menu"
						>
							<span className="block text-xl leading-none">×</span>
						</button>
					</div>

					<nav className="flex flex-1 flex-col items-center justify-center gap-6">
						{nav.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setOpen(false)}
								className="flex items-baseline gap-3 font-[family-name:var(--font-display)] text-[2rem] tracking-[-0.02em] text-[var(--fg)] no-underline transition-colors hover:text-[var(--accent2)]"
							>
								<span className="text-[0.7rem] text-[var(--dim)]">{item.index}</span>
								{item.label}
							</Link>
						))}
					</nav>

					<div className="text-center text-[0.45rem] tracking-[0.08em] text-[var(--dim)]">
						59.91°N 10.75°E
					</div>
				</div>
			)}
		</>
	)
}
