import type { Collection } from "tinacms";

export const PostCollection: Collection = {
  name: "post",
  label: "Posts",
  path: "src/content/posts",
  format: "mdx",
  ui: {
    router({ document }) {
      return `/posts/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "string",
    },
    {
      name: "pubDate",
      label: "Publication Date",
      type: "datetime",
    },
    {
      name: "updatedDate",
      label: "Updated Date",
      type: "datetime",
    },
    {
      name: "heroImage",
      label: "Hero Image",
      type: "image",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
    {
      label: "Author",
      name: "author",
      type: "reference",
      collections: ["author"],
    },
  ],
};
