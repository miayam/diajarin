import type { Collection } from "tinacms";

export const TagCollection: Collection = {
  name: "tag",
  label: "Tags",
  path: "src/content/tags",
  format: "json",
  fields: [
    {
      type: "string",
      name: "name",
      label: "Name",
      required: true,
      isTitle: true,
    },
    {
      type: "string",
      name: "slug",
      label: "slug",
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      ui: {
        component: "textarea",
      },
    },
  ],
};
