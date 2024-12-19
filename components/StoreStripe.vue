<script setup lang="ts">
import type { Store, Product } from "~/domain/Store";
import Card from "primevue/card";
import ProductCard from "./ProductCard.vue";

defineProps<{
  store: Store;
  products: Product[];
}>();
</script>

<template>
  <Card
    class="group border-[1px]"
    role="article"
  >
    <template #content>
      <h3 class="mb-5 ms-3 text-xl">
        <NuxtLink :to="`/@${store.slug}`">{{ store.name }}</NuxtLink>
      </h3>
      <ScrollableArrows
        snap-x
        :item-size="16 * 16 /* 16 rem */"
      >
        <div class="grid auto-cols-[16rem] grid-flow-col gap-4 pb-4">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            :store="store"
          />
        </div>
      </ScrollableArrows>
    </template>
  </Card>
</template>
