<script setup lang="ts">
useSeoMeta({
  title: 'Miners Online',
  description:
    'Miners Online is a Minecraft network running custom servers since 2017, with a shared lobby, and in-development minigames, and members-only legacy servers.'
})

const serverIp = 'play.minersonline.uk'
const discordUrl = 'https://discord.gg/aeRReEaNnm'
const githubUrl = 'https://github.com/miners-online'
const licenseUrl = 'https://github.com/miners-online/.github/blob/main/docs/legal/MOPSL.md'
const blogUrl = '/blog/'

const copied = ref(false)

async function copyIp () {
  try {
    await navigator.clipboard.writeText(serverIp)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1500)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div>
    <UContainer class="py-12 sm:py-16 lg:py-20">
      <!-- Hero -->
      <section class="mx-auto max-w-4xl text-center">
        <UBadge color="primary" variant="soft" class="mb-5">
          Since 2017
        </UBadge>

        <h1 class="text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          Miners Online
        </h1>

        <p class="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          A Minecraft network with a shared lobby, a primary minigames objective in development,
          and members-only legacy servers.
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UButton size="lg" icon="i-heroicons-clipboard-document-20-solid" @click="copyIp">
            {{ copied ? 'Copied IP' : 'Copy IP' }}
          </UButton>

          <UButton
            as="a"
            :href="discordUrl"
            target="_blank"
            rel="noreferrer"
            size="lg"
            color="info"
            variant="soft"
          >
            Join Discord
          </UButton>

          <UButton
            as="a"
            :href="githubUrl"
            target="_blank"
            rel="noreferrer"
            size="lg"
            color="info"
            variant="ghost"
          >
            GitHub
          </UButton>

          <UButton
            as="a"
            :href="blogUrl"
            target="_blank"
            rel="noreferrer"
            size="lg"
            color="info"
            variant="ghost"
          >
            Read the blog
          </UButton>
        </div>

        <div class="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-mono font-semibold text-gray-700 dark:text-gray-200">{{ serverIp }}</span>
          <span class="mx-2">•</span>
          Not 24/7
          <span class="mx-2">•</span>
          No fixed schedule
        </div>
      </section>

      <!-- Availability note -->
      <section class="mx-auto mt-12 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
        The network does not operate 24/7. Availability varies for economical reasons, and there is no fixed schedule.
        When the network is online, players enter through a shared lobby.
      </section>

      <!-- The main experience -->
      <section class="mt-16 space-y-4">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-primary-600 dark:text-primary-400">
            The main experience
          </p>
          <h2 class="mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Minigames
          </h2>
          <p class="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
            The main objective for Miners Online. It supports Java Edition and Bedrock Edition, with a version range of 1.8–26.1.2,
            but it is currently in development and will not be available to play.
          </p>
        </div>

        <UCard class="border-primary-200/70 bg-primary-50/40 dark:border-primary-900/50 dark:bg-primary-950/20">
          <div class="flex flex-wrap items-center gap-3">
            <UBadge color="primary" variant="soft">
              In development
            </UBadge>
            <UBadge color="warning" variant="soft">
              Not playable
            </UBadge>
          </div>
        </UCard>
      </section>

      <!-- Members section below Minigames -->
      <section class="mt-16 space-y-4">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-primary-600 dark:text-primary-400">
            Members only
          </p>
          <h2 class="mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            The classic 2017 experience
          </h2>
          <p class="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
            These servers are available to members only. Only one members server is online at a time.
          </p>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <UCard>
            <template #header>
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                    Survival
                  </h3>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Classic Miners Online survival experience.
                  </p>
                </div>
                <UBadge color="warning" variant="soft">
                  Members only
                </UBadge>
              </div>
            </template>

            <div class="space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
              <p><span class="font-medium text-gray-900 dark:text-white">Access:</span> <span class="font-mono">/server survival</span></p>
              <p><span class="font-medium text-gray-900 dark:text-white">Editions:</span> Java Edition and Bedrock Edition</p>
              <p><span class="font-medium text-gray-900 dark:text-white">Version:</span> 1.8–26.1.2</p>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                    Modded Creative
                  </h3>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Create-mod focused building sandbox.
                  </p>
                </div>
                <UBadge color="warning" variant="soft">
                  Members only
                </UBadge>
              </div>
            </template>

            <div class="space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
              <p><span class="font-medium text-gray-900 dark:text-white">Access:</span> <span class="font-mono">/server modded-creative</span></p>
              <p><span class="font-medium text-gray-900 dark:text-white">Edition:</span> Java Edition</p>
              <p><span class="font-medium text-gray-900 dark:text-white">Version:</span> 1.21.1</p>
              <p><span class="font-medium text-gray-900 dark:text-white">Requirement:</span> Modpack required</p>
            </div>
          </UCard>
        </div>
      </section>

      <!-- Community / open source -->
      <section class="mt-16 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div class="space-y-4">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-primary-600 dark:text-primary-400">
            Community
          </p>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Built around custom infrastructure
          </h2>
          <p class="max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300">
            <a href="https://github.com/samuelh2005" target="_blank" rel="noreferrer" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">Samuel Hulme</a> develops infrastructure and backend services specifically for Miners Online, with a custom web frontend for its online presence.
            Some projects are source available, others are true open source, and most of it is closed source.
          </p>
          <p class="max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300">
            More projects are made separately by <a href="https://github.com/samuelh2005" target="_blank" rel="noreferrer" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">Samuel Hulme</a>, the founder of Miners Online, and are not affiliated with the network.
          </p>

          <div class="flex flex-wrap gap-3 pt-2">
            <UButton
              as="a"
              :href="discordUrl"
              target="_blank"
              rel="noreferrer"
              color="info"
              variant="soft"
            >
              Join Discord
            </UButton>
            <UButton
              as="a"
              :href="githubUrl"
              target="_blank"
              rel="noreferrer"
              color="info"
              variant="ghost"
            >
              Browse GitHub
            </UButton>
            <UButton
              as="a"
              :href="licenseUrl"
              target="_blank"
              rel="noreferrer"
              color="info"
              variant="ghost"
            >
              License
            </UButton>
          </div>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Repositories
          </h3>

          <div class="mt-4 space-y-4 text-sm leading-6">
            <a
              href="https://github.com/miners-online/web-monorepo"
              target="_blank"
              rel="noreferrer"
              class="block text-gray-600 transition hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
            >
              <span class="font-medium text-gray-900 dark:text-white">Web Monorepo</span>
              <span class="block">Website, documentation, blog, and frontend/backend.</span>
            </a>

            <a
              href="https://github.com/miners-online/monorepo"
              target="_blank"
              rel="noreferrer"
              class="block text-gray-600 transition hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
            >
              <span class="font-medium text-gray-900 dark:text-white">Monorepo</span>
              <span class="block">Backend services and game code.</span>
            </a>

            <a
              href="https://github.com/miners-online/infra"
              target="_blank"
              rel="noreferrer"
              class="block text-gray-600 transition hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
            >
              <span class="font-medium text-gray-900 dark:text-white">Infrastructure</span>
              <span class="block">Docker compose files and server configurations.</span>
            </a>
          </div>
        </div>
      </section>

      <!-- About -->
      <section class="mt-16 space-y-4">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-primary-600 dark:text-primary-400">
            About
          </p>
          <h2 class="mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            A long-running custom Minecraft network
          </h2>
          <p class="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
            Miners Online is a Minecraft network that has been running custom servers since 2017, originally known as <span class="font-mono font-semibold text-gray-700 dark:text-gray-200">81.110.170.100</span> and later rebranded to Miners Online.
          </p>
          <p class="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
            Developed iteratively with a focus on custom infrastructure, the network has evolved to include a shared lobby, minigames, and members-only legacy servers.
          </p>
          <p class="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
            The network is built solely by <a href="https://github.com/samuelh2005" target="_blank" rel="noreferrer" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">Samuel Hulme</a>, the founder of Miners Online, with contributions from the community in various forms, but without any formal team structure or funding.
          </p>
          <p class="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
            We have a blog where you can find articles, guides and updates about the network.
          </p>

          <div class="flex flex-wrap gap-3 pt-2">
            <UButton
              as="a"
              :href="blogUrl"
              target="_blank"
              rel="noreferrer"
              color="info"
              variant="soft"
            >
              Read the blog
            </UButton>
          </div>
        </div>
      </section>
    </UContainer>
  </div>
</template>