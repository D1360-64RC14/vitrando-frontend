<script lang="ts" setup>
import { NuxtLayout } from "#components";
import { Card } from "primevue";
import HeaderLogo from "~/components/header/HeaderLogo.vue";
import StoreHeader from "~/components/StoreHeader.vue";
</script>

<template>
  <NuxtLayout name="base">
    <template #header>
      <StoreHeader>
        <HeaderLogo />
      </StoreHeader>
    </template>

    <div class="h-full flex flex-col justify-center items-center">
      <Card class="max-w-md w-full">
        <template #content>
          <slot></slot>
        </template>
      </Card>
    </div>
  </NuxtLayout>
</template>
