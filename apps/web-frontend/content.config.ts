import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const newsSchema = z.object({
  title: z.string().optional().default("Untitled"),
  description: z.string().optional().default("No description provided."),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date format' }),
  tags: z.array(z.string()).optional().default([]),
  authors: z.array(z.object({
    name: z.string(),
    to: z.string().url(),
    avatar: z.object({
      src: z.string().url(),
    }).optional(),
  })),
  category: z.string().default("general"),
});

export default defineContentConfig({
  collections: {
    news: defineCollection({
      type: 'page',
      source: 'news/**',
      schema: newsSchema
    }),
  },
})
