<script lang="ts" setup>
const profileStore = useMyProfileStore();
</script>

<template>
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
