import { defineField, defineType } from "sanity";

export const menuCategory = defineType({
  name: "menuCategory",
  title: "Menu Category",
  type: "document",
  fields: [
    defineField({
      name: "categoryId",
      title: "Category ID",
      type: "string",
      description: "Stable id used in URLs (e.g. breakfast, lunch).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "sortOrder", type: "number" }),
  ],
  preview: {
    select: { title: "label", subtitle: "categoryId" },
  },
});
