import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

import siteConfig from './app/site.config';

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            type: 'page',
            source: 'blog/**/*.md',
            schema: z.object({
                title: z.string().optional().default("Untitled"),
                description: z.string().optional().default("No description provided."),
                date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date format' }),
                tags: z.array(z.string()).optional(),
                authors: z.array(z.string().refine((author) => author in siteConfig.authors, { message: 'Author not found in site config' })).optional(),
                category: z.string().optional().default("general"),
            })
        })
    }
})