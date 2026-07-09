<script setup lang="ts">
import type { ButtonProps, BlogPostProps } from '@nuxt/ui'
import { useQuery } from '@tanstack/vue-query'

const serverIp = 'play.minersonline.uk'

const links = ref<ButtonProps[]>([
  {
    label: 'Join now',
    to: '#join-today',
    icon: 'i-lucide-square-play'
  },
  {
    label: 'Explore features',
    to: '#features',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])

const features = ref([
  {
    title: 'Bedrock and Java Edition crossplay',
    description: 'Play with friends across different Minecraft platforms.',
    icon: 'i-lucide-globe'
  },
  {
    title: 'A Unique RPG adventure',
    description: 'Embark on an epic journey filled with quests, battles, and discoveries. Currently in development.',
    icon: 'i-lucide-dice-1'
  },
  {
    title: 'A large custom world to explore',
    description: 'Discover our vast multi-world environment containing unique zones. Currently in development.',
    icon: 'i-lucide-map'
  },
  {
    title: 'Member only experiences',
    description: 'Our members are invite-only and have exclusive access to specific servers.',
    icon: 'i-lucide-users'
  }
])

const route = useRoute()

const { data: posts } = await useAsyncData(route.path, () => queryCollection('news').order('date', 'DESC').limit(3).all())

if (!posts.value || posts.value.length === 0) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const mappedPosts = ref<BlogPostProps[]>([
  ...posts.value.map((post) => ({
    title: post.title,
    description: post.description,
    date: new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }),
    authors: post.authors.map((author) => ({
      name: author.name,
      to: author.to,
      avatar: author.avatar
    })),
    badge: post.category,
    to: post.path
  }))
])

useSeoMeta({
  title: 'Home',
  description: 'Join our in development Minecraft server and compete in our farming, fishing, and mining competitions. Explore our custom gameplay mechanics and enjoy a unique Minecraft experience. Join our community today!'
})

