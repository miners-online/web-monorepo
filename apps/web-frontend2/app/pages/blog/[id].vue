<script setup lang="ts">
import siteConfig from '~/site.config'

const route = useRoute()

const slug = computed(() =>
  Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
)

const { data: article } = await useAsyncData(
  () => `blog-${slug.value}`,
  () => queryCollection('blog').path(`/blog/${slug.value}`).first()
)

if (!article.value || article === null || article === undefined) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const title = computed(() => article.value?.title || 'Untitled Article')
const description = computed(() => article.value?.description || 'No description provided.')
const date = computed(() => article.value?.date ? new Date(article.value.date) : null)
const tags = computed(() => article.value?.tags || [])
const authors = computed(() => article.value?.authors || [])
const category = computed(() => {
    const cat = article.value?.category || 'general'
    return cat.charAt(0).toUpperCase() + cat.slice(1)
})

useHead({
    title: title.value,
    meta: [
        { name: 'description', content: description.value },
        { name: 'keywords', content: tags.value.join(', ') },
        { name: 'author', content: authors.value.join(', ') },
        { name: 'category', content: category.value },
    ],
})

useSeoMeta({
    title: title.value,
    description: description.value,
    ogTitle: title.value,
    ogDescription: description.value,
    twitterCard: 'summary_large_image',
})
</script>

<template>
    <div class="pb-10">
        <div class="py-40 bg-gray-100 px-4">
            <div class="max-w-7xl flex flex-col mx-auto">
                <!-- Category, title, and description -->
                <UBadge class="self-start w-fit mb-4" color="neutral" variant="outline">
                    {{ category }}
                </UBadge>
                <h1 class="text-6xl font-bold">{{ title }}</h1>
                <p class="text-lg text-gray-600 mt-4">{{ description }}</p>

                <!-- Dates and authors -->
                <div class="flex items-center gap-4 mt-6">
                    <span class="text-sm text-gray-500">
                        <UIcon name="i-lucide-calendar" class="inline-block mr-1" />
                        {{ date ? new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown date' }}
                    </span>
                    <div
                        v-for="author in authors"
                        :key="author"
                        class="flex items-center gap-2"
                    >
                        <UUser 
                            :to="siteConfig.authors[author]?.url"
                            :name="siteConfig.authors[author]?.name || author"
                            :description="siteConfig.authors[author]?.description"
                            :avatar="{
                                src: siteConfig.authors[author]?.avatar,
                                loading: 'lazy',
                                icon: 'i-lucide-image'
                            }"
                        />
                    </div>
                </div>
                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mt-4">
                    <UIcon name="i-lucide-tag" />
                    <UBadge
                        v-for="tag in tags"
                        :key="tag"
                        color="primary"
                        variant="outline"
                    >
                        {{ tag }}
                    </UBadge>
                </div>
            </div>
        </div>
        <div
            class="max-w-7xl bg-white rounded-3xl flex flex-col items-center shadow-md -mt-20 mx-auto p-10 gap-10"
        >
            <ContentRenderer :value="article" class="prose" />
        </div>
    </div>
</template>