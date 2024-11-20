<script setup lang="ts">
import type { Loja, Produto } from "~/domain/Loja";
import StoreLayout from "~/layouts/StoreLayout.vue";
import StoreHeader from "~/components/StoreHeader.vue";
import StoreStripe from "~/components/StoreStripe.vue";

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
  <StoreLayout>
    <template #header>
      <StoreHeader />
    </template>

    <StoreStripe
      v-for="[store, products] in homeStripeData"
      :key="store.id"
      :store="store"
      :products="products"
    />
  </StoreLayout>
</template>

<style></style>
