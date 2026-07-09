<script setup lang="ts">
const route = useRoute()

const items = computed(() => [{
  label: 'Home',
  to: '/'
}, {
  label: 'News',
  to: '/news',
  active: route.path.startsWith('/news')
}])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
      <TemplateMenu />
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton />

      <Show when="signed-out">
        <SignInButton>
          <UButton
            label="Sign in"
            color="neutral"
            variant="outline"
            class="hidden lg:inline-flex"
          />
        </SignInButton>
        <SignUpButton>
          <UButton
            label="Sign up"
            color="neutral"
            trailing-icon="i-lucide-arrow-right"
            class="hidden lg:inline-flex"
          />
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <CustomUserButton/>
      </Show>
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />

      <Show when="signed-out">
        <SignInButton>
          <UButton
            label="Sign in"
            color="neutral"
            variant="subtle"
            block
            class="mb-3"
          />
        </SignInButton>
        <SignUpButton>
          <UButton
            label="Sign up"
            color="neutral"
            block
          />
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <CustomUserButton/>
      </Show>
    </template>
  </UHeader>
</template>