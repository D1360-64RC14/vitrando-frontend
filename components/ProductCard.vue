<script lang="ts" setup>
import type { Loja, Produto } from "~/domain/Loja";
import { CurrencyManager } from "~/currency/CurrencyManager";

const { product, store } = defineProps<{
  product: Produto;
  store: Loja;
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
        :src="product.imagemUrl"
      />
      <h4 class="my-3 text-gray-700">{{ product.nome }}</h4>
      <h5 class="text-xl">{{ currency.format(product.preco) }}</h5>
    </section>
  </NuxtLink>
</template>
