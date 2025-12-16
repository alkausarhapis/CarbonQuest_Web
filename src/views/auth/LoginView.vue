<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useDarkMode } from "../../composables/useDarkMode";

const router = useRouter();
const authStore = useAuthStore();
const { isDark, toggleDarkMode } = useDarkMode();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

async function handleLogin() {
  const success = await authStore.login(email.value, password.value);
  if (success) {
    router.push("/");
  }
}
</script>

<template>
  <div
    class="min-h-screen flex bg-white dark:bg-gray-900 transition-colors duration-200"
  >
    <!-- Left Side - Image -->
    <div class="hidden lg:flex lg:w-1/2 relative">
      <img
        src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=2070"
        alt="Industrial pollution"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-black/40 flex items-center justify-center"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
              />
            </svg>
          </div>
          <span class="text-white text-3xl font-bold"
            >Carbon<span class="text-cyan-400">Quest</span></span
          >
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div
      class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors duration-200 relative"
    >
      <!-- Dark Mode Toggle -->
      <button
        @click.stop="toggleDarkMode"
        type="button"
        class="absolute top-4 right-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
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
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Masuk ke akun Anda
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Selamat datang kembali!👋
        </p>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Email</label
            >
            <input
              v-model="email"
              type="email"
              placeholder="Masukkan email Anda"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <!-- Password -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Kata Sandi</label
            >
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Masukkan kata sandi"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <!-- Show Password Checkbox -->
          <div class="flex items-center">
            <input
              v-model="showPassword"
              type="checkbox"
              id="showPassword"
              class="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:bg-gray-800"
            />
            <label
              for="showPassword"
              class="ml-2 text-sm text-gray-600 dark:text-gray-400"
              >Tampilkan Kata Sandi</label
            >
          </div>

          <!-- Error Message -->
          <div
            v-if="authStore.error"
            class="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg"
          >
            {{ authStore.error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full py-3 px-4 bg-gray-900 dark:bg-blue-600 text-white font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="authStore.loading">Memuat...</span>
            <span v-else>Masuk</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
