import type { CollectionConfig } from "payload"
import { createRevalidateHook } from "./hooks/revalidate"

export const Projects: CollectionConfig = {
	slug: "projects",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "year", "featured", "tags"],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "name",
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
			name: "description",
			type: "textarea",
			required: true,
		},
		{
			name: "longDescription",
			type: "richText",
		},
		{
			name: "url",
			type: "text",
		},
		{
			name: "repoUrl",
			type: "text",
		},
		{
			name: "year",
			type: "number",
			required: true,
		},
		{
			name: "featured",
			type: "checkbox",
			defaultValue: false,
		},
		{
			name: "tags",
			type: "relationship",
			relationTo: "tags",
			hasMany: true,
		},
		{
			name: "order",
			type: "number",
		},
	],
	hooks: {
		afterChange: [createRevalidateHook("projects")],
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
