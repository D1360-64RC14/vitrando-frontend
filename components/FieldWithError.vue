<script lang="ts" setup>
import type { MessageProps } from "primevue";
import type { Reactive } from "vue";

export interface Props {
  sources: Reactive<string[]>;
  severity?: MessageProps["severity"];
  variant?: MessageProps["variant"];
  size?: MessageProps["size"];
}

const props = defineProps<Props>();

const firstError = computed(() => {
  const first = props.sources.find((v) => v !== null && v !== undefined);
  return first ?? null;
});

const invalid = computed(() => firstError.value !== null);
</script>

<template>
  <slot :invalid />
  <slot name="error">
    <Message
      v-if="firstError !== null"
      class="mt-2"
      :severity="props.severity || 'error'"
      :variant="props.variant || 'simple'"
      :size="props.size || 'small'"
    >
      {{ firstError }}
    </Message>
  </slot>
</template>
