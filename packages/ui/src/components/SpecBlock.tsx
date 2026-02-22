interface SpecBlockProps {
	label: string
	rows: { key: string; value: string; accent?: boolean }[]
	className?: string
}

export function SpecBlock({ label, rows, className = "" }: SpecBlockProps) {
	return (
		<div className={`spec-block ${className}`} data-label={`// ${label}`}>
			{rows.map((row, i) => (
				<div key={row.key} className={`spec-row ${i === rows.length - 1 ? "spec-row-last" : ""}`}>
					<span className="spec-key">{row.key}</span>
					<span className={`spec-val ${row.accent ? "spec-val-accent" : ""}`}>{row.value}</span>
				</div>
			))}
		</div>
	)
}
