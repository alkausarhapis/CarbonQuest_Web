<script setup>
import { onMounted, ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useArticlesStore } from "../../stores/articles";
import { useMissionsStore } from "../../stores/missions";
import { useQuizzesStore } from "../../stores/quizzes";
import ConfirmDialog from "../../components/ConfirmDialog.vue";

const articlesStore = useArticlesStore();
const missionsStore = useMissionsStore();
const quizzesStore = useQuizzesStore();

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
  articlesStore.fetchArticles().then(() => {
    console.log("Articles data:", articlesStore.articles);
    if (articlesStore.articles.length > 0) {
      console.log("Sample article:", articlesStore.articles[0]);
    }
  });
  missionsStore.fetchMissions().then(() => {
    console.log("Missions data:", missionsStore.missions);
    if (missionsStore.missions.length > 0) {
      console.log("Sample mission:", missionsStore.missions[0]);
    }
  });
  quizzesStore.fetchQuizzes().then(() => {
    console.log("Quizzes data:", quizzesStore.quizzes);
  });
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
  if (deleteType.value === "article") {
    await articlesStore.deleteArticle(deleteTarget.value);
  } else if (deleteType.value === "mission") {
    await missionsStore.deleteMission(deleteTarget.value);
  } else if (deleteType.value === "quiz") {
    await quizzesStore.deleteQuiz(deleteTarget.value);
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
      class="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200"
    >
      <div class="p-6 border-b dark:border-gray-700">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">
            Artikel
          </h2>
          <div class="relative w-64">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
            />
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                ID
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Judul
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Penulis
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Peran
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Tempat
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Waktu
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="articlesStore.loading">
              <td
                colspan="6"
                class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                Memuat...
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
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
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
                    class="p-2 text-gray-600 hover:text-blue-600 transition"
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
                    class="p-2 text-gray-600 hover:text-red-600 transition"
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
      class="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200"
    >
      <div class="p-6 border-b dark:border-gray-700">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Misi</h2>
          <div class="relative w-64">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
            />
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                ID
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Judul
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Penulis
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Peran
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Poin
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Waktu
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="missionsStore.loading">
              <td
                colspan="6"
                class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                Memuat...
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
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
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
                    class="p-2 text-gray-600 hover:text-blue-600 transition"
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
                    class="p-2 text-gray-600 hover:text-red-600 transition"
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
      class="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200"
    >
      <div class="p-6 border-b dark:border-gray-700">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Quiz</h2>
          <div class="relative w-64">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
            />
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                ID
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Judul
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Kategori
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Pertanyaan
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Total Poin
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Dibuat
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="quizzesStore.loading">
              <td
                colspan="7"
                class="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                Memuat...
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
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
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
                  class="px-2 py-1 rounded-full text-xs font-medium"
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
                    class="p-2 text-gray-600 hover:text-blue-600 transition"
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
                    class="p-2 text-gray-600 hover:text-red-600 transition"
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
