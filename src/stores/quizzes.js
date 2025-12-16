import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../services/api";

export const useQuizzesStore = defineStore("quizzes", () => {
  const quizzes = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchQuizzes() {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get("/quizzes");
      quizzes.value = response.data.data || response.data || [];
      return quizzes.value;
    } catch (err) {
      error.value = err.response?.data?.message || "Gagal mengambil data quiz";
      return [];
    } finally {
      loading.value = false;
    }
  }

  async function getQuizById(id) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get(`/quizzes/${id}`);
      return response.data.data || response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Gagal mengambil data quiz";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createQuiz(quizData) {
    loading.value = true;
    error.value = null;

    try {
      console.log("=== CREATE QUIZ ===");
      console.log("Sending quiz data:", quizData);

      const response = await api.post("/quizzes", quizData);

      console.log("Create quiz response:", response.data);
      await fetchQuizzes();
      return response.data;
    } catch (err) {
      console.error("=== CREATE QUIZ ERROR ===");
      console.error("Full error:", err);
      console.error("Response data:", err.response?.data);

      error.value = err.response?.data?.message || "Gagal membuat quiz";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateQuiz(id, quizData) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.put(`/quizzes/${id}`, quizData);
      await fetchQuizzes();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Gagal mengupdate quiz";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteQuiz(id) {
    loading.value = true;
    error.value = null;

    try {
      await api.delete(`/quizzes/${id}`);
      await fetchQuizzes();
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Gagal menghapus quiz";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    quizzes,
    loading,
    error,
    fetchQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
  };
});
