"use client"

interface TagProps {
	label: string
	active?: boolean
	onClick?: () => void
	size?: "sm" | "md"
	className?: string
}

export function Tag({ label, active, onClick, size = "sm", className = "" }: TagProps) {
	const sizeClasses = size === "sm" ? "text-[0.45rem] px-2.5 py-1" : "text-[0.5rem] px-3 py-1"

	const stateClasses = active
		? "text-[var(--accent2)]"
		: "border-[var(--line-strong)] text-[var(--muted)] hover:bg-[var(--accent)]/12 hover:border-[var(--accent)] hover:text-[var(--accent2)]"

	const activeStyle = active
		? { backgroundColor: "oklch(58% 0.09 220 / 0.12)", borderColor: "var(--accent)" }
		: undefined

	const base = `inline-flex items-center tracking-[0.12em] uppercase border border-dashed transition-colors ${sizeClasses} ${stateClasses} ${className}`

	if (onClick) {
		return (
			<button type="button" onClick={onClick} className={`cursor-pointer ${base}`} style={activeStyle}>
				{label}
			</button>
		)
	}

	return <span className={base} style={activeStyle}>{label}</span>
}
