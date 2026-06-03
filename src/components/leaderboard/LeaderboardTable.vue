<script setup>
import { formatNumber } from "../../utils/formatters";

const props = defineProps({
  leaders: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="overflow-hidden rounded-3xl border border-dark/10 bg-white shadow-soft">
    <div class="grid grid-cols-5 gap-2 border-b border-dark/10 bg-dark/5 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-dark/60">
      <span>Rank</span>
      <span>User</span>
      <span>Level</span>
      <span>Carbon Score</span>
      <span>XP</span>
    </div>
    <div class="divide-y divide-dark/10">
      <div
        v-for="leader in props.leaders"
        :key="leader.rank"
        class="grid grid-cols-5 gap-2 px-6 py-4 text-sm text-dark/70"
        :class="leader.rank <= 3 ? 'bg-primary/40 font-semibold text-dark' : ''"
      >
        <span>#{{ leader.rank }}</span>
        <span class="text-dark">{{ leader.name }}</span>
        <span>{{ leader.level }}</span>
        <span>{{ formatNumber(leader.score) }}</span>
        <span>{{ formatNumber(leader.xp) }}</span>
      </div>
    </div>
  </div>
</template>
