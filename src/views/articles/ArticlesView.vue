<script setup>
import { computed, onMounted, ref } from "vue";
import DataTable from "../../components/shared/DataTable.vue";
import StatusBadge from "../../components/shared/StatusBadge.vue";
import TableActions from "../../components/shared/TableActions.vue";
import { useArticlesStore } from "../../stores/articles";

const articlesStore = useArticlesStore();

const search = ref("");
const sortKey = ref("id_article");
const sortOrder = ref("asc");

const columns = [
  { key: "id_article", label: "ID", sortable: true, width: "72px" },
  { key: "title", label: "Title", sortable: true },
  { key: "author_name", label: "Author", sortable: true },
  { key: "author_role", label: "Role", sortable: true },
  { key: "place", label: "Place", sortable: true },
  { key: "date_created", label: "Time", sortable: true },
  { key: "actions", label: "", sortable: false, width: "72px" },
];

function sortData(data, key, order) {
  return [...data].sort((a, b) => {
    let aVal = a[key], bVal = b[key];
    if (key === "author_name") {
      aVal = a.author_name || a.author?.name || "";
      bVal = b.author_name || b.author?.name || "";
    }
    if (aVal == null) aVal = "";
    if (bVal == null) bVal = "";
    if (key === "id_article" || key === "points") {
      aVal = Number(aVal) || 0; bVal = Number(bVal) || 0;
      return order === "asc" ? aVal - bVal : bVal - aVal;
    }
    if (key === "date_created") {
      aVal = new Date(aVal || 0).getTime();
      bVal = new Date(bVal || 0).getTime();
      return order === "asc" ? aVal - bVal : bVal - aVal;
    }
    aVal = String(aVal).toLowerCase();
    bVal = String(bVal).toLowerCase();
    return order === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });
}

const filteredData = computed(() => {
  let data = articlesStore.articles;
  if (search.value) {
    const s = search.value.toLowerCase();
    data = data.filter(
      (a) => a.title?.toLowerCase().includes(s) || a.author_name?.toLowerCase().includes(s)
    );
  }
  return sortData(data, sortKey.value, sortOrder.value);
});

onMounted(() => { articlesStore.fetchArticles(); });

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

async function deleteArticle(id) {
  if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
    await articlesStore.deleteArticle(id);
  }
}
</script>

<template>
  <div>
    <DataTable
      title="Articles"
      :columns="columns"
      :data="filteredData"
      :loading="articlesStore.loading"
      :search="search"
      :sort-key="sortKey"
      :sort-order="sortOrder"
      search-placeholder="Cari artikel..."
      empty-message="Tidak ada artikel"
      @update:search="search = $event"
      @update:sort-key="sortKey = $event"
      @update:sort-order="sortOrder = $event"
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
  </div>
</template>
