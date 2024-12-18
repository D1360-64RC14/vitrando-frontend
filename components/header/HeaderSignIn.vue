<script setup lang="ts"></script>

<template>
  <div>
    <NuxtLink to="/login">
      <Button
        class="me-2"
        variant="outlined"
        severity="secondary"
      >
        Entrar
      </Button>
    </NuxtLink>
    <NuxtLink to="/signin">
      <Button
        variant="link"
        severity="secondary"
      >
        Criar conta
      </Button>
    </NuxtLink>
  </div>
</template>