const copyServerIp = async () => {
  try {
    await navigator.clipboard.writeText(serverIp)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = serverIp
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}

const runtimeConfig = useRuntimeConfig()

type ServerStatus = {
  servers: Record<string, {
    online: boolean
    players: {
      current: number
      max: number
    }
  }>
}

const { data, isPending, isError, error } = useQuery<ServerStatus>({
  queryKey: ['user-role'],
  enabled: import.meta.client,
    queryFn: async ({ signal }) => {
      return await $fetch(`${runtimeConfig.public.apiBase}/status`, {
        signal
      })
    },
})

const serverStatus = computed(() => {
  if (!data.value || !data.value.servers['play.minersonline.uk']) return null
  return data.value.servers['play.minersonline.uk']
})
</script>

<template>
  <UPageHero
    headline="Currently in development"
    title="Join Miners Online today."
    description="Join our in development Minecraft server and compete in our farming, fishing, and mining competitions. Explore our custom gameplay mechanics and enjoy a unique Minecraft experience. Join our community today!"
    :links="links"
  />

  <UPageSection
    id="features"
    title="Features"
    description="Explore our custom gameplay mechanics and enjoy a unique Minecraft experience."
  >
    <UPageGrid>
      <UPageCard
        v-for="(card, index) in features"
        :key="index"
        v-bind="card"
      />
    </UPageGrid>
  </UPageSection>

  <UPageSection
    id="latest-news"
    title="Latest news"
    description="Stay updated with the latest news and insights from our team."
  >
    <UBlogPosts
      :posts="mappedPosts"
      title="Latest news"
      description="Stay updated with the latest news and insights from our team."
      to="/news"
    />

    <div class="mt-8 text-center">
      <UButton
        to="/news"
        variant="outline"
        color="primary"
        size="lg"
        icon="i-lucide-arrow-right"
      >
        Read more
      </UButton>
    </div>
  </UPageSection>

  <UPageSection
    id="join-today"
    :title="(serverStatus !== null && serverStatus.players.current > 0 ? `Join ${serverStatus.players.current} players online today.` : 'Join Miners Online today.')"
    description="Join our Minecraft server today. Currently in development."
  >
    <div class="mx-auto max-w-6xl">
      <div class="mb-8 text-center">
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-muted">
          Choose your edition
        </p>
        <h3 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Connect in a few seconds
        </h3>
        <!-- Players progress bar using UProgress -->
        <div v-if="serverStatus !== null && serverStatus.players.current > 0" class="mt-4">
          <UProgress
            :modelValue="serverStatus.players.current"
            :max="serverStatus.players.max"
            size="sm"
            color="success"
          />
          <p class="mt-2 text-sm text-muted">
            {{ serverStatus.players.current }} / {{ serverStatus.players.max }} players online
          </p>     
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <UCard class="h-full">
          <template #header>
            <div class="flex items-center justify-between gap-3">
              <h4 class="text-xl font-semibold">
                Java Edition
              </h4>
              <UBadge color="neutral" variant="soft">
                Recommended
              </UBadge>
            </div>
          </template>

          <div class="space-y-4">
            <div class="rounded-2xl border border-default bg-muted/30 p-4">
              <p class="text-sm text-muted">
                IP
              </p>
              <div class="mt-2 flex items-center justify-between gap-3">
                <p class="min-w-0 truncate font-mono text-lg font-semibold sm:text-xl">
                  {{ serverIp }}
                </p>
                <UButton
                  size="xs"
                  icon="i-lucide-copy"
                  variant="ghost"
                  @click="copyServerIp"
                >
                  Copy
                </UButton>
              </div>
            </div>

            <div class="rounded-2xl border border-default bg-muted/30 p-4">
              <p class="text-sm text-muted">
                Port
              </p>
              <p class="mt-2 font-mono text-lg font-semibold">
                25565
              </p>
            </div>

            <div class="rounded-2xl border border-default bg-muted/30 p-4">
              <p class="text-sm text-muted">
                Compatibility
              </p>
              <p class="mt-2 font-semibold">
                1.8-26.2
              </p>
            </div>
          </div>

          <template #footer>
            <p class="text-sm text-muted">
              Launch Minecraft Java Edition and add the server using the details above.
            </p>
          </template>
        </UCard>

        <UCard class="h-full">
          <template #header>
            <div class="flex items-center justify-between gap-3">
              <h4 class="text-xl font-semibold">
                Bedrock Edition
              </h4>
              <UBadge color="neutral" variant="soft">
                Crossplay
              </UBadge>
            </div>
          </template>

          <div class="space-y-4">
            <div class="rounded-2xl border border-default bg-muted/30 p-4">
              <p class="text-sm text-muted">
                IP
              </p>
              <div class="mt-2 flex items-center justify-between gap-3">
                <p class="min-w-0 truncate font-mono text-lg font-semibold sm:text-xl">
                  {{ serverIp }}
                </p>
                <UButton
                  size="xs"
                  icon="i-lucide-copy"
                  variant="ghost"
                  @click="copyServerIp"
                >
                  Copy
                </UButton>
              </div>
            </div>

            <div class="rounded-2xl border border-default bg-muted/30 p-4">
              <p class="text-sm text-muted">
                Port
              </p>
              <p class="mt-2 font-mono text-lg font-semibold">
                19132
              </p>
            </div>

            <div class="rounded-2xl border border-default bg-muted/30 p-4">
              <p class="text-sm text-muted">
                Compatibility
              </p>
              <p class="mt-2 font-semibold">
                Latest
              </p>
            </div>
          </div>

          <template #footer>
            <p class="text-sm text-muted">
              Open Bedrock Edition, add the server, and jump in with friends. For consoles read the <a href="https://geysermc.org/wiki/geyser/using-geyser-with-consoles">Geyser tutorial guide</a>
            </p>
          </template>
        </UCard>
      </div>

      <div class="mt-8 text-center">
        <p class="text-sm text-muted">
          Compatible with Bedrock and Java Edition 1.8-26.2
        </p>
      </div>
    </div>
  </UPageSection>
</template>