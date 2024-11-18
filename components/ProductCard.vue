<script lang="ts" setup>
import type { Produto } from "~/domain/Loja";
import { CurrencyManager } from "~/currency/CurrencyManager";

const product = defineProps<Produto>();

const currency = new CurrencyManager().getComputedCurrency(useCurrency());
</script>

<template>
  <section class="cursor-pointer snap-start overflow-hidden rounded-lg">
    <img
      width="400"
      height="400"
      :src="product.imagemUrl"
    />
    <h4 class="my-3 text-gray-700">
      <a href="#">{{ product.nome }}</a>
    </h4>
    <h5 class="text-xl">{{ currency.format(product.preco) }}</h5>
  </section>
</template>

<style></style>
