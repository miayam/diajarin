import type { Collection } from "tinacms";

export const AuthorCollection: Collection = {
  name: "author",
  label: "Author",
  path: "src/content/author",
  format: "json",
  fields: [
    {
      type: "string",
      name: "name",
      label: "Name",
      required: true,
    },
    {
      type: "string",
      name: "email",
      label: "Email",
    },
  ],
};
