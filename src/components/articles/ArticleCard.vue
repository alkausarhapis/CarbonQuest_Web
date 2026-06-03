<script setup>
const props = defineProps({
  category: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  summary: {
    type: String,
    default: "",
  },
  author: {
    type: String,
    default: "",
  },
  readTime: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <article class="rounded-3xl border border-dark/10 bg-white p-6 shadow-soft transition hover:-translate-y-1">
    <div class="flex items-center justify-between text-xs font-semibold text-dark/60">
      <span class="rounded-full bg-primary/60 px-3 py-1 text-dark">{{ props.category }}</span>
      <span>{{ props.readTime }}</span>
    </div>
    <h3 class="mt-5 text-lg font-semibold text-dark">{{ props.title }}</h3>
    <p class="mt-3 text-sm text-dark/60">{{ props.summary }}</p>
    <div class="mt-6 flex items-center justify-between text-xs text-dark/60">
      <span>By {{ props.author }}</span>
      <button type="button" class="text-xs font-semibold text-dark">Read more</button>
    </div>
  </article>
</template>
