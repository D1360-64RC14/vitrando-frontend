<script lang="ts" setup></script>

<template>
  <div class="grid grid-cols-5 gap-4 p-4 min-h-screen bg-gray-50">
    <header class="col-span-full">
      <slot name="header"></slot>
    </header>

    <main class="flex-grow col-span-5 flex flex-col gap-4">
      <slot></slot>
    </main>

    <footer class="col-span-full">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
