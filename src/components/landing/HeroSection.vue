<script setup>
const props = defineProps({
  primaryCta: {
    type: Object,
    default: () => ({ label: "Start Journey", href: "/dashboard" }),
  },
  secondaryCta: {
    type: Object,
    default: () => ({ label: "Explore Features", href: "#features" }),
  },
});

const floatingStats = [
  { label: "Daily Emissions", value: "4.3 kg CO2" },
  { label: "Weekly Improvement", value: "+12%" },
  { label: "Points", value: "2,450 XP" },
];
</script>

<template>
  <section id="home" class="relative overflow-hidden bg-brand-background">
    <div class="absolute inset-0 bg-hero-radial"></div>
    <div class="absolute -right-24 top-20 h-64 w-64 rounded-full bg-brand-primary/70 blur-[120px]"></div>

    <div class="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-28 lg:grid-cols-2">
      <div class="relative z-10 animate-fade-up">
        <p class="inline-flex items-center gap-2 rounded-full border border-brand-dark/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-dark/60">
          SDG 12 Ready Platform
        </p>
        <h1 class="mt-6 font-brandHeading text-4xl font-semibold leading-tight text-brand-dark md:text-5xl">
          Track Carbon. Complete Missions. Create Impact.
        </h1>
        <p class="mt-5 text-base text-brand-dark/60 md:text-lg">
          Measure your carbon footprint, learn sustainable habits, complete eco
          missions, and compete with others while contributing to a greener
          future.
        </p>
        <div class="mt-8 flex flex-wrap items-center gap-4">
          <a
            :href="props.primaryCta.href"
            class="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-dark shadow-glow transition hover:-translate-y-0.5"
          >
            {{ props.primaryCta.label }}
          </a>
          <a
            :href="props.secondaryCta.href"
            class="rounded-full border border-brand-dark/10 px-6 py-3 text-sm font-semibold text-brand-dark/70 transition hover:border-brand-dark/40"
          >
            {{ props.secondaryCta.label }}
          </a>
        </div>
        <div class="mt-8 flex flex-wrap gap-3 text-xs font-semibold text-brand-dark/70">
          <span class="rounded-full bg-white px-4 py-2 shadow-soft">Carbon Calculator</span>
          <span class="rounded-full bg-white px-4 py-2 shadow-soft">Eco Missions</span>
          <span class="rounded-full bg-white px-4 py-2 shadow-soft">Community Leaderboard</span>
        </div>
      </div>

      <div class="relative z-10">
        <div class="rounded-[32px] bg-brand-dark p-6 text-white shadow-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-white/60">Carbon Score</p>
              <p class="mt-2 text-3xl font-semibold">845</p>
            </div>
            <div class="rounded-2xl bg-white/10 px-3 py-2 text-xs font-semibold">
              Daily trend +4.2%
            </div>
          </div>
          <div class="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div class="rounded-2xl bg-white/5 p-4">
              <p class="text-white/60">Daily Emissions</p>
              <p class="mt-2 text-lg font-semibold">4.3 kg CO2</p>
            </div>
            <div class="rounded-2xl bg-white/5 p-4">
              <p class="text-white/60">Weekly Improvement</p>
              <p class="mt-2 text-lg font-semibold">+12%</p>
            </div>
            <div class="rounded-2xl bg-white/5 p-4">
              <p class="text-white/60">Points</p>
              <p class="mt-2 text-lg font-semibold">2,450 XP</p>
            </div>
            <div class="rounded-2xl bg-white/5 p-4">
              <p class="text-white/60">Active Missions</p>
              <p class="mt-2 text-lg font-semibold">3</p>
            </div>
          </div>
          <div class="mt-6 h-2 w-full rounded-full bg-white/10">
            <div class="h-2 w-2/3 rounded-full bg-brand-primary"></div>
          </div>
        </div>

        <div
          v-for="(stat, index) in floatingStats"
          :key="stat.label"
          class="absolute hidden rounded-3xl border border-brand-dark/10 bg-white px-4 py-3 text-sm font-semibold text-brand-dark shadow-soft md:block"
          :class="[
            index === 0 ? '-left-6 top-10 animate-float' : '',
            index === 1 ? '-right-4 top-24 animate-float' : '',
            index === 2 ? 'left-8 -bottom-6 animate-float' : '',
          ]"
        >
          <p class="text-xs text-brand-dark/60">{{ stat.label }}</p>
          <p class="mt-1 text-base">{{ stat.value }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
