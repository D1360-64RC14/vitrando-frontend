<script lang="ts" setup>
import { useMyAuthStore } from "~/stores/Auth";
import { useMyCartStore } from "~/stores/Cart";

const itemsInCart = computed(() => useMyCartStore.items.length);
</script>

<template>
  <div class="flex gap-2">
    <Button
      variant="outlined"
      :badge="itemsInCart.toString()"
      badge-severity=""
    >
      <template #icon>
        <font-awesome-icon :icon="['fas', 'cart-shopping']" />
      </template>
    </Button>
    <Button
      variant="text"
      severity="secondary"
      @click="useMyAuthStore.client = undefined"
    >
      Logout
    </Button>
  </div>
</template>
