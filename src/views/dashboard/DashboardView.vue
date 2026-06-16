<script setup>
import { computed, onMounted, ref } from "vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import DataTable from "../../components/shared/DataTable.vue";
import StatusBadge from "../../components/shared/StatusBadge.vue";
import TableActions from "../../components/shared/TableActions.vue";
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

const articleSortKey = ref("id_article");
const articleSortOrder = ref("asc");
const missionSortKey = ref("id_mission");
const missionSortOrder = ref("asc");
const quizSortKey = ref("id_quiz");
const quizSortOrder = ref("asc");

const showDeleteDialog = ref(false);
const deleteTarget = ref(null);
const deleteType = ref("");

const articleColumns = [
  { key: "id_article", label: "ID", sortable: true, width: "72px" },
  { key: "title", label: "Judul", sortable: true },
  { key: "author_name", label: "Penulis", sortable: true },
  { key: "author_role", label: "Peran", sortable: true },
  { key: "place", label: "Tempat", sortable: true },
  { key: "date_created", label: "Waktu", sortable: true },
  { key: "actions", label: "", sortable: false, width: "72px" },
];

const missionColumns = [
  { key: "id_mission", label: "ID", sortable: true, width: "72px" },
  { key: "title", label: "Judul", sortable: true },
  { key: "tags", label: "Tag", sortable: true },
  { key: "author_role", label: "Peran", sortable: true },
  { key: "points", label: "Poin", sortable: true },
  { key: "date_created", label: "Waktu", sortable: true },
  { key: "actions", label: "", sortable: false, width: "72px" },
];

const quizColumns = [
  { key: "id_quiz", label: "ID", sortable: true, width: "72px" },
  { key: "title", label: "Judul", sortable: true },
  { key: "category", label: "Kategori", sortable: true },
  { key: "question_count", label: "Pertanyaan", sortable: true },
  { key: "created_at", label: "Dibuat", sortable: true },
  { key: "actions", label: "", sortable: false, width: "72px" },
];

function sortArticles(key) {
  if (articleSortKey.value === key) {
    articleSortOrder.value = articleSortOrder.value === "asc" ? "desc" : "asc";
  } else {
    articleSortKey.value = key;
    articleSortOrder.value = "asc";
  }
}

function sortMissions(key) {
  if (missionSortKey.value === key) {
    missionSortOrder.value = missionSortOrder.value === "asc" ? "desc" : "asc";
  } else {
    missionSortKey.value = key;
    missionSortOrder.value = "asc";
  }
}

function sortQuizzes(key) {
  if (quizSortKey.value === key) {
    quizSortOrder.value = quizSortOrder.value === "asc" ? "desc" : "asc";
  } else {
    quizSortKey.value = key;
    quizSortOrder.value = "asc";
  }
}

function sortData(data, key, order) {
  return [...data].sort((a, b) => {
    let aVal = a[key];
    let bVal = b[key];
    if (key === "author_name") {
      aVal = a.author_name || a.author?.name || "";
      bVal = b.author_name || b.author?.name || "";
    }
    if (aVal == null) aVal = "";
    if (bVal == null) bVal = "";
    if (
      key === "id_article" || key === "id_mission" || key === "id_quiz" ||
      key === "points" || key === "total_points" || key === "question_count"
    ) {
      aVal = Number(aVal) || 0;
      bVal = Number(bVal) || 0;
      return order === "asc" ? aVal - bVal : bVal - aVal;
    }
    if (key === "date_created" || key === "created_at") {
      aVal = new Date(aVal || 0).getTime();
      bVal = new Date(bVal || 0).getTime();
      return order === "asc" ? aVal - bVal : bVal - aVal;
    }
    aVal = String(aVal).toLowerCase();
    bVal = String(bVal).toLowerCase();
    return order === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });
}

const filteredArticles = computed(() => {
  let data = articlesStore.articles;
  if (articleSearch.value) {
    const s = articleSearch.value.toLowerCase();
    data = data.filter(
      (a) =>
        a.title?.toLowerCase().includes(s) ||
        a.author_name?.toLowerCase().includes(s) ||
        a.category?.toLowerCase().includes(s)
    );
  }
  return sortData(data, articleSortKey.value, articleSortOrder.value);
});

const filteredMissions = computed(() => {
  let data = missionsStore.missions;
  if (missionSearch.value) {
    const s = missionSearch.value.toLowerCase();
    data = data.filter(
      (m) =>
        m.title?.toLowerCase().includes(s) ||
        m.tags?.toLowerCase().includes(s) ||
        m.category?.toLowerCase().includes(s)
    );
  }
  return sortData(data, missionSortKey.value, missionSortOrder.value);
});

