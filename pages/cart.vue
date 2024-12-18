<script lang="ts" setup>
import { useMyAuthStore } from "~/stores/Auth";
</script>

<template>
  <NuxtLayout name="base">
    <template #header>
      <StoreHeader>
        <HeaderLogo />
        <HeaderSignIn v-if="!useMyAuthStore.client" />
        <HeaderAccount v-else />
      </StoreHeader>
    </template>

    <div class="flex justify-center">
      <Card>
        <div></div>
      </Card>
    </div>
  </NuxtLayout>
</template>
