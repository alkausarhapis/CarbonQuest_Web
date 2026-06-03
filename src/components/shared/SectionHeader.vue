<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  align: {
    type: String,
    default: "center",
  },
});
</script>

<template>
  <div :class="props.align === 'left' ? 'text-left' : 'text-center'">
    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-brand-dark/60">
      {{ props.label }}
    </p>
    <h2 class="mt-4 font-brandHeading text-3xl font-semibold text-brand-dark md:text-4xl">
      {{ props.title }}
    </h2>
    <p
      v-if="props.subtitle"
      class="mt-4 text-sm text-brand-dark/60 md:text-base"
      :class="props.align === 'left' ? '' : 'mx-auto max-w-2xl'"
    >
      {{ props.subtitle }}
    </p>
  </div>
</template>
