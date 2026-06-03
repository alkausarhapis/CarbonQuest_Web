import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchLeaderboard } from "../services/leaderboardService";

export const useLeaderboardStore = defineStore("leaderboardStore", () => {
  const monthly = ref([]);
  const allTime = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function loadLeaderboard() {
    loading.value = true;
    error.value = null;

    try {
      const data = await fetchLeaderboard();
      monthly.value = data.Monthly || [];
      allTime.value = data["All Time"] || [];
    } catch (err) {
      error.value = "Unable to load leaderboard.";
    } finally {
      loading.value = false;
    }
  }

  return {
    monthly,
    allTime,
    loading,
    error,
    loadLeaderboard,
  };
});
