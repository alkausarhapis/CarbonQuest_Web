import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchMissions } from "../services/missionService";

export const useMissionStore = defineStore("missionStore", () => {
  const missions = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function loadMissions() {
    loading.value = true;
    error.value = null;

    try {
      missions.value = await fetchMissions();
    } catch (err) {
      error.value = "Unable to load missions.";
    } finally {
      loading.value = false;
    }
  }

  return {
    missions,
    loading,
    error,
    loadMissions,
  };
});
