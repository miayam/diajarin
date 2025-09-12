import type { Collection } from "tinacms";

export const ThreadCollection: Collection = {
  name: "thread",
  label: "Threads",
  path: "src/content/threads",
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
      type: "rich-text",
      name: "description",
      label: "Description",
    },
  ],
};
