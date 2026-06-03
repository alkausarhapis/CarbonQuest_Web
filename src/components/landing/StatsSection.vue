<script setup>
const stats = [
  { value: "48%", label: "Average emission reduction" },
  { value: "120K", label: "Eco missions completed" },
  { value: "92%", label: "Users who keep weekly streaks" },
  { value: "34", label: "Cities tracking footprint" },
];
</script>

<template>
  <section id="stats" class="bg-brand-background px-6 py-20">
    <div class="mx-auto max-w-6xl rounded-3xl border border-brand-dark/10 bg-white p-10 shadow-soft">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="stat in stats" :key="stat.label">
          <p class="text-3xl font-semibold text-brand-dark">{{ stat.value }}</p>
          <p class="mt-2 text-sm text-brand-dark/60">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
