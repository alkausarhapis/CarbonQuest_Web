<script setup>
const stats = [
  { value: "60%", label: "Rata-rata penurunan emisi" },
  { value: "1000", label: "Misi ramah lingkungan selesai" },
  { value: "92%", label: "Pengguna yang menjaga rangkaian mingguan" },
  { value: "34", label: "Kota yang memantau jejak karbon" },
];
</script>

<template>
  <section id="stats" class="bg-brand-background px-6 py-20">
    <div
      class="mx-auto max-w-6xl rounded-3xl border border-brand-dark/10 bg-white p-10 shadow-soft"
    >
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="stat in stats" :key="stat.label">
          <p class="text-3xl font-semibold text-brand-dark">{{ stat.value }}</p>
          <p class="mt-2 text-sm text-brand-dark/60">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
