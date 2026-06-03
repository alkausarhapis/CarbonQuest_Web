<script setup>
import { AlertCircle } from "@lucide/vue";

defineProps({
  message: { type: String, default: "" },
  id: { type: String, default: "" },
});
</script>

<template>
  <Transition name="field-error">
    <div
      v-if="message"
      :id="id"
      class="flex items-start gap-1.5 mt-1.5"
      aria-live="polite"
    >
      <AlertCircle class="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
      <p class="text-sm text-red-400">{{ message }}</p>
    </div>
  </Transition>
</template>

<style scoped>
.field-error-enter-active {
  transition: all 0.2s ease-out;
}
.field-error-leave-active {
  transition: all 0.15s ease-in;
}
.field-error-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}
.field-error-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
