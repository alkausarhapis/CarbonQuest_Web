<script setup>
import { computed, onMounted, ref } from "vue";
import ArticleCard from "../components/articles/ArticleCard.vue";
import { useArticleStore } from "../stores/articleStore";

const categories = [
  "All",
  "Climate Change",
  "Sustainable Living",
  "Renewable Energy",
  "Carbon Reduction",
];

const selectedCategory = ref("All");
const articleStore = useArticleStore();

onMounted(() => {
  if (!articleStore.articles.length) {
    articleStore.loadArticles();
  }
});

const filteredArticles = computed(() => {
  const list = articleStore.articles;
  if (selectedCategory.value === "All") return list;
  return list.filter((article) => article.category === selectedCategory.value);
});
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-8">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-dark/60">
          Educational Articles
        </p>
        <h2 class="mt-3 text-2xl font-semibold text-dark">
          Learn sustainable living in minutes
        </h2>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="rounded-full border border-dark/10 px-4 py-2 text-xs font-semibold transition"
          :class="selectedCategory === category ? 'bg-dark text-white border-dark' : 'text-dark/60 hover:border-dark/40'"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <ArticleCard
        v-for="article in filteredArticles"
        :key="article.title"
        :category="article.category"
        :title="article.title"
        :summary="article.summary"
        :author="article.author"
        :read-time="article.readTime"
      />
    </div>
  </div>
</template>
