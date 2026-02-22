interface SectionHeaderProps {
	index: string
	title: string
	meta?: string
	className?: string
}

export function SectionHeader({ index, title, meta, className = "" }: SectionHeaderProps) {
	return (
		<div
			className={`sticky top-[var(--header-h)] z-10 grid grid-cols-[var(--col-index)_1fr] border-b border-dashed border-[var(--line-strong)] bg-[var(--bg)]/92 backdrop-blur-[12px] ${className}`}
		>
			<span className="flex items-center justify-center border-r border-dashed border-[var(--line-strong)] py-3 text-[0.5rem] tracking-[0.15em] text-[var(--dim)] [transform:rotate(180deg)] [writing-mode:vertical-rl]">
				{index}
			</span>
			<div className="flex items-center justify-between px-4 py-3">
				<span className="font-[var(--font-display)] text-[1.1rem] tracking-[-0.02em] uppercase text-[var(--fg)]">
					{title}
				</span>
				{meta && (
					<span className="text-[0.5rem] tracking-[0.08em] text-[var(--muted)]">{meta}</span>
				)}
			</div>
		</div>
	)
}