const filteredQuizzes = computed(() => {
  let data = quizzesStore.quizzes;
  if (quizSearch.value) {
    const s = quizSearch.value.toLowerCase();
    data = data.filter(
      (q) => q.title?.toLowerCase().includes(s) || q.category?.toLowerCase().includes(s)
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
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function deleteArticle(id) { deleteTarget.value = id; deleteType.value = "article"; showDeleteDialog.value = true; }
function deleteMission(id) { deleteTarget.value = id; deleteType.value = "mission"; showDeleteDialog.value = true; }
function deleteQuiz(id) { deleteTarget.value = id; deleteType.value = "quiz"; showDeleteDialog.value = true; }

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
  } catch { toastStore.error("Gagal menghapus data"); }
  showDeleteDialog.value = false;
  setTimeout(() => { deleteTarget.value = null; deleteType.value = ""; }, 200);
}

function cancelDelete() {
  showDeleteDialog.value = false;
  setTimeout(() => { deleteTarget.value = null; deleteType.value = ""; }, 200);
}
</script>

<template>
  <div class="space-y-6">
    <DataTable
      title="Artikel"
      :columns="articleColumns"
      :data="filteredArticles"
      :loading="articlesStore.loading"
      :search="articleSearch"
      :sort-key="articleSortKey"
      :sort-order="articleSortOrder"
      scrollable
      search-placeholder="Cari artikel..."
      empty-message="Tidak ada artikel"
      @update:search="articleSearch = $event"
      @update:sort-key="sortArticles($event)"
      @update:sort-order="articleSortOrder = $event"
    >
      <template #cell="{ key, row }">
        <template v-if="key === 'author_name'">
          {{ row.author_name || row.author?.name || "-" }}
        </template>
        <template v-else-if="key === 'author_role'">
          <StatusBadge :text="row.author_role || 'Admin'" variant="role" />
        </template>
        <template v-else-if="key === 'date_created'">
          <span class="text-gray-400">{{ formatDate(row.date_created) }}</span>
        </template>
        <template v-else-if="key === 'actions'">
          <TableActions
            :edit-link="`/articles/edit/${row.id_article}`"
            @delete="deleteArticle(row.id_article)"
          />
        </template>
      </template>
    </DataTable>

    <DataTable
      title="Misi"
      :columns="missionColumns"
      :data="filteredMissions"
      :loading="missionsStore.loading"
      :search="missionSearch"
      :sort-key="missionSortKey"
      :sort-order="missionSortOrder"
      scrollable
      search-placeholder="Cari misi..."
      empty-message="Tidak ada misi"
      @update:search="missionSearch = $event"
      @update:sort-key="sortMissions($event)"
      @update:sort-order="missionSortOrder = $event"
    >
      <template #cell="{ key, row }">
        <template v-if="key === 'tags'">
          <StatusBadge :text="row.tags" variant="tag" />
        </template>
        <template v-else-if="key === 'author_role'">
          <StatusBadge :text="row.author_role || 'Admin'" variant="role" />
        </template>
        <template v-else-if="key === 'points'">
          <span class="font-medium text-emerald-600 dark:text-emerald-400">
            {{ row.points || 0 }} pts
          </span>
        </template>
        <template v-else-if="key === 'date_created'">
          <span class="text-gray-400">{{ formatDate(row.date_created) }}</span>
        </template>
        <template v-else-if="key === 'actions'">
          <TableActions
            :edit-link="`/missions/edit/${row.id_mission}`"
            @delete="deleteMission(row.id_mission)"
          />
        </template>
      </template>
    </DataTable>

    <DataTable
      title="Quiz"
      :columns="quizColumns"
      :data="filteredQuizzes"
      :loading="quizzesStore.loading"
      :search="quizSearch"
      :sort-key="quizSortKey"
      :sort-order="quizSortOrder"
      scrollable
      search-placeholder="Cari quiz..."
      empty-message="Tidak ada quiz"
      @update:search="quizSearch = $event"
      @update:sort-key="sortQuizzes($event)"
      @update:sort-order="quizSortOrder = $event"
    >
      <template #cell="{ key, row }">
        <template v-if="key === 'category'">
          <StatusBadge :text="row.category" variant="category" />
        </template>
        <template v-else-if="key === 'question_count'">
          {{ row.question_count || row.questions?.length || 0 }} soal
        </template>
        <template v-else-if="key === 'created_at'">
          <span class="text-gray-400">{{ formatDate(row.created_at) }}</span>
        </template>
        <template v-else-if="key === 'actions'">
          <TableActions
            :edit-link="`/quizzes/edit/${row.id_quiz}`"
            @delete="deleteQuiz(row.id_quiz)"
          />
        </template>
      </template>
    </DataTable>

    <ConfirmDialog
      :show="showDeleteDialog"
      :title="deleteType === 'article' ? 'Hapus Artikel?' : deleteType === 'mission' ? 'Hapus Misi?' : 'Hapus Quiz?'"
      message="Data yang sudah dihapus tidak dapat dikembalikan."
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
