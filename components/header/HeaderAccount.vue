<script lang="ts" setup>
import { useMyAuthStore } from "~/stores/Auth";
import { useMyCartStore } from "~/stores/Cart";

const props = defineProps<{
  showCart?: boolean;
}>();

const itemsInCart = computed(() => useMyCartStore.items.length);
</script>

<template>
  <div class="flex gap-2">
    <NuxtLink to="/cart">
      <Button
        v-if="props.showCart"
        variant="outlined"
        :badge="itemsInCart.toString()"
        badge-severity=""
      >
        <template #icon>
          <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        </template>
      </Button>
    </NuxtLink>
    <NuxtLink to="/">
      <Button
        variant="text"
        severity="secondary"
        @click="useMyAuthStore.client = undefined"
      >
        Logout
      </Button>
    </NuxtLink>
  </div>
</template>
