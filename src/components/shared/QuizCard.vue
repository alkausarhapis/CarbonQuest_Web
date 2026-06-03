<script setup>
const props = defineProps({
  category: {
    type: String,
    default: "",
  },
  questions: {
    type: Number,
    default: 0,
  },
  time: {
    type: String,
    default: "",
  },
  xp: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div class="rounded-3xl border border-dark/10 bg-white p-6 shadow-soft transition hover:-translate-y-1">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-dark">{{ props.category }}</h3>
      <span class="rounded-full bg-primary/70 px-3 py-1 text-xs font-semibold text-dark">
        {{ props.xp }} XP
      </span>
    </div>
    <div class="mt-4 flex flex-wrap gap-3 text-xs text-dark/60">
      <span class="rounded-full bg-dark/5 px-3 py-1">{{ props.questions }} questions</span>
      <span class="rounded-full bg-dark/5 px-3 py-1">{{ props.time }}</span>
      <span class="rounded-full bg-dark/5 px-3 py-1">Daily challenge</span>
    </div>
    <button type="button" class="mt-6 rounded-full border border-dark/10 px-4 py-2 text-xs font-semibold text-dark">
      Start quiz
    </button>
  </div>
</template>
