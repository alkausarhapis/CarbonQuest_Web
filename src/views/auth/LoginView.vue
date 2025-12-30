<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import logoIcon from "../../assets/img/logo.png";
import LoadingSpinner from "../../components/LoadingSpinner.vue";
import { useDarkMode } from "../../composables/useDarkMode";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const { isDark, toggleDarkMode } = useDarkMode();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

function clearError() {
  if (authStore.error) {
    authStore.error = null;
    localStorage.removeItem("loginError");
  }
}

async function handleLogin() {
  const success = await authStore.login(email.value, password.value);
  if (success) {
    router.push("/");
  }
}
</script>

<template>
  <div
    class="flex min-h-screen transition-colors duration-200 bg-white dark:bg-gray-900"
  >
    <div class="relative hidden lg:flex lg:w-1/2">
      <img
        src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=2070"
        alt="Industrial pollution"
        class="object-cover w-full h-full"
      />
      <div
        class="absolute inset-0 flex items-center justify-center bg-black/40"
      >
        <div class="flex items-center gap-4">
          <div class="flex items-center justify-center w-40 h-40">
            <img
              :src="logoIcon"
              alt="CarbonQuest Logo"
              class="object-contain w-40 h-40"
            />
          </div>
          <span class="text-5xl font-bold text-white"
            >Carbon<span class="text-cyan-400">Quest</span></span
          >
        </div>
      </div>
    </div>

    <div
      class="relative flex items-center justify-center w-full p-8 transition-colors duration-200 bg-white lg:w-1/2 dark:bg-gray-900"
    >
      <button
        @click.stop="toggleDarkMode"
        type="button"
        class="absolute p-2 transition-colors duration-200 bg-gray-100 rounded-lg top-4 right-4 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        title="Toggle Dark Mode"
      >
        <svg
          v-if="!isDark"
          class="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>

      <div class="w-full max-w-md">
        <h1 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Masuk ke akun Anda
        </h1>
        <p class="mb-8 text-gray-600 dark:text-gray-400">
          Selamat datang kembali!👋
        </p>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >Email</label
            >
            <input
              v-model="email"
              @input="clearError"
              type="email"
              placeholder="Masukkan email Anda"
              required
              class="w-full px-4 py-3 text-gray-900 placeholder-gray-400 transition bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >Kata Sandi</label
            >
            <input
              v-model="password"
              @input="clearError"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Masukkan kata sandi"
              required
              class="w-full px-4 py-3 text-gray-900 placeholder-gray-400 transition bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
            />
          </div>

          <div class="flex items-center">
            <input
              v-model="showPassword"
              type="checkbox"
              id="showPassword"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 focus:ring-blue-500 dark:bg-gray-800"
            />
            <label
              for="showPassword"
              class="ml-2 text-sm text-gray-600 dark:text-gray-400"
              >Tampilkan Kata Sandi</label
            >
          </div>

          <div
            v-if="authStore.error"
            class="p-3 text-red-700 bg-red-100 border border-red-400 rounded-lg dark:bg-red-900/30 dark:border-red-800 dark:text-red-400"
          >
            {{ authStore.error }}
          </div>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full px-4 py-3 font-medium text-white transition bg-gray-900 rounded-lg dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <LoadingSpinner v-if="authStore.loading" size="sm" />
            <span v-if="authStore.loading">Memproses...</span>
            <span v-else>Masuk</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
