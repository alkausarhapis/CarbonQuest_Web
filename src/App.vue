<script setup>
import { RouterView } from "vue-router";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useDarkMode } from "./composables/useDarkMode";

import logoLight from "./assets/img/favicon.ico";

const route = useRoute();
const { isDark } = useDarkMode();

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

watchEffect(() => {
  let title = "CarbonQuest";

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

  const favicon = document.getElementById("favicon");
  if (favicon) {
    favicon.href = logoLight;
  }
});
</script>

<template>
  <RouterView />
</template>
