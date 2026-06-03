<script setup>
import { computed, onMounted, ref } from "vue";
import DataTable from "../../components/shared/DataTable.vue";
import StatusBadge from "../../components/shared/StatusBadge.vue";
import TableActions from "../../components/shared/TableActions.vue";
import { useMissionsStore } from "../../stores/missions";

const missionsStore = useMissionsStore();

const search = ref("");
const sortKey = ref("id_mission");
const sortOrder = ref("asc");

const columns = [
  { key: "id_mission", label: "ID", sortable: true, width: "72px" },
  { key: "title", label: "Title", sortable: true },
  { key: "tags", label: "Tag", sortable: true },
  { key: "author_role", label: "Role", sortable: true },
  { key: "points", label: "Points", sortable: true },
  { key: "date_created", label: "Time", sortable: true },
  { key: "actions", label: "", sortable: false, width: "72px" },
];

function sortData(data, key, order) {
  return [...data].sort((a, b) => {
    let aVal = a[key], bVal = b[key];
    if (aVal == null) aVal = "";
    if (bVal == null) bVal = "";
    if (key === "id_mission" || key === "points") {
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
  let data = missionsStore.missions;
  if (search.value) {
    const s = search.value.toLowerCase();
    data = data.filter(
      (m) => m.title?.toLowerCase().includes(s) || m.tags?.toLowerCase().includes(s)
    );
  }
  return sortData(data, sortKey.value, sortOrder.value);
});

onMounted(() => { missionsStore.fetchMissions(); });

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

async function deleteMission(id) {
  if (confirm("Apakah Anda yakin ingin menghapus misi ini?")) {
    await missionsStore.deleteMission(id);
  }
}
</script>

<template>
  <div>
    <DataTable
      title="Missions"
      :columns="columns"
      :data="filteredData"
      :loading="missionsStore.loading"
      :search="search"
      :sort-key="sortKey"
      :sort-order="sortOrder"
      search-placeholder="Cari misi..."
      empty-message="Tidak ada misi"
      @update:search="search = $event"
      @update:sort-key="sortKey = $event"
      @update:sort-order="sortOrder = $event"
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
  </div>
</template>
