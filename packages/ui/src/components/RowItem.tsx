import type { ReactNode } from "react"

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
			className={`group flex border-b border-dashed border-[var(--line)] transition-colors hover:bg-[var(--bg2)]/50 ${className}`}
		>
			<div className="hidden shrink-0 items-center justify-center border-r border-dashed border-[var(--line-strong)] text-[0.45rem] tracking-[0.08em] text-[var(--dim)] md:flex" style={{ width: "var(--col-index)" }}>
				{index}
			</div>
			<div className="crosshair-content min-w-0 flex-1 px-4 py-4 md:px-6">{children}</div>
			{side && (
				<div className="hidden shrink-0 flex-col items-end justify-center gap-1 border-l border-dashed border-[var(--line)] px-6 py-4 text-[0.5rem] tracking-[0.08em] text-[var(--muted)] md:flex" style={{ minWidth: "140px" }}>
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
