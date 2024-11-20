<script setup lang="ts">
import { Button } from "primevue";
import SearchBar from "./SearchBar.vue";
</script>

<template>
  <div class="flex flex-row justify-between">
    <h1 class="text-3xl font-bold text-primary-700 ms-6">Vitrando</h1>
    <div class="w-4/12">
      <SearchBar />
    </div>
    <div>
      <Button
        variant="outlined"
        severity="secondary"
      >
        Entrar/Criar conta
      </Button>
    </div>
  </div>
</template>
