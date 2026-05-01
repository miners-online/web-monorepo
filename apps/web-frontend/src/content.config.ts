import { defineCollection } from 'astro:content';

import { glob } from 'astro/loaders';

import { z } from 'astro/zod';
import { siteConfig } from './site.config';

const commonFields = {
    title: z.string().optional().default("Untitled"),
    description: z.string().optional().default(siteConfig.meta.description),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date format' }),
    tags: z.array(z.string()).optional(),
};

const documentationTemplate = z.object({
    template: z.literal("documentation"),
    ...commonFields
});

const plainTemplate = z.object({
    template: z.literal("plain"),
    ...commonFields
});

const blogTemplate = z.object({
    template: z.literal("blog"),
    ...commonFields,
    authors: z.array(z.string().refine((author) => author in siteConfig.blog.authors, { message: 'Author not found in site config' })),
});

const contentSchema = z.preprocess((input) => {
  if (input && typeof input === 'object' && !Array.isArray(input)) {
    const obj = input as Record<string, unknown>;
    if (!('template' in obj)) {
      return { ...obj, template: 'plain' };
    }
  }
  return input;
}, z.discriminatedUnion("template", [
  documentationTemplate,
  plainTemplate,
  blogTemplate,
]));

export const collections = {
  content: defineCollection({
    schema: contentSchema,
    loader: glob({ pattern: ["*.{md,mdx}", "**/*.{md,mdx}"], base: "./content" }),
  }),
};