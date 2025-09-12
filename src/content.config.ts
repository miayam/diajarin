import { defineCollection, z } from "astro:content";
import client from "../tina/__generated__/client";

const blog = defineCollection({
  loader: async () => {
    const postsResponse = await client.queries.blogConnection();

    // Ensure we return an array, even if edges is undefined
    const edges = postsResponse.data.blogConnection.edges || [];

    // Map Tina posts to the correct format for Astro
    return edges
      .filter((post): post is NonNullable<typeof post> => !!post?.node)
      .map((post) => {
        const node = post.node;
        if (!node?._sys) {
          throw new Error(
            `Missing _sys data for post: ${JSON.stringify(node)}`,
          );
        }

        return {
          id: node._sys.relativePath.replace(/\.mdx?$/, ""), // Generate clean URLs
          // Spread the node data (title, description, etc.)
          title: node.title || "",
          description: node.description || "",
          pubDate: new Date(node.pubDate || Date.now()),
          updatedDate: node.updatedDate
            ? new Date(node.updatedDate)
            : undefined,
          heroImage: node.heroImage || null,
          // Include Tina system info
          tinaInfo: {
            filename: node._sys.filename,
            basename: node._sys.basename,
            path: node._sys.path,
            relativePath: node._sys.relativePath,
          },
        };
      });
  },
  schema: z.object({
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().nullish(),
  }),
});

const page = defineCollection({
  loader: async () => {
    const postsResponse = await client.queries.pageConnection();

    // Ensure we return an array, even if edges is undefined
    const edges = postsResponse.data.pageConnection.edges || [];

    return edges
      .filter((p): p is NonNullable<typeof p> => !!p?.node)
      .map((p) => {
        const node = p.node;
        if (!node?._sys) {
          throw new Error(
            `Missing _sys data for page: ${JSON.stringify(node)}`,
          );
        }

        return {
          id: node._sys.relativePath.replace(/\.mdx?$/, ""), // Generate clean URLs
          // Spread the node data
          seoTitle: node.seoTitle || "",
          body: node.body,
          // Include Tina system info
          tinaInfo: {
            filename: node._sys.filename,
            basename: node._sys.basename,
            path: node._sys.path,
            relativePath: node._sys.relativePath,
          },
        };
      });
  },
  schema: z.object({
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }),
    seoTitle: z.string(),
    body: z.any(),
  }),
});

const post = defineCollection({
  loader: async () => {
    const postsResponse = await client.queries.postConnection();

    // Ensure we return an array, even if edges is undefined
    const edges = postsResponse.data.postConnection.edges || [];

    // Map Tina posts to the correct format for Astro
    return edges
      .filter((post): post is NonNullable<typeof post> => !!post?.node)
      .map((post) => {
        const node = post.node;
        if (!node?._sys) {
          throw new Error(
            `Missing _sys data for post: ${JSON.stringify(node)}`,
          );
        }

        return {
          id: node._sys.relativePath.replace(/\.mdx?$/, ""), // Generate clean URLs
          // Spread the node data (title, description, etc.)
          title: node.title || "",
          description: node.description || "",
          pubDate: new Date(node.pubDate || Date.now()),
          updatedDate: node.updatedDate
            ? new Date(node.updatedDate)
            : undefined,
          heroImage: node.heroImage || null,
          // Include Tina system info
          tinaInfo: {
            filename: node._sys.filename,
            basename: node._sys.basename,
            path: node._sys.path,
            relativePath: node._sys.relativePath,
          },
        };
      });
  },
  schema: z.object({
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().nullish(),
    author: z
      .object({
        name: z.string(),
        email: z.string().email(),
        bio: z.string().optional(),
      })
      .optional(),
    tags: z
      .array(
        z.object({
          name: z.string(),
          slug: z.string().url(),
          descriptoin: z.string().optional(),
        }),
      )
      .optional(),
    threads: z
      .array(
        z.object({
          name: z.string(),
          slug: z.string().url(),
          descriptoin: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

export const collections = { blog, page, post };
