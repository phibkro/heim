"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

interface NavItem {
	label: string
	href: string
	index: string
}

function MobileOverlay({ nav, onClose }: { nav: NavItem[]; onClose: () => void }) {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		requestAnimationFrame(() => setVisible(true))
	}, [])

	return createPortal(
		<div
			className="fixed inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-300 md:hidden"
			style={{
				margin: "1rem",
				border: "1px dashed var(--line-strong)",
				background: "oklch(10% 0.015 220 / 0.97)",
				opacity: visible ? 1 : 0,
			}}
		>
			<nav className="flex flex-col items-center">
				{nav.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						onClick={onClose}
						className="w-full px-12 py-4 text-center font-[family-name:var(--font-display)] text-[3rem] tracking-[0.15em] text-[var(--muted)] no-underline transition-colors hover:text-[var(--accent2)]"
						style={{ borderBottom: "1px dashed var(--line)" }}
					>
						{item.label}
					</Link>
				))}
			</nav>
		</div>,
		document.body,
	)
}

export function MobileMenu({ nav }: { nav: NavItem[] }) {
	const [open, setOpen] = useState(false)

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="ml-auto flex cursor-pointer flex-col items-center justify-center gap-[5px] overflow-hidden border-l border-dashed border-[var(--line-strong)] bg-transparent px-5 md:hidden"
				aria-label={open ? "Close menu" : "Open menu"}
			>
				<span
					className="block h-px w-5 bg-[var(--muted)] transition-transform duration-300"
					style={open ? { transform: "rotate(45deg) translate(2px, 2px)" } : undefined}
				/>
				<span
					className="block h-px w-5 bg-[var(--muted)] transition-opacity duration-300"
					style={open ? { opacity: 0 } : undefined}
				/>
				<span
					className="block h-px w-5 bg-[var(--muted)] transition-transform duration-300"
					style={open ? { transform: "rotate(-45deg) translate(2px, -2px)" } : undefined}
				/>
			</button>

			{open && <MobileOverlay nav={nav} onClose={() => setOpen(false)} />}
		</>
	)
}
