import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchQuizzes } from "../services/quizService";

export const useQuizStore = defineStore("quizStore", () => {
  const quizzes = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function loadQuizzes() {
    loading.value = true;
    error.value = null;

    try {
      quizzes.value = await fetchQuizzes();
    } catch (err) {
      error.value = "Unable to load quizzes.";
    } finally {
      loading.value = false;
    }
  }

  return {
    quizzes,
    loading,
    error,
    loadQuizzes,
  };
});
