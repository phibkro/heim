import type { ReactNode } from "react"

interface AnnotationLabelProps {
	children: ReactNode
	withLine?: boolean
	className?: string
}

export function AnnotationLabel({ children, withLine, className = "" }: AnnotationLabelProps) {
	return (
		<span
			className={`inline-flex items-center gap-2 text-[0.5rem] font-medium tracking-[0.12em] uppercase text-[var(--muted)] ${className}`}
		>
			<span>// {children}</span>
			{withLine && <span className="h-px flex-1 border-t border-dashed border-[var(--line)]" />}
		</span>
	)
}
