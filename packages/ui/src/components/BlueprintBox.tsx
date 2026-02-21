import type { ReactNode } from "react"

interface BlueprintBoxProps {
	children: ReactNode
	className?: string
	corners?: boolean
}

export function BlueprintBox({ children, className = "", corners }: BlueprintBoxProps) {
	return (
		<div className={`relative border border-dashed border-[var(--line-strong)] ${className}`}>
			{corners && (
				<>
					<span className="pointer-events-none absolute top-0 left-0 h-[10px] w-[10px] border-t border-l border-[var(--accent)]" />
					<span className="pointer-events-none absolute top-0 right-0 h-[10px] w-[10px] border-t border-r border-[var(--accent)]" />
					<span className="pointer-events-none absolute bottom-0 left-0 h-[10px] w-[10px] border-b border-l border-[var(--accent)]" />
					<span className="pointer-events-none absolute bottom-0 right-0 h-[10px] w-[10px] border-b border-r border-[var(--accent)]" />
				</>
			)}
			{children}
		</div>
	)
}
