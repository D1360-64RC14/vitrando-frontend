<script setup lang="ts">
import type { Loja, Produto } from "~/domain/Loja";
import Card from "primevue/card";
import ProductCard from "./ProductCard.vue";

const { store, products } = defineProps<{
  store: Loja;
  products: Produto[];
}>();
</script>

<template>
  <Card
    class="group"
    role="article"
  >
    <template #content>
      <h3 class="mb-5 ms-3 text-xl">
        <NuxtLink :to="`/@${store.slug}`">{{ store.nome }}</NuxtLink>
      </h3>
      <div
        class="grid snap-x auto-cols-[16rem] grid-flow-col gap-4 overflow-auto scrollbar-h-group pb-2"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          :store="store"
        />
      </div>
    </template>
  </Card>
</template>
