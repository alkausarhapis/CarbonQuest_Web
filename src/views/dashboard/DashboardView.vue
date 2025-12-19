<script setup>
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import LoadingSpinner from "../../components/LoadingSpinner.vue";
import { useArticlesStore } from "../../stores/articles";
import { useMissionsStore } from "../../stores/missions";
import { useQuizzesStore } from "../../stores/quizzes";
import { useToastStore } from "../../stores/toast";

const articlesStore = useArticlesStore();
const missionsStore = useMissionsStore();
const quizzesStore = useQuizzesStore();
const toastStore = useToastStore();

const articleSearch = ref("");
const missionSearch = ref("");
const quizSearch = ref("");

// Sorting state for Articles
const articleSortKey = ref("id_article");
const articleSortOrder = ref("asc");

// Sorting state for Missions
const missionSortKey = ref("id_mission");
const missionSortOrder = ref("asc");

// Sorting state for Quizzes
const quizSortKey = ref("id_quiz");
const quizSortOrder = ref("asc");

// Dialog state
const showDeleteDialog = ref(false);
const deleteTarget = ref(null);
const deleteType = ref("");

// Sort handler for articles
function sortArticles(key) {
  if (articleSortKey.value === key) {
    articleSortOrder.value = articleSortOrder.value === "asc" ? "desc" : "asc";
  } else {
    articleSortKey.value = key;
    articleSortOrder.value = "asc";
  }
}

// Sort handler for missions
function sortMissions(key) {
  if (missionSortKey.value === key) {
    missionSortOrder.value = missionSortOrder.value === "asc" ? "desc" : "asc";
  } else {
    missionSortKey.value = key;
    missionSortOrder.value = "asc";
  }
}

// Sort handler for quizzes
function sortQuizzes(key) {
  if (quizSortKey.value === key) {
    quizSortOrder.value = quizSortOrder.value === "asc" ? "desc" : "asc";
  } else {
    quizSortKey.value = key;
    quizSortOrder.value = "asc";
  }
}

// Generic sort function
function sortData(data, key, order) {
  return [...data].sort((a, b) => {
    let aVal = a[key];
    let bVal = b[key];

    // Handle nested author name
    if (key === "author_name") {
      aVal = a.author_name || a.author?.name || "";
      bVal = b.author_name || b.author?.name || "";
    }

    // Handle null/undefined values
    if (aVal == null) aVal = "";
    if (bVal == null) bVal = "";

    // Numeric comparison for IDs and points
    if (
      key === "id_article" ||
      key === "id_mission" ||
      key === "id_quiz" ||
      key === "points" ||
      key === "total_points" ||
      key === "question_count"
    ) {
      aVal = Number(aVal) || 0;
      bVal = Number(bVal) || 0;
      return order === "asc" ? aVal - bVal : bVal - aVal;
    }

    // Date comparison
    if (key === "date_created" || key === "created_at") {
      aVal = new Date(aVal || 0).getTime();
      bVal = new Date(bVal || 0).getTime();
      return order === "asc" ? aVal - bVal : bVal - aVal;
    }

    // String comparison
    aVal = String(aVal).toLowerCase();
    bVal = String(bVal).toLowerCase();
    if (order === "asc") {
      return aVal.localeCompare(bVal);
    }
    return bVal.localeCompare(aVal);
  });
}

const filteredArticles = computed(() => {
  let data = articlesStore.articles;
  if (articleSearch.value) {
    const search = articleSearch.value.toLowerCase();
    data = data.filter(
      (article) =>
        article.title?.toLowerCase().includes(search) ||
        article.author_name?.toLowerCase().includes(search) ||
        article.category?.toLowerCase().includes(search)
    );
  }
  return sortData(data, articleSortKey.value, articleSortOrder.value);
});

