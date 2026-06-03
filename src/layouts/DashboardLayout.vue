<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useDarkMode } from "../composables/useDarkMode";
import DashboardSidebar from "../components/layout/DashboardSidebar.vue";

const authStore = useAuthStore();
const { isDark, toggleDarkMode } = useDarkMode();
const sidebarOpen = ref(false);
</script>

<template>
  <div
    class="flex h-screen overflow-hidden transition-colors duration-200 bg-gray-50 dark:bg-gray-900"
  >
    <DashboardSidebar
      :items="[]"
      :open="sidebarOpen"
      @close="sidebarOpen = false"
    />

    <main class="flex flex-col flex-1 overflow-hidden lg:ml-64">
      <header
        class="flex items-center justify-between flex-shrink-0 px-6 py-4 transition-colors duration-200 bg-white shadow-sm dark:bg-gray-800"
      >
        <div class="flex items-center gap-4">
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Selamat datang,
            </p>
            <p class="font-semibold text-gray-900 dark:text-white">
              {{ authStore.userName }}
            </p>
          </div>
        </div>

        <button
          @click.stop="toggleDarkMode"
          type="button"
          class="p-2 transition-colors duration-200 bg-gray-100 rounded-lg dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
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
      </header>

      <div class="flex-1 p-6 overflow-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>
