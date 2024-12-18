<script lang="ts" setup>
import type { Store, Product } from "~/domain/Store";
import { CurrencyManager } from "~/currency/CurrencyManager";

const { product, store } = defineProps<{
  product: Product;
  store: Store;
}>();

const currency = new CurrencyManager().getComputedCurrency(useCurrency());
</script>

<template>
  <NuxtLink :to="`/@${store.slug}/${product.id}`">
    <section class="snap-start">
      <img
        class="overflow-hidden rounded-lg"
        width="400"
        height="400"
        loading="lazy"
        :src="product.imageUrl"
      />
      <h4 class="my-3 text-gray-700">{{ product.name }}</h4>
      <h5 class="text-xl">{{ currency.format(product.price) }}</h5>
    </section>
  </NuxtLink>
</template>
