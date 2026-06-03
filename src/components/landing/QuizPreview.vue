<script setup>
import SectionHeader from "../shared/SectionHeader.vue";

const quizzes = [
  {
    category: "Kesadaran Iklim",
    questions: 12,
    time: "8 menit",
    xp: 80,
  },
  {
    category: "Jejak Karbon",
    questions: 10,
    time: "6 menit",
    xp: 70,
  },
  {
    category: "Daur Ulang",
    questions: 8,
    time: "5 menit",
    xp: 60,
  },
  {
    category: "Energi Terbarukan",
    questions: 14,
    time: "9 menit",
    xp: 90,
  },
];
</script>

<template>
  <section id="quizzes" class="bg-brand-background px-6 py-20">
    <div class="mx-auto max-w-6xl space-y-12">
      <SectionHeader
        label="Pratinjau Kuis"
        title="Naik level lewat kuis pembelajaran singkat"
        subtitle="Raih XP dengan menjawab pertanyaan cepat dan terarah seputar iklim."
      />

      <div class="grid gap-5 md:grid-cols-2">
        <div
          v-for="quiz in quizzes"
          :key="quiz.category"
          class="rounded-3xl border border-brand-dark/10 bg-white p-6 shadow-soft transition hover:-translate-y-1"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-brand-dark">
              {{ quiz.category }}
            </h3>
            <span
              class="rounded-full bg-brand-dark px-3 py-1 text-xs font-semibold text-white"
            >
              {{ quiz.xp }} XP
            </span>
          </div>
          <div class="mt-4 flex flex-wrap gap-3 text-xs text-brand-dark/60">
            <span class="rounded-full bg-brand-dark/5 px-3 py-1"
              >{{ quiz.questions }} pertanyaan</span
            >
            <span class="rounded-full bg-brand-dark/5 px-3 py-1">{{
              quiz.time
            }}</span>
            <span class="rounded-full bg-brand-dark/5 px-3 py-1"
              >Sekali percobaan</span
            >
          </div>
          <a
            href="https://drive.google.com/drive/folders/1jFhOWbdc7BVrS3xr8qWJn1KzOh6Z8_26"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-block rounded-full border border-brand-dark/10 px-4 py-2 text-xs font-semibold text-brand-dark transition hover:border-brand-dark/40"
          >
            Mulai kuis
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
