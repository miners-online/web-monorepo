import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import globals from '@/globals';

const authorSchema = z.string().transform((author, ctx) => {
    const obj = globals.authors[author]

    if (!obj) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Author not found in site config',
        })

        return z.NEVER
    }

    return {
        id: author,
        data: obj
    }
})

export type Author = z.infer<typeof authorSchema>;


// 4. Define a `loader` and `schema` for each collection
const news = defineCollection({
    loader: glob({ base: './content/news', pattern: '**/*.{md,mdx}' }), schema: z.object({
        title: z.string().optional().default("Untitled"),
        description: z.string().optional().default("No description provided."),
        date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date format' }),
        tags: z.array(z.string()).optional().default([]),
        authors: z.array(authorSchema),
        category: z.string().default("general"),
    }),
});

export const collections = { news };
