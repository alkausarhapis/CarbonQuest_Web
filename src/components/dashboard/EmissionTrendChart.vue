<script setup>
import { computed } from "vue";

const data = [3.1, 3.4, 3.8, 4.2, 4.1, 3.7, 3.5];
const maxValue = computed(() => Math.max(...data));
</script>

<template>
  <div class="flex h-40 items-end gap-3">
    <div
      v-for="(value, index) in data"
      :key="index"
      class="flex w-full flex-col items-center gap-2"
    >
      <div
        class="w-full rounded-full bg-primary"
        :style="{ height: (value / maxValue) * 100 + '%' }"
      ></div>
      <span class="text-[10px] text-dark/50">Day {{ index + 1 }}</span>
    </div>
  </div>
</template>
