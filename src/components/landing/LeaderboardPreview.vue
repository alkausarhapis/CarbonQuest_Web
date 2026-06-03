<script setup>
import SectionHeader from "../shared/SectionHeader.vue";

const leaders = [
  { rank: 1, name: "Alya Quinn", level: "Eco Explorer", score: 895, xp: 3420 },
  { rank: 2, name: "Raka Pratama", level: "Green Builder", score: 872, xp: 3270 },
  { rank: 3, name: "Maya Putri", level: "Impact Maker", score: 858, xp: 3120 },
  { rank: 4, name: "Fajar Utama", level: "Leaf Runner", score: 832, xp: 2980 },
  { rank: 5, name: "Sinta Wardana", level: "Eco Starter", score: 812, xp: 2840 },
];
</script>

<template>
  <section id="leaderboard" class="bg-brand-white px-6 py-20">
    <div class="mx-auto max-w-6xl space-y-12">
      <SectionHeader
        label="Leaderboard Preview"
        title="Friendly competition fuels bigger impact"
        subtitle="See how weekly rankings keep everyone motivated and celebrating progress."
      />

      <div class="overflow-hidden rounded-3xl border border-brand-dark/10 bg-white shadow-soft">
        <div class="grid grid-cols-5 gap-2 border-b border-brand-dark/10 bg-brand-dark/5 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-brand-dark/60">
          <span>Rank</span>
          <span>User</span>
          <span>Level</span>
          <span>Carbon Score</span>
          <span>XP</span>
        </div>
        <div class="divide-y divide-brand-dark/10">
          <div
            v-for="leader in leaders"
            :key="leader.rank"
            class="grid grid-cols-5 gap-2 px-6 py-4 text-sm text-brand-dark/70"
            :class="leader.rank <= 3 ? 'bg-brand-primary/40 text-brand-dark font-semibold' : ''"
          >
            <span>#{{ leader.rank }}</span>
            <span class="text-brand-dark">{{ leader.name }}</span>
            <span>{{ leader.level }}</span>
            <span>{{ leader.score }}</span>
            <span>{{ leader.xp }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
