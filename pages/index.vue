<script setup lang="ts">
import StoreStripe from "~/components/StoreStripe.vue";
import HeaderSignIn from "~/components/header/HeaderSignIn.vue";
import HeaderSearchBar from "~/components/header/HeaderSearchBar.vue";
import HeaderLogo from "~/components/header/HeaderLogo.vue";
import StoreHeader from "~/components/StoreHeader.vue";
import { StoreService } from "~/services/StoreService";
import { useMyNearbyStoresStore } from "~/stores/NearbyStores";

const storeService = new StoreService();

const profileStore = useMyProfileStore();
const nearbyStoresStore = useMyNearbyStoresStore();

const nearbyStores = await storeService.getNearbyStores();

const nearbyStoreProductsRequest = nearbyStores.map(async (s) => ({
  store: s,
  products: (await storeService.getProducts(s.id)) ?? [],
}));

const nearbyStoreProducts = await Promise.all(nearbyStoreProductsRequest);
const filteredNearbyStoreProducts = nearbyStoreProducts.filter(
  (sp) => sp.products.length > 0
);

nearbyStoresStore.$patch(filteredNearbyStoreProducts);
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

    <StoreStripe
      v-for="{ store, products } in nearbyStoresStore.$state"
      :key="store.id"
      :store="store"
      :products="products"
    />
  </NuxtLayout>
</template>
