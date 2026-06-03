import { defineStore } from "pinia";
import { computed, ref } from "vue";
import api from "../services/api";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref({ name: "Alya Quinn", level: "Eco Explorer" });
  const loading = ref(false);
  const error = ref(null);

  const isAuthenticated = computed(() => !!user.value);

  async function login(email, password) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.post("/auth/login", { email, password });
      user.value = response.data?.user || user.value;
      return true;
    } catch (err) {
      error.value = "Using mock session. API login not available.";
      return true;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    user.value = null;
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
  };
});
