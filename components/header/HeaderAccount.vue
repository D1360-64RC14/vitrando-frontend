<script lang="ts" setup>
import { useMyAuthStore } from "~/stores/Auth";
</script>

<template>
  <div class="flex gap-2">
    <Button
      variant="outlined"
      badge="5"
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
