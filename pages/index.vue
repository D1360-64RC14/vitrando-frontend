<script setup lang="ts">
import type { Store, Product } from "~/domain/Store";
import StoreStripe from "~/components/StoreStripe.vue";
import HeaderSignIn from "~/components/header/HeaderSignIn.vue";
import HeaderSearchBar from "~/components/header/HeaderSearchBar.vue";
import HeaderLogo from "~/components/header/HeaderLogo.vue";
import StoreHeader from "~/components/StoreHeader.vue";
import { useMyAuthStore } from "~/stores/Auth";

const randomProducts = (count: number) => (storeID: number) => {
  return Array.from({ length: count }, (_, index) => {
    const price = Math.floor(Math.random() * 10000) / 100;
    const imageId = storeID * 10 + index;

    return <Product>{
      id: index,
      storeID: storeID,
      name: `Produto ${index + 1}`,
      price: price,
      imageUrl: `https://picsum.photos/id/${imageId}/800/800`,
    };
  });
};

function store(
  name: string,
  id: number,
  products: (id: number) => Product[]
): [Store, Product[]] {
  return [
    {
      id: Math.floor(Math.random() * 100),
      name: name,
      slug: name.toLowerCase().replace(" ", "-"),
    },
    products(id),
  ];
}

const homeStripeData = [
  store("Loja 1", 1, randomProducts(8)),
  store("Loja 2", 2, randomProducts(8)),
  store("Loja 3", 3, randomProducts(8)),
  store("Loja 4", 4, randomProducts(8)),
  store("Loja 5", 5, randomProducts(8)),
];
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
