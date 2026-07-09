// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/ui', '@clerk/nuxt', 'nuxt-studio'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_MINERS_ONLINE_API!,
    },
  },
  studio: {
    repository: {
      provider: 'github',
      repo: 'miners-online/web-monorepo',
      branch: 'main',
      rootDir: 'apps/web-frontend2',
    }
  },
  compatibilityDate: '2024-04-03',
})