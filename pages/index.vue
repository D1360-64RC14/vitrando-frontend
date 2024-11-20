<script setup lang="ts">
import type { Loja, Produto } from "~/domain/Loja";
import StoreStripe from "~/components/StoreStripe.vue";
import HeaderSignIn from "~/components/header/HeaderSignIn.vue";
import HeaderSearchBar from "~/components/header/HeaderSearchBar.vue";
import HeaderLogo from "~/components/header/HeaderLogo.vue";
import StoreHeader from "~/components/StoreHeader.vue";

function randonProducts(count: number): Produto[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index.toString(),
    nome: `Produto ${index + 1}`,
    preco: Math.random() * 100,
    imagemUrl: `https://picsum.photos/800/800?random=${Math.floor(
      Math.random() * 1000
    )}`,
  }));
}

function randomStore(name: string, products: Produto[]): [Loja, Produto[]] {
  return [
    {
      id: Math.floor(Math.random() * 100).toString(),
      nome: name,
      slug: name.toLowerCase().replace(" ", "-"),
    },
    products,
  ];
}

const homeStripeData = [
  randomStore("Loja 1", randonProducts(8)),
  randomStore("Loja 2", randonProducts(8)),
  randomStore("Loja 3", randonProducts(8)),
  randomStore("Loja 4", randonProducts(8)),
  randomStore("Loja 5", randonProducts(8)),
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
