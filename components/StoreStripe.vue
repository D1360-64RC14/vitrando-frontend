<script setup lang="ts">
import type { Loja, Produto } from "~/domain/Loja";
import ProductCard from "./ProductCard.vue";
import { useCurrency } from "~/composables/currency";

const { store, products } = defineProps<{
  store: Loja;
  products: Produto[];
}>();
</script>

<template>
  <article
    class="rounded-md border-[1px] border-gray-200 bg-white px-6 pb-4 pt-4"
  >
    <h3 class="mb-5 text-xl">
      <a href="#">{{ store.nome }}</a>
    </h3>
    <div
      class="grid snap-x auto-cols-[16rem] grid-flow-col gap-4 overflow-auto scrollbar-h pb-2"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        v-bind="product"
      />
    </div>
  </article>
</template>

<style></style>
