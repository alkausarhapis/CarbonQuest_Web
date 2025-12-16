<script setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useMissionsStore } from "../../stores/missions";

const missionsStore = useMissionsStore();

onMounted(() => {
  missionsStore.fetchMissions();
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

async function deleteMission(id) {
  if (confirm("Apakah Anda yakin ingin menghapus misi ini?")) {
    await missionsStore.deleteMission(id);
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Missions</h1>
      <RouterLink
        to="/missions/create"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        + New Mission
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
              Points
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
          <tr v-if="missionsStore.loading">
            <td colspan="7" class="px-6 py-4 text-center text-gray-500">
              Loading...
            </td>
          </tr>
          <tr v-else-if="missionsStore.missions.length === 0">
            <td colspan="7" class="px-6 py-4 text-center text-gray-500">
              Tidak ada misi
            </td>
          </tr>
          <tr
            v-for="mission in missionsStore.missions"
            :key="mission.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 text-sm text-gray-900">{{ mission.id }}</td>
            <td class="px-6 py-4 text-sm font-medium text-blue-600">
              {{ mission.title }}
            </td>
            <td class="px-6 py-4 text-sm text-blue-600">
              {{ mission.authorName || "-" }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              {{ mission.authorRole || "Admin" }}
            </td>
            <td class="px-6 py-4 text-sm text-cyan-600">
              {{ mission.points || 0 }} pts
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ formatDate(mission.createdAt) }}
            </td>
            <td class="px-6 py-4 text-sm">
              <div class="flex gap-2">
                <RouterLink
                  :to="`/missions/edit/${mission.id}`"
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
                  @click="deleteMission(mission.id)"
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
