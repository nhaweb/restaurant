import { defineField, defineType } from "sanity";

export const restaurantSettings = defineType({
  name: "restaurantSettings",
  title: "Restaurant Settings",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "legalName", type: "string" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "shortDescription", type: "text" }),
    defineField({
      name: "cuisine",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "priceRange", type: "string" }),
    defineField({
      name: "address",
      type: "object",
      fields: [
        defineField({ name: "street", type: "string" }),
        defineField({ name: "locality", type: "string" }),
        defineField({ name: "region", type: "string" }),
        defineField({ name: "country", type: "string" }),
        defineField({ name: "display", type: "string" }),
      ],
    }),
    defineField({
      name: "phone",
      type: "object",
      fields: [
        defineField({ name: "display", type: "string" }),
        defineField({ name: "tel", type: "string" }),
      ],
    }),
    defineField({
      name: "zalo",
      type: "object",
      fields: [
        defineField({ name: "display", type: "string" }),
        defineField({ name: "href", type: "url" }),
      ],
    }),
    defineField({ name: "email", type: "string" }),
    defineField({
      name: "hours",
      type: "object",
      fields: [
        defineField({ name: "display", type: "string" }),
        defineField({ name: "opens", type: "string" }),
        defineField({ name: "closes", type: "string" }),
        defineField({
          name: "days",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "social",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "url" }),
          ],
        },
      ],
    }),
    defineField({ name: "mapsQuery", type: "string" }),
    defineField({ name: "copyright", type: "string" }),
  ],
  preview: {
    select: { title: "name" },
  },
});
