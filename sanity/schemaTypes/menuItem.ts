import { defineField, defineType } from "sanity";

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({
      name: "itemId",
      title: "Item ID",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text" }),
    defineField({
      name: "price",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({ name: "calories", type: "number" }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Breakfast", value: "breakfast" },
          { title: "Lunch", value: "lunch" },
          { title: "Dinner", value: "dinner" },
          { title: "Dessert", value: "dessert" },
          { title: "Drink", value: "drink" },
          { title: "Snack", value: "snack" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dietary",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Vegetarian", value: "vegetarian" },
          { title: "Vegan", value: "vegan" },
          { title: "Gluten-free", value: "gluten-free" },
          { title: "Spicy", value: "spicy" },
        ],
      },
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "imageUrl",
      title: "Image URL (fallback)",
      type: "url",
      description: "Use when not uploading to Sanity CDN.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "image" },
  },
});
