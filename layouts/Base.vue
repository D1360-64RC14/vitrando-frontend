<script lang="ts" setup>
const scroll = useScrollSize();
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header
      class="col-span-full sticky top-0 z-50 p-4 transition-all bg-opacity-90 backdrop-blur-md"
      :class="{ 'bg-white': scroll.offTop, 'shadow-lg': scroll.offTop }"
    >
      <slot name="header"></slot>
    </header>

    <div class="grow p-4 pt-1 grid grid-cols-5 gap-4">
      <main class="flex-grow col-span-5 flex flex-col gap-4">
        <slot></slot>
      </main>

      <footer class="col-span-full">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>
