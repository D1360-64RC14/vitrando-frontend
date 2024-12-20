<script lang="ts" setup>
defineProps<{
  showCart?: boolean;
  showStore?: boolean;
}>();

const profileStore = useMyProfileStore();
const cartStore = useMyCartStore();
</script>

<template>
  <div class="flex gap-2">
    <NuxtLink to="/cart">
      <Button
        v-if="showCart"
        variant="outlined"
        :badge="cartStore.products.length.toString()"
        badge-severity=""
      >
        <template #icon>
          <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        </template>
      </Button>
    </NuxtLink>

    <template v-if="showStore">
      <NuxtLink
        :to="`/@${profileStore.store?.slug}`"
        v-if="profileStore.haveStore"
      >
        <Button
          variant="outlined"
          title="Ver sua Loja"
        >
          <template #icon>
            <font-awesome-icon :icon="['fas', 'shop']" />
          </template>
        </Button>
      </NuxtLink>
      <NuxtLink
        to="/new-store"
        v-else
      >
        <Button
          variant="outlined"
          title="Abrir a Própria Loja"
        >
          <template #icon>
            <font-awesome-icon :icon="['fas', 'shop']" />
          </template>
        </Button>
      </NuxtLink>
    </template>

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
