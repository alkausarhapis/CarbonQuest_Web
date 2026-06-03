<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  change: {
    type: String,
    default: "",
  },
  changeLabel: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "light",
  },
});

const variantClass = computed(() => {
  const variants = {
    light: "bg-white border-dark/10 text-dark",
    primary: "bg-primary/70 border-primary/40 text-dark",
    dark: "bg-dark border-dark text-white",
  };
  return variants[props.variant] || variants.light;
});
</script>

<template>
  <div class="rounded-3xl border p-5 shadow-soft" :class="variantClass">
    <p class="text-xs font-semibold uppercase tracking-[0.3em]" :class="props.variant === 'dark' ? 'text-white/60' : 'text-dark/50'">
      {{ props.title }}
    </p>
    <p class="mt-3 text-2xl font-semibold" :class="props.variant === 'dark' ? 'text-white' : 'text-dark'">
      {{ props.value }}
    </p>
    <p v-if="props.change" class="mt-2 text-xs" :class="props.variant === 'dark' ? 'text-white/70' : 'text-dark/60'">
      {{ props.change }} {{ props.changeLabel }}
    </p>
  </div>
</template>
