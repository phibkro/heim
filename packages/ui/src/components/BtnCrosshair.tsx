"use client"

import type { ReactNode } from "react"

interface BtnCrosshairProps {
	children: ReactNode
	href?: string
	onClick?: () => void
	className?: string
}

export function BtnCrosshair({ children, href, onClick, className = "" }: BtnCrosshairProps) {
	const base = `group relative inline-flex items-center gap-2 px-4 py-2 text-[0.58rem] tracking-[0.08em] uppercase text-[var(--fg)] transition-colors hover:text-[var(--accent2)] ${className}`

	const brackets = (
		<>
			<span className="pointer-events-none absolute top-0 left-0 h-[10px] w-[10px] border-t border-l border-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100" />
			<span className="pointer-events-none absolute right-0 bottom-0 h-[10px] w-[10px] border-r border-b border-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100" />
		</>
	)

	if (href) {
		return (
			<a href={href} className={base}>
				{brackets}
				{children}
			</a>
		)
	}

	return (
		<button type="button" onClick={onClick} className={`cursor-pointer ${base}`}>
			{brackets}
			{children}
		</button>
	)
}
