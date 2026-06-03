<script setup>
import SectionHeader from "../shared/SectionHeader.vue";

const missions = [
  {
    title: "Gunakan Transportasi Umum",
    xp: 50,
    progress: 70,
    difficulty: "Mudah",
    deadline: "2 hari lagi",
  },
  {
    title: "Kurangi Penggunaan Plastik",
    xp: 75,
    progress: 45,
    difficulty: "Sedang",
    deadline: "4 hari lagi",
  },
  {
    title: "Tanam Pohon",
    xp: 150,
    progress: 20,
    difficulty: "Sulit",
    deadline: "7 hari lagi",
  },
];
</script>

<template>
  <section id="missions" class="bg-brand-background px-6 py-20">
    <div class="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
      <div class="space-y-6">
        <SectionHeader
          align="left"
          label="Sorotan Misi"
          title="Aksi bergaya gim yang mendorong bumi ke arah lebih baik"
          subtitle="Pilih misi, pantau progres, dan buka hadiah dari setiap pilihan berkelanjutan."
        />
        <div class="grid gap-4">
          <div class="rounded-3xl border border-brand-dark/10 bg-white p-5 shadow-soft">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-brand-dark/50">Misi Aktif</p>
            <div class="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <p class="text-brand-dark/60">Total XP</p>
                <p class="mt-2 text-lg font-semibold text-brand-dark">275</p>
              </div>
              <div>
                <p class="text-brand-dark/60">Penyelesaian</p>
                <p class="mt-2 text-lg font-semibold text-brand-dark">45%</p>
              </div>
              <div>
                <p class="text-brand-dark/60">Rangkaian</p>
                <p class="mt-2 text-lg font-semibold text-brand-dark">6 hari</p>
              </div>
            </div>
          </div>
          <div class="rounded-3xl border border-brand-dark/10 bg-brand-dark p-5 text-white shadow-card">
            <p class="text-xs uppercase tracking-[0.3em] text-white/60">Ringkasan Dampak</p>
            <p class="mt-3 text-2xl font-semibold">-12.4 kg CO2</p>
            <p class="mt-2 text-sm text-white/70">
              Emisi yang dihindari bulan ini lewat misi yang selesai.
            </p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div
          v-for="mission in missions"
          :key="mission.title"
          class="rounded-3xl border border-brand-dark/10 bg-white p-5 shadow-soft"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold text-brand-dark">{{ mission.title }}</h3>
            <span class="rounded-full bg-brand-primary/60 px-3 py-1 text-xs font-semibold text-brand-dark">
              {{ mission.xp }} XP
            </span>
          </div>
          <div class="mt-3 flex items-center justify-between text-xs text-brand-dark/60">
            <span>{{ mission.difficulty }}</span>
            <span>{{ mission.deadline }}</span>
          </div>
          <div class="mt-4 h-2 w-full rounded-full bg-brand-dark/10">
            <div
              class="h-2 rounded-full bg-brand-primary animate-progress"
              :style="{ '--progress': mission.progress + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
