<script setup lang="ts">
import siteConfig from '~/site.config'

useSeoMeta({
  title: 'The Miners Online Blog',
  description: 'Articles, guides and updates from Miners Online.'
})

const { data: posts } = await useAsyncData('blog', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

const ALL_CATEGORIES = '__all__'

const search = ref('')
const selectedCategory = ref<string>(ALL_CATEGORIES)

const categories = computed(() => {
  const cats = new Set<string>()
  posts.value?.forEach(post => {
    if (post.category) cats.add(post.category)
  })
  return Array.from(cats).sort()
})

const categoryOptions = computed(() => [
  { label: 'All categories', value: ALL_CATEGORIES },
  ...categories.value.map(c => ({
    label: c.charAt(0).toUpperCase() + c.slice(1),
    value: c
  }))
])

const filteredPosts = computed(() => {
  const q = search.value.trim().toLowerCase()
  return (posts.value ?? []).filter(post => {
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags?.some(t => t.toLowerCase().includes(q))
    const matchesCategory =
      selectedCategory.value === ALL_CATEGORIES || post.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function getAuthor(key: string) {
  return siteConfig.authors[key]
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12">

    <!-- Page header -->
    <div class="mb-10">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        The Miners Online Blog
      </h1>
      <p class="mt-2 text-gray-500 dark:text-gray-400">
        Articles, guides and updates from Miners Online.
      </p>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 sm:grid-cols-[1fr_13rem] gap-3 mb-8">
      <UInput
        v-model="search"
        leading-icon="i-lucide-search"
        placeholder="Search articles..."
        size="md"
      />
      <USelect
        v-model="selectedCategory"
        :items="categoryOptions"
        placeholder="All categories"
        size="md"
      />
    </div>

    <!-- Post list -->
    <div v-if="filteredPosts.length" class="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
      <NuxtLink
        v-for="post in filteredPosts"
        :key="post.path"
        :to="post.path"
        class="group flex flex-col gap-3 py-8 first:pt-0 last:pb-0"
      >
        <!-- Category + date -->
        <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <UBadge
            v-if="post.category"
            :label="post.category"
            variant="subtle"
            size="sm"
            class="capitalize"
          />
          <span>{{ formatDate(post.date) }}</span>
        </div>

        <!-- Title + description -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
            {{ post.title }}
          </h2>
          <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
            {{ post.description }}
          </p>
        </div>

        <!-- Tags -->
        <div v-if="post.tags?.length" class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in post.tags"
            :key="tag"
            :label="tag"
            variant="outline"
            size="sm"
          />
        </div>

        <!-- Authors -->
        <div v-if="post.authors?.length" class="flex flex-wrap gap-4 mt-1">
          <UUser
            v-for="authorKey in post.authors"
            :key="authorKey"
            :name="getAuthor(authorKey)?.name"
            :description="getAuthor(authorKey)?.description"
            :avatar="{ src: getAuthor(authorKey)?.avatar, alt: getAuthor(authorKey)?.name }"
            size="sm"
          />
        </div>
      </NuxtLink>
    </div>

    <!-- Empty state -->
    <div v-else class="flex flex-col items-center justify-center py-24 gap-3 text-center">
      <UIcon name="i-lucide-file-search" class="text-gray-300 dark:text-gray-700 size-10" />
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        No articles match your search.
      </p>
      <UButton
        variant="ghost"
        size="sm"
        label="Clear filters"
        @click="search = ''; selectedCategory = ALL_CATEGORIES"
      />
    </div>

  </div>
</template>