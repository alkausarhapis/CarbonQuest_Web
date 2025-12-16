import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "../services/api";

function safeParseJSON(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch (e) {
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

  async function changePassword(currentPassword, newPassword) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.put(
        "/organizations/password",
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      return true;
    } catch (err) {
      if (err.response?.status === 401) {
        error.value = "Password saat ini salah.";
      } else if (err.response?.status === 403) {
        error.value = "Anda tidak memiliki akses untuk mengubah password.";
      } else if (err.response?.status === 400) {
        error.value = err.response?.data?.message || "Password tidak valid.";
      } else {
        error.value =
          err.response?.data?.message ||
          "Gagal mengubah password. Silakan coba lagi.";
      }
      return false;
    } finally {
      loading.value = false;
    }
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
    changePassword,
  };
});
