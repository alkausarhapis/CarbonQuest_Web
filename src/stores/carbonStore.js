import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchCarbonOverview } from "../services/carbonService";

export const useCarbonStore = defineStore("carbonStore", () => {
  const overview = ref({ highlights: [], activities: [] });
  const loading = ref(false);
  const error = ref(null);

  async function loadOverview() {
    loading.value = true;
    error.value = null;

    try {
      overview.value = await fetchCarbonOverview();
    } catch (err) {
      error.value = "Unable to load carbon overview.";
    } finally {
      loading.value = false;
    }
  }

  return {
    overview,
    loading,
    error,
    loadOverview,
  };
});
