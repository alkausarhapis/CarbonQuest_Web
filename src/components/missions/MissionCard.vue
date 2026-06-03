<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  xp: {
    type: Number,
    default: 0,
  },
  progress: {
    type: Number,
    default: 0,
  },
  difficulty: {
    type: String,
    default: "",
  },
  deadline: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="rounded-3xl border border-dark/10 bg-white p-6 shadow-soft">
    <div class="flex items-center justify-between">
      <h3 class="text-base font-semibold text-dark">{{ props.title }}</h3>
      <span class="rounded-full bg-dark px-3 py-1 text-xs font-semibold text-white">
        {{ props.xp }} XP
      </span>
    </div>
    <div class="mt-3 flex flex-wrap items-center gap-3 text-xs text-dark/60">
      <span class="rounded-full bg-dark/5 px-3 py-1">{{ props.difficulty }}</span>
      <span class="rounded-full bg-dark/5 px-3 py-1">{{ props.deadline }}</span>
    </div>
    <div class="mt-4 h-2 w-full rounded-full bg-dark/10">
      <div
        class="h-2 rounded-full bg-primary animate-progress"
        :style="{ '--progress': props.progress + '%' }"
      ></div>
    </div>
  </div>
</template>
