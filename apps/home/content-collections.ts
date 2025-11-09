import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

// for more information on configuration, visit:
// https://www.content-collections.dev/docs/configuration

const blog = defineCollection({
  name: "blog",
  directory: "content/blog",
  include: "*.md",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    author: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [blog],
});
