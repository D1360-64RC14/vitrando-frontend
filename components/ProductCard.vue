<script lang="ts" setup>
import type { Store, Product } from "~/domain/Store";
import { CurrencyManager } from "~/currency/CurrencyManager";

defineProps<{
  product: Product;
  store: Store;
}>();

const currency = new CurrencyManager().getComputedCurrency(useCurrency());
</script>

<template>
  <NuxtLink :to="`/@${store.slug}/${product.id}`">
    <section
      class="snap-start bg-white h-full w-full overflow-hidden rounded-lg flex flex-col"
    >
      <div>
        <img
          class="w-full object-cover aspect-square"
          loading="lazy"
          :src="product.imageUrl"
        />
      </div>
      <div class="mt-auto">
        <h4 class="my-3 text-gray-700">{{ product.name }}</h4>
        <h5 class="text-xl">{{ currency.format(product.price) }}</h5>
      </div>
    </section>
  </NuxtLink>
</template>
