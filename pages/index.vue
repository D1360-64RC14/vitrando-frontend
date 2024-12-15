<script setup lang="ts">
import type { Loja, Produto } from "~/domain/Loja";
import StoreStripe from "~/components/StoreStripe.vue";
import HeaderSignIn from "~/components/header/HeaderSignIn.vue";
import HeaderSearchBar from "~/components/header/HeaderSearchBar.vue";
import HeaderLogo from "~/components/header/HeaderLogo.vue";
import StoreHeader from "~/components/StoreHeader.vue";

const randomProducts = (count: number) => (storeId: number) => {
  return Array.from({ length: count }, (_, index) => {
    const price = Math.floor(Math.random() * 10000) / 100;
    const imageId = storeId * 10 + index;

    return {
      id: index.toString(),
      nome: `Produto ${index + 1}`,
      preco: price,
      imagemUrl: `https://picsum.photos/id/${imageId}/800/800`,
    };
  });
};

function store(
  name: string,
  id: number,
  products: (id: number) => Produto[]
): [Loja, Produto[]] {
  return [
    {
      id: Math.floor(Math.random() * 100).toString(),
      nome: name,
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
        <HeaderSignIn />
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
