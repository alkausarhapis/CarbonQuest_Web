<script setup>
import { computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import {
  LayoutGrid,
  FileText,
  Target,
  ClipboardCheck,
  KeyRound,
  LogOut,
  X,
} from "@lucide/vue";
import logoSrc from "../../assets/img/logo.png";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const menuItems = [
  { label: "Dashboard", path: "/", icon: LayoutGrid },
  { label: "Artikel", path: "/articles/create", icon: FileText },
  { label: "Misi", path: "/missions/create", icon: Target },
  { label: "Quiz", path: "/quizzes/create", icon: ClipboardCheck },
];

function isActive(path) {
  if (path === "/") return route.path === "/";
  return route.path.startsWith(path);
}

function handleLogout() {
  authStore.logout();
  router.push("/login");
}

const asideClasses = computed(() => [
  "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200 bg-white px-4 py-6 transition-transform duration-200 dark:border-gray-700 dark:bg-gray-900 lg:translate-x-0",
  props.open ? "translate-x-0" : "-translate-x-full",
].join(" "));
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-30 bg-black/50 lg:hidden"
      @click="emit('close')"
    ></div>
  </Teleport>

  <aside :class="asideClasses">
    <div class="flex items-center justify-between px-2">
      <div class="flex items-center gap-3">
        <img
          :src="logoSrc"
          alt="Logo CarbonQuest"
          class="h-10 w-12 shrink-0 object-contain"
        />
        <span class="text-lg font-semibold">
          <span class="text-gray-900 dark:text-white">Carbon</span>
          <span class="text-brand-primary">Quest</span>
        </span>
      </div>
      <button
        @click="emit('close')"
        class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200 lg:hidden"
      >
        <X class="h-5 w-5" />
      </button>
    </div>

    <div class="mt-8 flex-1">
      <p
        class="mb-4 px-2 text-xs font-medium uppercase tracking-widest text-gray-400"
      >
        NAVIGASI
      </p>

      <nav class="space-y-1">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="relative flex h-12 items-center gap-3 rounded-xl px-4 text-sm transition-all duration-200"
          :class="
            isActive(item.path)
              ? 'bg-slate-100 font-semibold text-gray-900 dark:bg-gray-800 dark:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
          "
          @click="emit('close')"
        >
          <span
            v-if="isActive(item.path)"
            class="absolute left-0 top-1 bottom-1 w-1 rounded-r bg-brand-primary"
          ></span>
          <component :is="item.icon" class="h-5 w-5 shrink-0" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
    </div>

    <div class="mt-auto space-y-2">
      <RouterLink
        to="/change-password"
        class="flex h-12 items-center gap-3 rounded-xl bg-gray-100 px-4 text-sm text-gray-700 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <KeyRound class="h-5 w-5 shrink-0" />
        Ganti Password
      </RouterLink>

      <button
        @click="handleLogout"
        class="flex h-12 w-full items-center gap-3 rounded-xl bg-red-50 px-4 text-sm text-red-600 transition-all duration-200 hover:bg-red-100 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
      >
        <LogOut class="h-5 w-5 shrink-0" />
        Logout
      </button>
    </div>
  </aside>
</template>
