<script setup>
import SectionHeader from "../shared/SectionHeader.vue";

const quizzes = [
  {
    category: "Climate Awareness",
    questions: 12,
    time: "8 min",
    xp: 80,
  },
  {
    category: "Carbon Footprint",
    questions: 10,
    time: "6 min",
    xp: 70,
  },
  {
    category: "Recycling",
    questions: 8,
    time: "5 min",
    xp: 60,
  },
  {
    category: "Renewable Energy",
    questions: 14,
    time: "9 min",
    xp: 90,
  },
];
</script>

<template>
  <section id="quizzes" class="bg-brand-background px-6 py-20">
    <div class="mx-auto max-w-6xl space-y-12">
      <SectionHeader
        label="Quiz Preview"
        title="Level up with micro-learning quizzes"
        subtitle="Earn XP by answering fast, focused questions built for climate curiosity."
      />

      <div class="grid gap-5 md:grid-cols-2">
        <div
          v-for="quiz in quizzes"
          :key="quiz.category"
          class="rounded-3xl border border-brand-dark/10 bg-white p-6 shadow-soft transition hover:-translate-y-1"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-brand-dark">{{ quiz.category }}</h3>
            <span class="rounded-full bg-brand-dark px-3 py-1 text-xs font-semibold text-white">
              {{ quiz.xp }} XP
            </span>
          </div>
          <div class="mt-4 flex flex-wrap gap-3 text-xs text-brand-dark/60">
            <span class="rounded-full bg-brand-dark/5 px-3 py-1">{{ quiz.questions }} questions</span>
            <span class="rounded-full bg-brand-dark/5 px-3 py-1">{{ quiz.time }}</span>
            <span class="rounded-full bg-brand-dark/5 px-3 py-1">Single attempt</span>
          </div>
          <button
            type="button"
            class="mt-6 rounded-full border border-brand-dark/10 px-4 py-2 text-xs font-semibold text-brand-dark transition hover:border-brand-dark/40"
          >
            Start quiz
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
