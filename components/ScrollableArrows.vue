<script setup lang="ts">
const props = defineProps<{
  itemSize?: number;
  snapX?: boolean;
}>();

const itemSize = props.itemSize || 16; // 1 rem

defineEmits(["arrowClick"]);

const scrollable = ref<HTMLDivElement>(null!);

const leftArrow = ref<HTMLButtonElement>(null!);
const rightArrow = ref<HTMLButtonElement>(null!);

const leftArrowVisible = ref(false);
const rightArrowVisible = ref(false);

function scrollLeft() {
  scrollable.value.scrollBy({ left: -itemSize, behavior: "smooth" });
}
function scrollRight() {
  scrollable.value.scrollBy({ left: itemSize, behavior: "smooth" });
}
function updateArrowsVisibility(ev: MouseEvent) {
  const { x } = ev;
  const clientWidth = scrollable.value.clientWidth;
  const leftSpace = scrollable.value.scrollLeft;
  const rightSpace = scrollable.value.scrollWidth - clientWidth - leftSpace;

  leftArrowVisible.value = x < itemSize && leftSpace > 0;
  rightArrowVisible.value = x > clientWidth - itemSize && rightSpace > 0;
}
function clearArrowsVisibility() {
  leftArrowVisible.value = false;
  rightArrowVisible.value = false;
}
</script>

<template>
  <div
    class="relative"
    @mousemove="updateArrowsVisibility"
    @mouseleave="clearArrowsVisibility"
  >
    <div
      class="absolute left-0 top-0 bottom-0 w-[16rem] flex items-center overflow-hidden pointer-events-none"
    >
      <button
        @click="scrollLeft"
        class="rounded-full bg-white border-2 border-gray-300 w-10 h-10 text-center flex justify-center items-center -translate-x-16 transition-transform pointer-events-auto"
        :class="{ '!translate-x-16': leftArrowVisible }"
        ref="leftArrow"
      >
        <font-awesome-icon
          :icon="['fas', 'arrow-left']"
          class="text-gray-500"
        />
      </button>
    </div>
    <div
      class="overflow-auto scrollbar-h-group"
      :class="{ 'snap-x': props.snapX }"
      ref="scrollable"
    >
      <slot></slot>
    </div>
    <div
      class="absolute right-0 top-0 bottom-0 w-[16rem] flex flex-row-reverse items-center overflow-hidden pointer-events-none"
    >
      <button
        @click="scrollRight"
        class="rounded-full bg-white border-2 border-gray-300 w-10 h-10 text-center flex justify-center items-center translate-x-16 transition-transform pointer-events-auto"
        :class="{ '!-translate-x-16': rightArrowVisible }"
        ref="rightArrow"
      >
        <font-awesome-icon
          :icon="['fas', 'arrow-right']"
          class="text-gray-500"
        />
      </button>
    </div>
  </div>
</template>
