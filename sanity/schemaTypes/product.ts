import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Shop Product",
  type: "document",
  fields: [
    defineField({
      name: "productId",
      title: "Product ID",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text" }),
    defineField({
      name: "price",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({ name: "compareAtPrice", type: "number" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageUrl", title: "Primary image URL", type: "url" }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "url" }],
    }),
    defineField({ name: "category", type: "string" }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "inStock", type: "boolean", initialValue: true }),
    defineField({ name: "rating", type: "number" }),
    defineField({ name: "reviewCount", type: "number" }),
    defineField({ name: "onSale", type: "boolean" }),
    defineField({ name: "featured", type: "boolean" }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "image" },
  },
});
