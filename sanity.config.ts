"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "foodtuck",
  title: "Foodtuck",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  basePath: "/studio",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Restaurant Settings")
              .child(
                S.document()
                  .schemaType("restaurantSettings")
                  .documentId("restaurantSettings"),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "restaurantSettings",
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: sanityApiVersion }),
  ],
});
