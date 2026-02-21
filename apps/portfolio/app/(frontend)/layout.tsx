import type { ReactNode } from "react"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import "./globals.css"

export default function FrontendLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			<main className="relative z-[2] pt-[var(--header-h)]">{children}</main>
			<Footer />
		</>
	)
}
