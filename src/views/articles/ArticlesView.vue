<script setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useArticlesStore } from "../../stores/articles";

const articlesStore = useArticlesStore();

onMounted(() => {
  articlesStore.fetchArticles();
});

function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function deleteArticle(id) {
  if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
    await articlesStore.deleteArticle(id);
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Articles</h1>
      <RouterLink
        to="/articles/create"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        + New Article
      </RouterLink>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase"
            >
              ID
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase"
            >
              Title
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase"
            >
              Author
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase"
            >
              Role
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase"
            >
              Place
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase"
            >
              Time
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-if="articlesStore.loading">
            <td colspan="7" class="px-6 py-4 text-center text-gray-500">
              Loading...
            </td>
          </tr>
          <tr v-else-if="articlesStore.articles.length === 0">
            <td colspan="7" class="px-6 py-4 text-center text-gray-500">
              Tidak ada artikel
            </td>
          </tr>
          <tr
            v-for="article in articlesStore.articles"
            :key="article.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 text-sm text-gray-900">{{ article.id }}</td>
            <td class="px-6 py-4 text-sm font-medium text-blue-600">
              {{ article.title }}
            </td>
            <td class="px-6 py-4 text-sm text-blue-600">
              {{ article.authorName || "-" }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              {{ article.authorRole || "Admin" }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              {{ article.place || "-" }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ formatDate(article.createdAt) }}
            </td>
            <td class="px-6 py-4 text-sm">
              <div class="flex gap-2">
                <RouterLink
                  :to="`/articles/edit/${article.id}`"
                  class="p-2 text-gray-600 hover:text-blue-600"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </RouterLink>
                <button
                  @click="deleteArticle(article.id)"
                  class="p-2 text-gray-600 hover:text-red-600"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
