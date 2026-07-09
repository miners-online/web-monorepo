<script setup lang="ts">
import { UserButton } from '@clerk/nuxt/components';
import { useQuery } from '@tanstack/vue-query'


const UserProfilePage = UserButton.UserProfilePage

const runtimeConfig = useRuntimeConfig()

const { getToken, isLoaded, isSignedIn } = useAuth()

type UserRoleResponse = {
  role: string
}

const { data, isPending, isError, error } = useQuery<UserRoleResponse>({
  queryKey: ['user-role'],
  enabled: isLoaded.value && isSignedIn.value && import.meta.client,
    queryFn: async ({ signal }) => {
      const token = await getToken.value()

      return await $fetch(`${runtimeConfig.public.apiBase}/profile/role`, {
        signal,
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : undefined,
      })
    },
})
</script>

<template>
  <UserButton showName>
    <UserProfilePage label="Miners Online Profile" url="miners-online-profile">
      <template #labelIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
        </svg>
      </template>
      <div>
        <h1>Your Miners Online Profile</h1>

        <p>Role: {{ data?.role || 'Loading...' }}</p>
      </div>
    </UserProfilePage>
  </UserButton>
</template>