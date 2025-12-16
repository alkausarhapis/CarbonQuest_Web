<script setup>
import { ref } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useDarkMode } from "../composables/useDarkMode";

// Import icons
import dashboardWhiteIcon from "../assets/img/dashboard_white.png";
import artikelWhiteIcon from "../assets/img/artikel_white.png";
import missionWhiteIcon from "../assets/img/mission_white.png";
import quizWhiteIcon from "../assets/img/quiz_white.png";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { isDark, toggleDarkMode } = useDarkMode();

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: dashboardWhiteIcon,
  },
  {
    name: "Buat Artikel",
    path: "/articles/create",
    icon: artikelWhiteIcon,
  },
  {
    name: "Buat Misi",
    path: "/missions/create",
    icon: missionWhiteIcon,
  },
  {
    name: "Buat Quiz",
    path: "/quizzes/create",
    icon: quizWhiteIcon,
  },
];

function handleLogout() {
  authStore.logout();
  router.push("/login");
}

function isActive(path) {
  if (path === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(path);
}
</script>

<template>
  <div
    class="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-200"
  >
    <!-- Sidebar -->
    <aside
      class="w-56 bg-sidebar dark:bg-gray-800 text-white flex flex-col flex-shrink-0 transition-colors duration-200"
    >
      <!-- Logo -->
      <div class="p-4 flex items-center gap-2">
        <div
          class="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
            />
          </svg>
        </div>
        <span class="text-xl font-bold"
          >Carbon<span class="text-cyan-400">Quest</span></span
        >
      </div>

      <!-- Navigation -->
      <nav class="flex-1 mt-4 overflow-y-auto">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition',
            isActive(item.path)
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-700',
          ]"
        >
          <img :src="item.icon" :alt="item.name" class="w-5 h-5" />
          {{ item.name }}
        </RouterLink>
      </nav>

      <!-- Logout Button -->
      <div class="p-4 flex-shrink-0 space-y-2">
        <RouterLink
          to="/change-password"
          class="w-full flex items-center gap-3 px-4 py-3 bg-gray-700 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-600 dark:hover:bg-gray-500 transition"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
          Ganti Password
        </RouterLink>
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header
        class="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex items-center justify-between flex-shrink-0 transition-colors duration-200"
      >
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Selamat datang,
          </p>
          <p class="font-semibold text-gray-900 dark:text-white">
            {{ authStore.userName }}
          </p>
        </div>

        <!-- Dark Mode Toggle -->
        <button
          @click.stop="toggleDarkMode"
          type="button"
          class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
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

      <!-- Page Content -->
      <div class="flex-1 p-6 overflow-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>
