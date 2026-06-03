<script setup>
import SectionHeader from "../shared/SectionHeader.vue";

const features = [
  {
    title: "Kalkulator Karbon",
    description:
      "Catat emisi harian dari transportasi, energi, makanan, dan sampah.",
    icon: "M6 4h12v16H6zM9 8h6M9 12h6M9 16h3",
    active: true,
  },
  {
    title: "Artikel Edukasi",
    description:
      "Materi belajar pilihan untuk membangun kebiasaan berkelanjutan yang bertahan lama.",
    icon: "M6 4h7l5 5v11H6zM13 4v5h5",
  },
  {
    title: "Misi Ramah Lingkungan",
    description: "Misi bergaya gim dengan hadiah XP agar kamu tetap konsisten.",
    icon: "M12 3l7 4v6c0 4-3 7-7 9-4-2-7-5-7-9V7l7-4z",
  },
  {
    title: "Peringkat",
    description:
      "Bersaing dengan teman dan rayakan setiap pencapaian berkelanjutan.",
    icon: "M4 20h16M7 16V8m5 8V4m5 12v-6",
  },
];
</script>

<template>
  <section id="features" class="bg-brand-white px-6 py-20">
    <div class="mx-auto max-w-6xl space-y-12">
      <SectionHeader
        label="Fitur Utama"
        title="Alat untuk menjadikan keberlanjutan sebagai rutinitas harian"
        subtitle="Semua yang kamu butuhkan untuk mengukur dampak, tetap termotivasi, dan membangun komunitas hidup rendah karbon."
      />

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="group rounded-3xl border border-brand-dark/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-glow"
          :class="
            feature.active ? 'bg-brand-primary/70 border-brand-primary/40' : ''
          "
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-2xl"
            :class="
              feature.active
                ? 'bg-brand-dark text-white'
                : 'bg-brand-medium/10 text-brand-dark'
            "
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                :d="feature.icon"
              />
            </svg>
          </div>
          <h3 class="mt-5 text-lg font-semibold text-brand-dark">
            {{ feature.title }}
          </h3>
          <p class="mt-3 text-sm text-brand-dark/60">
            {{ feature.description }}
          </p>
          <!-- <div
            class="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-brand-dark/70"
          >
            Pelajari lebih lanjut
            <span class="transition group-hover:translate-x-1">-></span>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>
