"use client"

import { useEffect, useRef } from "react"

export function ScrollReveal({
	children,
	className,
	stagger = 0,
}: {
	children: React.ReactNode
	className?: string
	stagger?: number
}) {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = ref.current
		if (!el) return

		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
		if (prefersReducedMotion) {
			el.classList.add("reveal-visible")
			return
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.style.animationDelay = `${stagger * 80}ms`
					el.classList.add("reveal-visible")
					observer.unobserve(el)
				}
			},
			{ threshold: 0.08 },
		)

		observer.observe(el)
		return () => observer.disconnect()
	}, [stagger])

	return (
		<div ref={ref} className={`reveal ${className ?? ""}`}>
			{children}
		</div>
	)
}
