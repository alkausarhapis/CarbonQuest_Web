<script setup>
const progress = [
  { label: "Transport", value: 72 },
  { label: "Energy", value: 54 },
  { label: "Food", value: 61 },
  { label: "Waste", value: 46 },
];
</script>

<template>
  <div class="space-y-4">
    <div v-for="item in progress" :key="item.label">
      <div class="flex items-center justify-between text-xs text-dark/60">
        <span>{{ item.label }}</span>
        <span>{{ item.value }}%</span>
      </div>
      <div class="mt-2 h-2 w-full rounded-full bg-dark/10">
        <div class="h-2 rounded-full bg-dark" :style="{ width: item.value + '%' }"></div>
      </div>
    </div>
  </div>
</template>
