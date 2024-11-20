<script lang="ts" setup>
import HeaderLogo from "~/components/header/HeaderLogo.vue";
import StoreHeader from "~/components/StoreHeader.vue";

const route = useRoute();
</script>

<template>
  <NuxtLayout name="base">
    <template #header>
      <StoreHeader>
        <HeaderLogo />
      </StoreHeader>
    </template>

    <p>Loja {{ route.params["storeSlug"] }}</p>
  </NuxtLayout>
</template>
