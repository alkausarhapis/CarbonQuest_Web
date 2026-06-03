<script setup>
import { Search } from "@lucide/vue";

defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Cari..." },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="relative">
    <Search
      class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
    />
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      class="h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-300 focus:ring-2 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-600 dark:focus:ring-gray-700"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
