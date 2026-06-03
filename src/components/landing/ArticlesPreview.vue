<script setup>
import SectionHeader from "../shared/SectionHeader.vue";

const articles = [
  {
    category: "Perubahan Iklim",
    title: "Mengapa literasi karbon penting untuk keputusan sehari-hari",
    summary:
      "Pahami pendorong terbesar emisi rumah tangga dan cara cepat menguranginya.",
    time: "5 menit baca",
  },
  {
    category: "Hidup Berkelanjutan",
    title: "Bangun rutinitas rendah karbon tanpa mengorbankan kenyamanan",
    summary:
      "Perubahan praktis pada transportasi, makanan, dan energi yang cepat terasa hasilnya.",
    time: "7 menit baca",
  },
  {
    category: "Energi Terbarukan",
    title: "Mitos energi bersih yang memperlambat transisi",
    summary:
      "Pisahkan fakta dari mitos dan lihat apa yang sudah berhasil pada 2026.",
    time: "6 menit baca",
  },
];
</script>

<template>
  <section id="articles" class="bg-brand-white px-6 py-20">
    <div class="mx-auto max-w-6xl space-y-12">
      <SectionHeader
        label="Artikel Edukasi"
        title="Wawasan pilihan untuk memperkuat kebiasaan berkelanjutan"
        subtitle="Bacaan singkat dan fokus yang mengubah topik iklim rumit menjadi panduan yang mudah diterapkan."
      />

      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="article in articles"
          :key="article.title"
          class="group rounded-3xl border border-brand-dark/10 bg-white p-6 shadow-soft transition hover:-translate-y-1"
        >
          <div
            class="flex items-center justify-between text-xs font-semibold text-brand-dark/60"
          >
            <span
              class="rounded-full bg-brand-primary/60 px-3 py-1 text-brand-dark"
            >
              {{ article.category }}
            </span>
            <span>{{ article.time }}</span>
          </div>
          <h3 class="mt-5 text-lg font-semibold text-brand-dark">
            {{ article.title }}
          </h3>
          <p class="mt-3 text-sm text-brand-dark/60">
            {{ article.summary }}
          </p>
          <button
            type="button"
            onclick="
              window.open(
                'https://drive.google.com/drive/folders/1jFhOWbdc7BVrS3xr8qWJn1KzOh6Z8_26',
                '_blank',
              )
            "
            class="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-brand-dark"
          >
            Baca selengkapnya
            <span class="transition group-hover:translate-x-1">-></span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
