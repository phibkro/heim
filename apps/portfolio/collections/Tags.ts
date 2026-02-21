import type { CollectionConfig } from "payload"
import { createRevalidateHook } from "./hooks/revalidate"

export const Tags: CollectionConfig = {
	slug: "tags",
	admin: {
		useAsTitle: "name",
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			unique: true,
		},
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			admin: {
				readOnly: true,
			},
		},
	],
	hooks: {
		afterChange: [createRevalidateHook("tags")],
		beforeValidate: [
			({ data }) => {
				if (data?.name && !data.slug) {
					data.slug = data.name
						.toLowerCase()
						.replace(/[^a-z0-9]+/g, "-")
						.replace(/^-|-$/g, "")
				}
				return data
			},
		],
	},
}
