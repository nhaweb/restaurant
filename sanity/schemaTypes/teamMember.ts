import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageUrl", type: "url" }),
    defineField({ name: "sortOrder", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
