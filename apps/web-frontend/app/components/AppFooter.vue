<script setup lang="ts">
const columns = [{
  label: 'Navigation',
  children: [{
    label: 'Home',
    to: '/'
  }, {
    label: 'News',
    to: '/news'
  }]
}]

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  toast.add({
    title: 'Subscribed!',
    description: 'You\'ve been subscribed to our newsletter.'
  })
}
</script>

<template>
  <USeparator
    class="h-px"
  />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        Miners Online • Samuel Hulme  © {{ new Date().getFullYear() }} • All rights reserved.
      </p>
    </template>

    <template #right>
      <UButton
        to="https://discord.gg/aeRReEaNnm"
        target="_blank"
        icon="i-simple-icons-discord"
        aria-label="Miners Online on Discord"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://github.com/miners-online"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="Miners Online on GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
