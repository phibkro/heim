import type { ReactNode } from "react"

interface CrosshairTargetProps {
	children: ReactNode
	className?: string
	size?: number
}

export function CrosshairTarget({ children, className = "", size = 10 }: CrosshairTargetProps) {
	return (
		<div className={`relative ${className}`}>
			<span
				className="pointer-events-none absolute top-0 left-0 border-t border-l border-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100"
				style={{ width: size, height: size }}
			/>
			<span
				className="pointer-events-none absolute right-0 bottom-0 border-r border-b border-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100"
				style={{ width: size, height: size }}
			/>
			{children}
		</div>
	)
}
