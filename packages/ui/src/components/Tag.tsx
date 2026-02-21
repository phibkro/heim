"use client"

interface TagProps {
	label: string
	active?: boolean
	onClick?: () => void
	size?: "sm" | "md"
	className?: string
}

export function Tag({ label, active, onClick, size = "sm", className = "" }: TagProps) {
	const sizeClasses = size === "sm" ? "text-[0.5rem] px-2 py-0.5" : "text-[0.58rem] px-3 py-1"

	const stateClasses = active
		? "bg-[var(--accent)]/12 border-[var(--accent)] text-[var(--accent2)]"
		: "border-[var(--line-strong)] text-[var(--accent)] hover:bg-[var(--accent)]/12 hover:border-[var(--accent)] hover:text-[var(--accent2)]"

	const base = `inline-flex items-center tracking-[0.12em] uppercase border border-dashed transition-colors ${sizeClasses} ${stateClasses} ${className}`

	if (onClick) {
		return (
			<button type="button" onClick={onClick} className={`cursor-pointer ${base}`}>
				{label}
			</button>
		)
	}

	return <span className={base}>{label}</span>
}
