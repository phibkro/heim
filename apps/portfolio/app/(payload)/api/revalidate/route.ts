import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

const COLLECTION_PATHS: Record<string, string[]> = {
	posts: ["/writing", "/tags"],
	projects: ["/projects", "/tags"],
	"now-entries": ["/now", "/tags"],
	tags: ["/tags", "/writing", "/projects", "/now"],
}

export async function POST(req: NextRequest) {
	const secret = req.headers.get("x-revalidate-secret")
	if (secret !== process.env.REVALIDATE_SECRET) {
		return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
	}

	const body = (await req.json()) as { collection?: string; slug?: string }
	const collection = body.collection ?? ""
	const paths = COLLECTION_PATHS[collection] ?? []

	for (const path of paths) {
		revalidatePath(path)
	}

	if (collection === "posts" && body.slug) {
		revalidatePath(`/writing/${body.slug}`)
	}

	if (collection === "tags" && body.slug) {
		revalidatePath(`/tags/${body.slug}`)
	}

	revalidatePath("/")

	return NextResponse.json({ revalidated: true, paths })
}
