// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";
import clerk from '@clerk/astro'

// https://astro.build/config
export default defineConfig({
  site: "https://www.minersonline.uk",

  vite: {
    plugins: [
    ],
  },

  integrations: [
    clerk(),
    sitemap(),
  ],

  adapter: vercel()
});
