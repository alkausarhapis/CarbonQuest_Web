<script setup>
import { RouterView } from "vue-router";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useDarkMode } from "./composables/useDarkMode";

// Import icons
import logoLight from "./assets/img/logo.png";

const route = useRoute();
const { isDark } = useDarkMode();

// Page title mapping
const pageTitles = {
  "/": "Dashboard",
  "/login": "Login",
  "/change-password": "Ganti Password",
  "/articles": "Artikel",
  "/articles/create": "Buat Artikel",
  "/missions": "Misi",
  "/missions/create": "Buat Misi",
  "/quizzes/create": "Buat Quiz",
};

// Update page title and favicon based on route and dark mode
watchEffect(() => {
  let title = "CarbonQuest";

  // Check exact path first
  if (pageTitles[route.path]) {
    title = `${pageTitles[route.path]} - CarbonQuest`;
  } else if (route.path.startsWith("/articles/edit")) {
    title = "Edit Artikel - CarbonQuest";
  } else if (route.path.startsWith("/missions/edit")) {
    title = "Edit Misi - CarbonQuest";
  } else if (route.path.startsWith("/quizzes/edit")) {
    title = "Edit Quiz - CarbonQuest";
  }

  document.title = title;

  // Update favicon based on dark mode
  const favicon = document.getElementById("favicon");
  if (favicon) {
    favicon.href = logoLight;
  }
});
</script>

<template>
  <RouterView />
</template>
