<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="rounded-3xl border border-dark/10 bg-white p-6 shadow-soft">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-sm font-semibold text-dark">{{ props.title }}</p>
        <p class="mt-1 text-xs text-dark/60">{{ props.subtitle }}</p>
      </div>
      <slot name="actions"></slot>
    </div>
    <div class="mt-6">
      <slot></slot>
    </div>
  </div>
</template>
