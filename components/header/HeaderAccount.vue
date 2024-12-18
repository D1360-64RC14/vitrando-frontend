<script lang="ts" setup>
import { useMyAuthStore } from "~/stores/Auth";
</script>

<template>
  <div>
    <Button @click="useMyAuthStore.client = undefined">Logout</Button>
  </div>
</template>
