import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "testimonialId",
      title: "Testimonial ID",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "quote", type: "text", validation: (r) => r.required() }),
    defineField({ name: "avatar", type: "image", options: { hotspot: true } }),
    defineField({ name: "avatarUrl", type: "url" }),
    defineField({
      name: "highlight",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "price", type: "number" }),
        defineField({ name: "description", type: "text" }),
        defineField({ name: "imageUrl", type: "url" }),
        defineField({ name: "rating", type: "number" }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
