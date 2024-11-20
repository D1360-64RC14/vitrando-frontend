<script setup lang="ts"></script>

<template>
  <div class="bg-gray-50 grid grid-cols-5 gap-4 p-4">
    <header class="col-span-full">
      <slot name="header">Header</slot>
    </header>

    <!-- <aside class="col-span-1">
      <div class="lg:sticky lg:bottom-0 lg:top-0">
        <slot name="filters">Filtros</slot>
      </div>
    </aside> -->

    <main class="flex-grow col-span-5 flex flex-col gap-4">
      <slot></slot>
    </main>

    <footer class="col-span-full">
      <slot name="footer">Footer</slot>
    </footer>
  </div>
</template>
