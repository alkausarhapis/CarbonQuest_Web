<script setup>
import { ref } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useDarkMode } from "../composables/useDarkMode";

// Import icons
import logoIcon from "../assets/img/Logo.png";
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
    class="flex h-screen overflow-hidden transition-colors duration-200 bg-gray-50 dark:bg-gray-900"
  >
    <aside
      class="flex flex-col flex-shrink-0 w-56 text-white transition-colors duration-200 bg-sidebar dark:bg-gray-800"
    >
      <div class="flex items-center gap-2 p-4">
        <div class="flex items-center justify-center w-10 h-10">
          <img
            :src="logoIcon"
            alt="CarbonQuest Logo"
            class="object-contain w-10 h-10"
          />
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
      <div class="flex-shrink-0 p-4 space-y-2">
        <RouterLink
          to="/change-password"
          class="flex items-center w-full gap-3 px-4 py-3 text-white transition bg-gray-700 rounded-lg dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500"
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
          class="flex items-center w-full gap-3 px-4 py-3 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
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
    <main class="flex flex-col flex-1 overflow-hidden">
      <!-- Header -->
      <header
        class="flex items-center justify-between flex-shrink-0 px-6 py-4 transition-colors duration-200 bg-white shadow-sm dark:bg-gray-800"
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

      <!-- Page Content -->
      <div class="flex-1 p-6 overflow-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>
