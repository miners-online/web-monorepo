import { defineCollection } from 'astro:content';

import { glob } from 'astro/loaders';

import { z } from 'astro/zod';
import { siteConfig } from './site.config';

const templates = ["documentation", "plain"] as const;

const content = defineCollection({
    schema: z.object({
        title: z.string().optional().default("Untitled"),
        template: z.enum(templates).optional().default("plain"),
        description: z.string().optional().default(siteConfig.meta.description),
        date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date format' }),
        tags: z.array(z.string()).optional(),
    }),
    loader: glob({ pattern: ["*.{md,mdx}", "**/*.{md,mdx}"], base: "./content" }),
});

export const collections = { content };