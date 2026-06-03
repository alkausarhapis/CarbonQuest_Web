<script setup>
import { onMounted } from "vue";
import QuizCard from "../components/shared/QuizCard.vue";
import { useQuizStore } from "../stores/quizStore";

const quizStore = useQuizStore();

onMounted(() => {
  if (!quizStore.quizzes.length) {
    quizStore.loadQuizzes();
  }
});
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-8">
    <div>
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-dark/60">Quiz Center</p>
      <h2 class="mt-3 text-2xl font-semibold text-dark">Test your climate knowledge</h2>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <QuizCard
        v-for="quiz in quizStore.quizzes"
        :key="quiz.category"
        :category="quiz.category"
        :questions="quiz.questions"
        :time="quiz.time"
        :xp="quiz.xp"
      />
    </div>
  </div>
</template>
