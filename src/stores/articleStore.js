import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchArticles } from "../services/articleService";

export const useArticleStore = defineStore("articleStore", () => {
  const articles = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function loadArticles() {
    loading.value = true;
    error.value = null;

    try {
      articles.value = await fetchArticles();
    } catch (err) {
      error.value = "Unable to load articles.";
    } finally {
      loading.value = false;
    }
  }

  return {
    articles,
    loading,
    error,
    loadArticles,
  };
});
