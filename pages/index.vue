<script setup lang="ts">
import type { Store, Product } from "~/domain/Store";
import StoreStripe from "~/components/StoreStripe.vue";
import HeaderSignIn from "~/components/header/HeaderSignIn.vue";
import HeaderSearchBar from "~/components/header/HeaderSearchBar.vue";
import HeaderLogo from "~/components/header/HeaderLogo.vue";
import StoreHeader from "~/components/StoreHeader.vue";
import { useMyAuthStore } from "~/stores/Auth";
import { StoreRepository } from "~/repositories/StoreRepository";
import { useMyNearbyStoresStore } from "~/stores/NearbyStores";

const storeRepo = new StoreRepository();

const homeStripeData = computed(() =>
  (useMyNearbyStoresStore.stores ?? []).map<[Store, Product[]]>(
    ({ store, products }) => [store, products]
  )
);

storeRepo.getNearbyStoresForStore().then((nearbyStores) => {
  useMyNearbyStoresStore.stores = nearbyStores;
});
</script>

<template>
  <NuxtLayout name="base">
    <template #header>
      <StoreHeader>
        <HeaderLogo />
        <HeaderSearchBar />
        <HeaderSignIn v-if="!useMyAuthStore.client" />
        <HeaderAccount
          v-else
          show-cart
        />
      </StoreHeader>
    </template>

    <StoreStripe
      v-for="[store, products] in homeStripeData"
      :key="store.id"
      :store="store"
      :products="products"
    />
  </NuxtLayout>
</template>
