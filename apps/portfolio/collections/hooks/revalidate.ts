import type { CollectionAfterChangeHook } from "payload"

export function createRevalidateHook(collection: string): CollectionAfterChangeHook {
	return async ({ doc }) => {
		const secret = process.env.REVALIDATE_SECRET
		if (!secret) return doc

		try {
			const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000"
			await fetch(`${baseUrl}/api/revalidate`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-revalidate-secret": secret,
				},
				body: JSON.stringify({
					collection,
					slug: "slug" in doc ? doc.slug : undefined,
				}),
			})
		} catch {
			// Revalidation is best-effort
		}

		return doc
	}
}
