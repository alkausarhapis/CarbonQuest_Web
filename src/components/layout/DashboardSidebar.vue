<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const props = defineProps({
  brand: {
    type: String,
    default: "CarbonQuest",
  },
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

const isActive = (path) => {
  if (path === "/dashboard") {
    return route.path === "/dashboard";
  }
  return route.path.startsWith(path);
};

const asideClasses = computed(() => {
  return [
    "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-dark/5 bg-surface px-4 py-6 transition-transform duration-300 lg:static lg:translate-x-0",
    props.open ? "translate-x-0" : "-translate-x-full",
  ].join(" ");
});
</script>

<template>
  <aside :class="asideClasses">
    <div class="flex items-center gap-3 px-2">
      <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-dark text-white">
        <span class="text-sm font-semibold">CQ</span>
      </div>
      <span class="text-lg font-semibold text-dark">{{ props.brand }}</span>
    </div>

    <nav class="mt-8 flex-1 space-y-2">
      <RouterLink
        v-for="item in props.items"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-semibold transition"
        :class="
          isActive(item.path)
            ? 'bg-dark text-white shadow-soft'
            : 'text-dark/60 hover:bg-dark/5'
        "
        @click="emit('close')"
      >
        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-dark/10">
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              :d="item.icon"
            />
          </svg>
        </span>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="rounded-3xl border border-dark/10 bg-dark px-4 py-5 text-white">
      <p class="text-xs uppercase tracking-[0.3em] text-white/60">Carbon Score</p>
      <p class="mt-2 text-2xl font-semibold">845</p>
      <p class="mt-1 text-xs text-white/70">Weekly improvement +12%</p>
    </div>
  </aside>
</template>
