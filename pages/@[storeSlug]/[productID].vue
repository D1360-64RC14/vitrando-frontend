<script lang="ts" setup>
import HeaderLogo from "~/components/header/HeaderLogo.vue";
import StoreHeader from "~/components/StoreHeader.vue";

const route = useRoute();

const profileStore = useMyProfileStore();
</script>

<template>
  <NuxtLayout name="base">
    <template #header>
      <StoreHeader>
        <HeaderLogo />
        <HeaderSearchBar />
        <HeaderAccount
          v-if="profileStore.isLoggedIn"
          show-cart
          show-store
        />
        <HeaderSignIn v-else />
      </StoreHeader>
    </template>

    <div class="container self-center">
      <Card></Card>
    </div>
  </NuxtLayout>
</template>
