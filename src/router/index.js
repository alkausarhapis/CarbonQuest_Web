import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/home",
    name: "Landing",
    component: () => import("../views/LandingView.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/LoginView.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/",
    component: () => import("../layouts/DashboardLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("../views/dashboard/DashboardView.vue"),
      },
      {
        path: "change-password",
        name: "ChangePassword",
        component: () => import("../views/auth/ChangePasswordView.vue"),
      },
      {
        path: "articles",
        name: "Articles",
        component: () => import("../views/articles/ArticlesView.vue"),
      },
      {
        path: "articles/create",
        name: "CreateArticle",
        component: () => import("../views/articles/CreateArticleView.vue"),
      },
      {
        path: "articles/edit/:id",
        name: "EditArticle",
        component: () => import("../views/articles/EditArticleView.vue"),
      },
      {
        path: "missions",
        name: "Missions",
        component: () => import("../views/missions/MissionsView.vue"),
      },
      {
        path: "missions/create",
        name: "CreateMission",
        component: () => import("../views/missions/CreateMissionView.vue"),
      },
      {
        path: "missions/edit/:id",
        name: "EditMission",
        component: () => import("../views/missions/EditMissionView.vue"),
      },
      {
        path: "quizzes/create",
        name: "CreateQuiz",
        component: () => import("../views/quizzes/CreateQuizView.vue"),
      },
      {
        path: "quizzes/edit/:id",
        name: "EditQuiz",
        component: () => import("../views/quizzes/EditQuizView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/home");
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
