import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../services/api";

export const useArticlesStore = defineStore("articles", () => {
  const articles = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchArticles() {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get("/articles");
      articles.value = response.data.data || response.data || [];
      return articles.value;
    } catch (err) {
      error.value =
        err.response?.data?.message || "Gagal mengambil data artikel";
      return [];
    } finally {
      loading.value = false;
    }
  }

  async function createArticle(articleData) {
    loading.value = true;
    error.value = null;

    try {
      console.log("=== CREATE ARTICLE ===");
      console.log("Sending FormData");

      // Axios akan otomatis set Content-Type: multipart/form-data dengan boundary
      // JANGAN set manual karena akan hilangkan boundary yang dibutuhkan
      const response = await api.post("/articles", articleData);

      console.log("Create article response:", response.data);
      console.log("Response status:", response.status);

      await fetchArticles();
      return response.data;
    } catch (err) {
      console.error("=== CREATE ARTICLE ERROR ===");
      console.error("Full error:", err);
      console.error("Response status:", err.response?.status);
      console.error(
        "Response data (stringified):",
        JSON.stringify(err.response?.data, null, 2)
      );
      console.error("Response data (raw):", err.response?.data);
      console.error("Response headers:", err.response?.headers);
      console.error("Error message:", err.message);

      error.value = err.response?.data?.message || "Gagal membuat artikel";
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function updateArticle(id, articleData) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.put(`/articles/${id}`, articleData);
      await fetchArticles();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Gagal mengupdate artikel";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteArticle(id) {
    loading.value = true;
    error.value = null;

    try {
      await api.delete(`/articles/${id}`);
      await fetchArticles();
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Gagal menghapus artikel";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    articles,
    loading,
    error,
    fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle,
  };
});