const filteredMissions = computed(() => {
  let data = missionsStore.missions;
  if (missionSearch.value) {
    const search = missionSearch.value.toLowerCase();
    data = data.filter(
      (mission) =>
        mission.title?.toLowerCase().includes(search) ||
        mission.author_name?.toLowerCase().includes(search) ||
        mission.category?.toLowerCase().includes(search)
    );
  }
  return sortData(data, missionSortKey.value, missionSortOrder.value);
});

const filteredQuizzes = computed(() => {
  let data = quizzesStore.quizzes;
  if (quizSearch.value) {
    const search = quizSearch.value.toLowerCase();
    data = data.filter(
      (quiz) =>
        quiz.title?.toLowerCase().includes(search) ||
        quiz.category?.toLowerCase().includes(search)
    );
  }
  return sortData(data, quizSortKey.value, quizSortOrder.value);
});

onMounted(() => {
  articlesStore.fetchArticles();
  missionsStore.fetchMissions();
  quizzesStore.fetchQuizzes();
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

function deleteArticle(id) {
  deleteTarget.value = id;
  deleteType.value = "article";
  showDeleteDialog.value = true;
}

function deleteMission(id) {
  deleteTarget.value = id;
  deleteType.value = "mission";
  showDeleteDialog.value = true;
}

function deleteQuiz(id) {
  deleteTarget.value = id;
  deleteType.value = "quiz";
  showDeleteDialog.value = true;
}

async function confirmDelete() {
  try {
    if (deleteType.value === "article") {
      await articlesStore.deleteArticle(deleteTarget.value);
      toastStore.success("Artikel berhasil dihapus");
    } else if (deleteType.value === "mission") {
      await missionsStore.deleteMission(deleteTarget.value);
      toastStore.success("Misi berhasil dihapus");
    } else if (deleteType.value === "quiz") {
      await quizzesStore.deleteQuiz(deleteTarget.value);
      toastStore.success("Quiz berhasil dihapus");
    }
  } catch (err) {
    toastStore.error("Gagal menghapus data");
  }
  showDeleteDialog.value = false;
  // Delay clearing the state to avoid text change during animation
  setTimeout(() => {
    deleteTarget.value = null;
    deleteType.value = "";
  }, 200);
}

function cancelDelete() {
  showDeleteDialog.value = false;
  // Delay clearing the state to avoid text change during animation
  setTimeout(() => {
    deleteTarget.value = null;
    deleteType.value = "";
  }, 200);
}

const deleteDialogTitle = computed(() => {
  if (deleteType.value === "article") return "Hapus Artikel?";
  if (deleteType.value === "mission") return "Hapus Misi?";
  if (deleteType.value === "quiz") return "Hapus Quiz?";
  return "Konfirmasi";
});

const deleteDialogMessage = computed(() => {
  return "Data yang sudah dihapus tidak dapat dikembalikan.";
});
</script>

<template>
  <div class="space-y-8">
    <!-- Articles Section -->
    <div
      class="transition-colors duration-200 bg-white rounded-lg shadow dark:bg-gray-800"
    >
      <div class="p-6 border-b dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">
            Artikel
          </h2>
          <div class="relative w-64">
            <svg
              class="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              v-model="articleSearch"
              type="text"
              placeholder="Cari artikel..."
              class="w-full py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors duration-200 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
            />
          </div>
        </div>
      </div>
      <div class="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table class="w-full">
          <thead class="sticky top-0 bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                @click="sortArticles('id_article')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  ID
                  <span
                    v-if="articleSortKey === 'id_article'"
                    class="text-blue-500"
                  >
                    {{ articleSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortArticles('title')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Judul
                  <span v-if="articleSortKey === 'title'" class="text-blue-500">
                    {{ articleSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortArticles('author_name')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Penulis
                  <span
                    v-if="articleSortKey === 'author_name'"
                    class="text-blue-500"
                  >
                    {{ articleSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortArticles('author_role')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Peran
                  <span
                    v-if="articleSortKey === 'author_role'"
                    class="text-blue-500"
                  >
                    {{ articleSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortArticles('place')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Tempat
                  <span v-if="articleSortKey === 'place'" class="text-blue-500">
                    {{ articleSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortArticles('date_created')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Waktu
                  <span
                    v-if="articleSortKey === 'date_created'"
                    class="text-blue-500"
                  >
                    {{ articleSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="articlesStore.loading">
              <td
                colspan="6"
                class="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                <LoadingSpinner size="md" />
              </td>
            </tr>
            <tr v-else-if="filteredArticles.length === 0">
              <td
                colspan="6"
                class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                {{
                  articleSearch
                    ? "Tidak ada artikel yang cocok"
                    : "Tidak ada artikel"
                }}
              </td>
            </tr>
            <tr
              v-for="article in filteredArticles"
              :key="article.id_article"
              class="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {{ article.id_article }}
              </td>
              <td
                class="px-6 py-4 text-sm font-medium text-blue-600 dark:text-blue-400"
              >
                {{ article.title }}
              </td>
              <td class="px-6 py-4 text-sm text-blue-600 dark:text-blue-400">
                {{ article.author_name || article.author?.name || "-" }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {{ article.author_role || "Admin" }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {{ article.place || "-" }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(article.date_created) }}
              </td>
              <td class="px-6 py-4 text-sm">
                <div class="flex gap-2">
                  <RouterLink
                    :to="`/articles/edit/${article.id_article}`"
                    class="p-2 text-gray-600 transition hover:text-blue-600"
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
                    @click="deleteArticle(article.id_article)"
                    class="p-2 text-gray-600 transition hover:text-red-600"
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

    <!-- Missions Section -->
    <div
      class="transition-colors duration-200 bg-white rounded-lg shadow dark:bg-gray-800"
    >
      <div class="p-6 border-b dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Misi</h2>
          <div class="relative w-64">
            <svg
              class="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              v-model="missionSearch"
              type="text"
              placeholder="Cari misi..."
              class="w-full py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors duration-200 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
            />
          </div>
        </div>
      </div>
      <div class="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table class="w-full">
          <thead class="sticky top-0 bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                @click="sortMissions('id_mission')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  ID
                  <span
                    v-if="missionSortKey === 'id_mission'"
                    class="text-blue-500"
                  >
                    {{ missionSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortMissions('title')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Judul
                  <span v-if="missionSortKey === 'title'" class="text-blue-500">
                    {{ missionSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortMissions('author_name')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Penulis
                  <span
                    v-if="missionSortKey === 'author_name'"
                    class="text-blue-500"
                  >
                    {{ missionSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortMissions('author_role')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Peran
                  <span
                    v-if="missionSortKey === 'author_role'"
                    class="text-blue-500"
                  >
                    {{ missionSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortMissions('points')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Poin
                  <span
                    v-if="missionSortKey === 'points'"
                    class="text-blue-500"
                  >
                    {{ missionSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortMissions('date_created')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Waktu
                  <span
                    v-if="missionSortKey === 'date_created'"
                    class="text-blue-500"
                  >
                    {{ missionSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="missionsStore.loading">
              <td
                colspan="6"
                class="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                <LoadingSpinner size="md" />
              </td>
            </tr>
            <tr v-else-if="filteredMissions.length === 0">
              <td
                colspan="6"
                class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                {{
                  missionSearch ? "Tidak ada misi yang cocok" : "Tidak ada misi"
                }}
              </td>
            </tr>
            <tr
              v-for="mission in filteredMissions"
              :key="mission.id_mission"
              class="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {{ mission.id_mission }}
              </td>
              <td
                class="px-6 py-4 text-sm font-medium text-blue-600 dark:text-blue-400"
              >
                {{ mission.title }}
              </td>
              <td class="px-6 py-4 text-sm text-blue-600 dark:text-blue-400">
                {{ mission.author_name || mission.author?.name || "-" }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {{ mission.author_role || "Admin" }}
              </td>
              <td class="px-6 py-4 text-sm text-cyan-600 dark:text-cyan-400">
                {{ mission.points || 0 }} pts
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(mission.date_created) }}
              </td>
              <td class="px-6 py-4 text-sm">
                <div class="flex gap-2">
                  <RouterLink
                    :to="`/missions/edit/${mission.id_mission}`"
                    class="p-2 text-gray-600 transition hover:text-blue-600"
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
                    @click="deleteMission(mission.id_mission)"
                    class="p-2 text-gray-600 transition hover:text-red-600"
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

    <!-- Quizzes Section -->
    <div
      class="transition-colors duration-200 bg-white rounded-lg shadow dark:bg-gray-800"
    >
      <div class="p-6 border-b dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Quiz</h2>
          <div class="relative w-64">
            <svg
              class="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              v-model="quizSearch"
              type="text"
              placeholder="Cari quiz..."
              class="w-full py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors duration-200 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
            />
          </div>
        </div>
      </div>
      <div class="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table class="w-full">
          <thead class="sticky top-0 bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                @click="sortQuizzes('id_quiz')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  ID
                  <span v-if="quizSortKey === 'id_quiz'" class="text-blue-500">
                    {{ quizSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortQuizzes('title')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Judul
                  <span v-if="quizSortKey === 'title'" class="text-blue-500">
                    {{ quizSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortQuizzes('category')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Kategori
                  <span v-if="quizSortKey === 'category'" class="text-blue-500">
                    {{ quizSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortQuizzes('question_count')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Pertanyaan
                  <span
                    v-if="quizSortKey === 'question_count'"
                    class="text-blue-500"
                  >
                    {{ quizSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortQuizzes('total_points')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Total Poin
                  <span
                    v-if="quizSortKey === 'total_points'"
                    class="text-blue-500"
                  >
                    {{ quizSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                @click="sortQuizzes('created_at')"
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase transition-colors cursor-pointer select-none dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center gap-1">
                  Dibuat
                  <span
                    v-if="quizSortKey === 'created_at'"
                    class="text-blue-500"
                  >
                    {{ quizSortOrder === "asc" ? "↑" : "↓" }}
                  </span>
                  <span v-else class="text-gray-400">↕</span>
                </div>
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="quizzesStore.loading">
              <td
                colspan="7"
                class="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                <LoadingSpinner size="md" />
              </td>
            </tr>
            <tr v-else-if="filteredQuizzes.length === 0">
              <td
                colspan="7"
                class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                {{
                  quizSearch ? "Tidak ada quiz yang cocok" : "Tidak ada quiz"
                }}
              </td>
            </tr>
            <tr
              v-for="quiz in filteredQuizzes"
              :key="quiz.id_quiz"
              class="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {{ quiz.id_quiz }}
              </td>
              <td
                class="px-6 py-4 text-sm font-medium text-blue-600 dark:text-blue-400"
              >
                {{ quiz.title }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                <span
                  :class="{
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                      quiz.category === 'Harian',
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200':
                      quiz.category === 'Mingguan',
                    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200':
                      quiz.category === 'Bulanan',
                  }"
                  class="px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ quiz.category }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                {{ quiz.question_count || quiz.questions?.length || 0 }} soal
              </td>
              <td class="px-6 py-4 text-sm text-cyan-600 dark:text-cyan-400">
                {{ quiz.total_points || 0 }} pts
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(quiz.created_at) }}
              </td>
              <td class="px-6 py-4 text-sm">
                <div class="flex gap-2">
                  <RouterLink
                    :to="`/quizzes/edit/${quiz.id_quiz}`"
                    class="p-2 text-gray-600 transition hover:text-blue-600"
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
                    @click="deleteQuiz(quiz.id_quiz)"
                    class="p-2 text-gray-600 transition hover:text-red-600"
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

    <!-- Confirm Delete Dialog -->
    <ConfirmDialog
      :show="showDeleteDialog"
      :title="deleteDialogTitle"
      :message="deleteDialogMessage"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
