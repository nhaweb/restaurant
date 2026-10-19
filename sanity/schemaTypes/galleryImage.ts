import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({
      name: "imageId",
      title: "Image ID",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageUrl", type: "url" }),
    defineField({ name: "alt", type: "string", validation: (r) => r.required() }),
    defineField({ name: "sortOrder", type: "number" }),
  ],
  preview: {
    select: { title: "alt", media: "image" },
  },
});
