import { defineCollection } from 'astro:content';

import { glob, file } from 'astro/loaders';

import { z } from 'astro/zod';

const docs = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date format' }),
        tags: z.array(z.string()).optional(),
    }),
    loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: "./docs" }),
});

export const collections = { docs };