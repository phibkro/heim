import type { ReactNode } from "react"
import { CrosshairTarget } from "./CrosshairTarget"

interface RowItemProps {
	index: string
	children: ReactNode
	side?: ReactNode
	href?: string
	className?: string
}

export function RowItem({ index, children, side, href, className = "" }: RowItemProps) {
	const content = (
		<div
			className={`group grid grid-cols-[var(--col-index)_1fr_auto] border-b border-dashed border-[var(--line)] transition-colors hover:bg-[var(--bg2)]/50 ${className}`}
		>
			<span className="hidden items-center justify-center border-r border-dashed border-[var(--line)] text-[0.45rem] tracking-[0.08em] text-[var(--dim)] md:flex">
				{index}
			</span>
			<CrosshairTarget className="px-4 py-4">{children}</CrosshairTarget>
			{side && (
				<div className="flex items-center px-4 text-[0.5rem] tracking-[0.08em] text-[var(--muted)]">
					{side}
				</div>
			)}
		</div>
	)

	if (href) {
		return (
			<a href={href} className="block no-underline">
				{content}
			</a>
		)
	}

	return content
}
