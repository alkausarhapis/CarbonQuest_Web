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

// Dialog state
const showDeleteDialog = ref(false);
const deleteTarget = ref(null);
const deleteType = ref("");

const filteredArticles = computed(() => {
  if (!articleSearch.value) return articlesStore.articles;
  const search = articleSearch.value.toLowerCase();
  return articlesStore.articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(search) ||
      article.author_name?.toLowerCase().includes(search) ||
      article.category?.toLowerCase().includes(search)
  );
});

const filteredMissions = computed(() => {
  if (!missionSearch.value) return missionsStore.missions;
  const search = missionSearch.value.toLowerCase();
  return missionsStore.missions.filter(
    (mission) =>
      mission.title?.toLowerCase().includes(search) ||
      mission.author_name?.toLowerCase().includes(search) ||
      mission.category?.toLowerCase().includes(search)
  );
});

const filteredQuizzes = computed(() => {
  if (!quizSearch.value) return quizzesStore.quizzes;
  const search = quizSearch.value.toLowerCase();
  return quizzesStore.quizzes.filter(
    (quiz) =>
      quiz.title?.toLowerCase().includes(search) ||
      quiz.category?.toLowerCase().includes(search)
  );
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
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                ID
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Judul
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Penulis
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Peran
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Tempat
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Waktu
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase"
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
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                ID
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Judul
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Penulis
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Peran
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Poin
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Waktu
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
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                ID
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Judul
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Kategori
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Pertanyaan
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Total Poin
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-left text-blue-600 uppercase dark:text-blue-400"
              >
                Dibuat
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
