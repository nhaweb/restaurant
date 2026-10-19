import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text" }),
    defineField({ name: "date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "dateLabel", type: "string" }),
    defineField({ name: "comments", type: "number", initialValue: 0 }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageUrl", type: "url" }),
    defineField({
      name: "content",
      type: "array",
      of: [{ type: "text" }],
      description: "Paragraphs of body copy.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "image" },
  },
});
