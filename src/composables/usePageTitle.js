import { ref, watchEffect, computed } from "vue";
import { useRoute } from "vue-router";

const pageTitles = {
  "/": "Dashboard - CarbonQuest",
  "/login": "Login - CarbonQuest",
  "/articles": "Artikel - CarbonQuest",
  "/articles/create": "Buat Artikel - CarbonQuest",
  "/missions": "Misi - CarbonQuest",
  "/missions/create": "Buat Misi - CarbonQuest",
  "/quizzes/create": "Buat Quiz - CarbonQuest",
};

export function usePageTitle() {
  const route = useRoute();

  const pageTitle = computed(() => {
    if (pageTitles[route.path]) {
      return pageTitles[route.path];
    }

    if (route.path.startsWith("/articles/edit")) {
      return "Edit Artikel - CarbonQuest";
    }
    if (route.path.startsWith("/missions/edit")) {
      return "Edit Misi - CarbonQuest";
    }
    if (route.path.startsWith("/quizzes/edit")) {
      return "Edit Quiz - CarbonQuest";
    }

    return "CarbonQuest";
  });

  watchEffect(() => {
    document.title = pageTitle.value;
  });

  return {
    pageTitle,
  };
}
