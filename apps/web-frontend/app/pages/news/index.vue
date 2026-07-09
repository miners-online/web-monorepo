<script setup lang="ts">
const route = useRoute()

const { data: posts } = await useAsyncData(route.path, () => queryCollection('news').order('date', 'DESC').all())

if (!posts.value || posts.value.length === 0) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = 'News'
const description = 'Stay updated with the latest news and insights from our team.'

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description
})
</script>

<template>
  <UContainer>
    <UPageHeader
      :title="title"
      :description="description"
      class="py-[50px]"
    />

    <UPageBody>
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          :to="post.path"
          :title="post.title"
          :description="post.description"
          :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
          :authors="post.authors"
          :badge="post.category"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          variant="naked"
          :ui="{
            description: 'line-clamp-2'
          }"
        />
      </UBlogPosts>
    </UPageBody>
  </UContainer>
</template>