<script lang="ts" setup>
const props = defineProps<{
  showCart?: boolean;
}>();

const profileStore = useMyProfileStore();
const cartStore = useMyCartStore();
</script>

<template>
  <div class="flex gap-2">
    <NuxtLink to="/cart">
      <Button
        v-if="props.showCart"
        variant="outlined"
        :badge="cartStore.products.length.toString()"
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
        @click="profileStore.logout()"
      >
        Logout
      </Button>
    </NuxtLink>
  </div>
</template>
