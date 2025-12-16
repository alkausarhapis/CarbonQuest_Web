import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "../services/api";

function safeParseJSON(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return null;
  }
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref(safeParseJSON(localStorage.getItem("user")));
  const token = ref(localStorage.getItem("token") || null);
  const loading = ref(false);
  const error = ref(null);

  const isAuthenticated = computed(() => !!token.value);
  const userName = computed(() => user.value?.name || "Admin");

  async function login(email, password) {
    loading.value = true;
    error.value = null;

    try {
      // Login sebagai organization (admin)
      const response = await api.post("/auth/org/login", {
        email,
        password,
      });

      console.log("=== LOGIN SUCCESS ===");
      console.log("Response data:", response.data);
      console.log("Response headers:", response.headers);
      console.log("Response status:", response.status);

      // Handle different response formats
      const data = response.data;
      const authToken = data.token || data.data?.token;
      const organization =
        data.organization || data.data?.organization || data.data;

      if (!authToken) {
        throw new Error("Token tidak ditemukan dalam response");
      }

      token.value = authToken;
      user.value = organization;

      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(organization));

      return true;
    } catch (err) {
      console.error("=== LOGIN ERROR ===");
      console.error("Full error:", err);
      console.error("Error response:", err.response);
      console.error("Response status:", err.response?.status);
      console.error("Response data:", err.response?.data);
      console.error("Response headers:", err.response?.headers);

      // Handle rate limiting
      if (
        err.response?.status === 429 ||
        err.response?.data?.message?.includes("login attempts")
      ) {
        error.value =
          "Terlalu banyak percobaan login. Silakan tunggu beberapa menit dan coba lagi.";
      } else if (err.response?.status === 401) {
        error.value = "Email atau password salah.";
      } else if (err.response?.status === 404) {
        error.value =
          "Akun tidak ditemukan. Pastikan Anda sudah terdaftar sebagai organization.";
      } else if (err.code === "ERR_NETWORK" || !err.response) {
        error.value =
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
      } else {
        error.value =
          err.response?.data?.message ||
          err.message ||
          "Login gagal. Periksa email dan password Anda.";
      }
      return false;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    userName,
    login,
    logout,
  };
});
