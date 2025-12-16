import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../services/api";

export const useMissionsStore = defineStore("missions", () => {
  const missions = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchMissions() {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get("/missions");
      missions.value = response.data.data || response.data || [];
      return missions.value;
    } catch (err) {
      error.value = err.response?.data?.message || "Gagal mengambil data misi";
      return [];
    } finally {
      loading.value = false;
    }
  }

  async function createMission(missionData) {
    loading.value = true;
    error.value = null;

    try {
      // Axios akan otomatis set Content-Type dengan boundary
      const response = await api.post("/missions", missionData);
      await fetchMissions();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Gagal membuat misi";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateMission(id, missionData) {
    loading.value = true;
    error.value = null;

    try {
      // Axios akan otomatis set Content-Type dengan boundary
      const response = await api.put(`/missions/${id}`, missionData);
      await fetchMissions();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Gagal mengupdate misi";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteMission(id) {
    loading.value = true;
    error.value = null;

    try {
      await api.delete(`/missions/${id}`);
      await fetchMissions();
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || "Gagal menghapus misi";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    missions,
    loading,
    error,
    fetchMissions,
    createMission,
    updateMission,
    deleteMission,
  };
});
