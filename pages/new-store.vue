<script lang="ts" setup>
const profileStore = useMyProfileStore();
</script>

<template>
  <NuxtLayout name="base">
    <template #header>
      <StoreHeader>
        <HeaderLogo />
        <HeaderAccount v-if="profileStore.isLoggedIn" />
        <HeaderSignIn v-else />
      </StoreHeader>
    </template>

    <div class="flex justify-center">
      <Card>
        <div></div>
      </Card>
    </div>
  </NuxtLayout>
</template>
