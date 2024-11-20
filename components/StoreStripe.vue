<script setup lang="ts">
import Card from "primevue/card";
import type { Loja, Produto } from "~/domain/Loja";
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
      <h3 class="mb-5 text-xl">
        <a href="#">{{ store.nome }}</a>
      </h3>
      <div
        class="grid snap-x auto-cols-[16rem] grid-flow-col gap-4 overflow-auto scrollbar-h-group pb-2"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          v-bind="product"
        />
      </div>
    </template>
  </Card>
</template>

<style></style>
