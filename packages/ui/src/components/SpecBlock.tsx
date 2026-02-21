interface SpecBlockProps {
	label: string
	rows: { key: string; value: string; accent?: boolean }[]
	className?: string
}

export function SpecBlock({ label, rows, className = "" }: SpecBlockProps) {
	return (
		<div className={`relative border border-dashed border-[var(--line-strong)] p-4 pt-5 ${className}`}>
			<span className="absolute top-[-0.6rem] left-3 bg-[var(--bg)] px-1 text-[0.5rem] font-medium tracking-[0.12em] uppercase text-[var(--muted)]">
				// {label}
			</span>
			<div className="flex flex-col">
				{rows.map((row, i) => (
					<div
						key={row.key}
						className={`flex justify-between py-1.5 text-[0.58rem] ${i < rows.length - 1 ? "border-b border-dashed border-[var(--line)]" : ""}`}
					>
						<span className="tracking-[0.08em] text-[var(--muted)]">{row.key}</span>
						<span className={`tracking-[0.08em] ${row.accent ? "text-[var(--accent2)]" : "text-[var(--fg)]"}`}>
							{row.value}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
