import { Bebas_Neue, IBM_Plex_Mono } from "next/font/google"
import type { ReactNode } from "react"

const bebasNeue = Bebas_Neue({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-display",
})

const ibmPlexMono = IBM_Plex_Mono({
	weight: ["300", "400", "500"],
	subsets: ["latin"],
	variable: "--font-mono",
})

export const metadata = {
	title: "Philip Bjørknes Krogh",
	description: "Developer portfolio",
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className={`${bebasNeue.variable} ${ibmPlexMono.variable}`}>
			<body>{children}</body>
		</html>
	)
}
