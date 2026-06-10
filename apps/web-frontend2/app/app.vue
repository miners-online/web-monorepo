<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
    { rel: 'icon', href: '/favicon-256x256.png', sizes: '256x256', type: 'image/png' },
    { rel: 'icon', href: '/favicon-160x160.png', sizes: '160x160', type: 'image/png' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Miners Online'
const description = 'A Minecraft minigame server network with a variety of fun and engaging game modes. Members get exclusive access to separate servers.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})

const columns: FooterColumn[] = [
  {
    label: 'Resources',
    children: [
      {
        label: 'Documentation',
        to: '/docs',
      },
      {
        label: 'Blog',
        to: '/blog',
      },
      {
        label: 'Getting Started',
        to: '/docs/getting-started',
      },
      {
        label: 'Server Rules',
        to: '/docs/rules',
      },
      {
        label: 'FAQ',
        to: '/docs/faq',
      }
    ]
  },
  {
    label: 'Community',
    children: [
      {
        label: 'Miners Online Discord',
        to: 'https://discord.gg/aeRReEaNnm'
      },
      {
        label: 'Miners Online GitHub',
        to: 'https://github.com/miners-online'
      },
      {
        label: 'Discussions',
        to: 'https://github.com/orgs/miners-online/discussions'
      },
      {
        label: 'Issues',
        to: 'https://github.com/miners-online/.github/issues'
      }
    ]
  },
  {
    label: 'Privacy & Legal',
    children: [
      {
        label: 'Privacy Policy',
        to: 'https://github.com/miners-online/.github/blob/main/docs/legal/PRIVACY_POLICY.md'
      },
      {
        label: 'Terms of Service',
        to: 'https://github.com/miners-online/.github/blob/main/docs/legal/TERMS_OF_SERVICE.md'
      },
      {
        label: 'Software License',
        to: 'https://github.com/miners-online/.github/blob/main/docs/legal/MOPSL.md'
      }
    ]
  }
]
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <AppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          icon="i-simple-icons-discord"
          color="neutral"
          variant="ghost"
          to="https://discord.gg/aeRReEaNnm"
          target="_blank"
          aria-label="Discord"
        />
        <UButton
          to="https://github.com/miners-online"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator/>

    <UFooter>
      <template #top>
        <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UFooterColumns :columns="columns"/>
        </div>
      </template>

      <template #left>
        <div>
          <AppLogo /> 
          <p class="text-sm text-muted mt-2">
            © 2017 - {{ new Date().getFullYear() }} <a href="https://github.com/samuelh2005" target="_blank" rel="noopener noreferrer">Samuel Hulme</a> • All rights reserved.
          </p>
          <p class="text-sm text-muted mt-2">
            NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG AB. MINECRAFT IS A TRADEMARK OF MOJANG AB.
          </p>
        </div>
      </template>

      <template #right>
        <UButton
          icon="i-simple-icons-discord"
          color="neutral"
          variant="ghost"
          to="https://discord.gg/aeRReEaNnm"
          target="_blank"
          aria-label="Discord"
        />
        <UButton
          to="https://github.com/miners-online"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
