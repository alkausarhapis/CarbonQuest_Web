<script setup>
import SectionHeader from "../shared/SectionHeader.vue";

const leaders = [
  { rank: 1, name: "Alya Quinn", level: "Penjelajah Hijau", score: 895, xp: 3420 },
  { rank: 2, name: "Raka Pratama", level: "Pembangun Hijau", score: 872, xp: 3270 },
  { rank: 3, name: "Maya Putri", level: "Pembuat Dampak", score: 858, xp: 3120 },
  { rank: 4, name: "Fajar Utama", level: "Penggerak Aksi", score: 832, xp: 2980 },
  { rank: 5, name: "Sinta Wardana", level: "Pemula Hijau", score: 812, xp: 2840 },
];
</script>

<template>
  <section id="leaderboard" class="bg-brand-white px-6 py-20">
    <div class="mx-auto max-w-6xl space-y-12">
      <SectionHeader
        label="Pratinjau Peringkat"
        title="Kompetisi sehat mendorong dampak yang lebih besar"
        subtitle="Lihat bagaimana peringkat mingguan menjaga motivasi dan merayakan setiap progres."
      />

      <div
        class="overflow-hidden rounded-3xl border border-brand-dark/10 bg-white shadow-soft"
      >
        <!-- Desktop Table -->
        <div class="hidden md:block">
          <div
            class="grid grid-cols-5 gap-4 border-b border-brand-dark/10 bg-brand-dark/5 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-brand-dark/60"
          >
            <span>Peringkat</span>
            <span>Pengguna</span>
            <span>Tingkat</span>
            <span>Skor Karbon</span>
            <span>XP</span>
          </div>

          <div class="divide-y divide-brand-dark/10">
            <div
              v-for="leader in leaders"
              :key="leader.rank"
              class="grid grid-cols-5 gap-4 px-6 py-5 text-sm text-brand-dark/70"
              :class="
                leader.rank <= 3
                  ? 'bg-brand-primary/40 font-semibold text-brand-dark'
                  : ''
              "
            >
              <span>#{{ leader.rank }}</span>

              <span class="text-brand-dark">
                {{ leader.name }}
              </span>

              <span>{{ leader.level }}</span>

              <span>{{ leader.score }}</span>

              <span>{{ leader.xp }}</span>
            </div>
          </div>
        </div>

        <!-- Mobile Cards -->
        <div class="divide-y divide-brand-dark/10 md:hidden">
          <div
            v-for="leader in leaders"
            :key="leader.rank"
            class="p-5"
            :class="leader.rank <= 3 ? 'bg-brand-primary/40' : ''"
          >
            <div class="flex items-start justify-between">
              <div>
                <div class="text-lg font-bold text-brand-dark">
                  #{{ leader.rank }}
                </div>

                <h3 class="mt-2 font-semibold text-brand-dark">
                  {{ leader.name }}
                </h3>

                <p class="mt-1 text-sm text-brand-dark/60">
                  {{ leader.level }}
                </p>
              </div>

              <div
                class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-dark shadow-sm"
              >
                {{ leader.xp }} XP
              </div>
            </div>

            <div
              class="mt-4 flex items-center justify-between border-t border-brand-dark/10 pt-3"
            >
              <span class="text-sm text-brand-dark/60">
                Skor Karbon
              </span>

              <span class="font-semibold text-brand-dark">
                {{ leader.score }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
