import type { CollectionConfig } from "payload"
import { createRevalidateHook } from "./hooks/revalidate"

export const NowEntries: CollectionConfig = {
	slug: "now-entries",
	admin: {
		useAsTitle: "content",
		defaultColumns: ["content", "date", "tags"],
	},
	defaultSort: "-date",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "content",
			type: "textarea",
			required: true,
			maxLength: 200,
		},
		{
			name: "date",
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
			name: "linkedPost",
			type: "relationship",
			relationTo: "posts",
			hasMany: false,
		},
	],
	hooks: {
		afterChange: [createRevalidateHook("now-entries")],
	},
}
