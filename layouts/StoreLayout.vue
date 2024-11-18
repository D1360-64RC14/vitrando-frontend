<script setup lang="ts"></script>

<template>
  <div class="bg-gray-50 grid grid-cols-5 gap-4">
    <header class="col-span-full h-16 bg-red-600">Header</header>

    <aside class="col-span-1 ms-4">
      <div class="lg:sticky lg:bottom-0 lg:top-0">
        <slot name="filters">Filtros</slot>
      </div>
    </aside>

    <main class="flex-grow col-span-4 me-4 flex flex-col gap-4">
      <slot></slot>
    </main>

    <footer class="col-span-full h-60 bg-gray-300">
      <slot name="footer">Footer</slot>
    </footer>
  </div>
</template>

<style></style>
