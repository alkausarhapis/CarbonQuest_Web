import axios from "axios";

const api = axios.create({
  // Gunakan environment variable untuk production, proxy untuk development
  baseURL: import.meta.env.DEV
    ? "/api"
    : import.meta.env.VITE_API_URL || "https://carbonquest-api.bintangap.my.id",
  // JANGAN set default Content-Type, biarkan Axios handle otomatis
  // Untuk JSON akan otomatis application/json
  // Untuk FormData akan otomatis multipart/form-data dengan boundary
});

// Request interceptor untuk menambahkan token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Jangan override Content-Type jika sudah diset oleh FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk handle error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
