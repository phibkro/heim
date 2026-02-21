import type { CollectionConfig } from "payload"
import { createRevalidateHook } from "./hooks/revalidate"

export const Posts: CollectionConfig = {
	slug: "posts",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "status", "publishedAt", "tags"],
	},
	access: {
		read: ({ req }) =>
			req.user ? true : { status: { equals: "published" } },
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
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
		{
			name: "content",
			type: "richText",
		},
		{
			name: "excerpt",
			type: "textarea",
		},
		{
			name: "publishedAt",
			type: "date",
			required: true,
			admin: {
				date: {
					pickerAppearance: "dayOnly",
				},
			},
		},
		{
			name: "tags",
			type: "relationship",
			relationTo: "tags",
			hasMany: true,
		},
		{
			name: "status",
			type: "select",
			defaultValue: "draft",
			options: [
				{ label: "Draft", value: "draft" },
				{ label: "Published", value: "published" },
			],
		},
	],
	hooks: {
		afterChange: [createRevalidateHook("posts")],
		beforeValidate: [
			({ data }) => {
				if (data?.title && !data.slug) {
					data.slug = data.title
						.toLowerCase()
						.replace(/[^a-z0-9]+/g, "-")
						.replace(/^-|-$/g, "")
				}
				return data
			},
		],
	},
}
