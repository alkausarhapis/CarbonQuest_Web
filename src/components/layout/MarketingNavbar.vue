<script setup>
import { ref } from "vue";

const props = defineProps({
  brand: {
    type: String,
    default: "CarbonQuest",
  },
  menuItems: {
    type: Array,
    default: () => [
      { label: "Features", href: "#features" },
      { label: "Missions", href: "#missions" },
      { label: "Articles", href: "#articles" },
      { label: "Leaderboard", href: "#leaderboard" },
    ],
  },
  cta: {
    type: Object,
    default: () => ({ label: "Start Journey", href: "/dashboard" }),
  },
  secondaryCta: {
    type: Object,
    default: () => ({ label: "Explore Features", href: "#features" }),
  },
});

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<template>
  <nav class="sticky top-0 z-40 border-b border-brand-dark/5 bg-brand-background/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-dark text-white">
            <span class="text-sm font-semibold">CQ</span>
        </div>
          <span class="text-lg font-semibold text-brand-dark">{{ props.brand }}</span>
      </div>

      <div class="hidden items-center gap-8 text-sm font-medium text-brand-dark/70 lg:flex">
        <a
          v-for="item in props.menuItems"
          :key="item.label"
          :href="item.href"
            class="transition hover:text-brand-dark"
        >
          {{ item.label }}
        </a>
      </div>

      <div class="hidden items-center gap-3 lg:flex">
        <a
          :href="props.secondaryCta.href"
            class="rounded-full border border-brand-dark/10 px-5 py-2 text-sm font-semibold text-brand-dark transition hover:border-brand-dark/30"
        >
          {{ props.secondaryCta.label }}
        </a>
        <a
          :href="props.cta.href"
            class="rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-brand-dark shadow-glow transition hover:-translate-y-0.5"
        >
          {{ props.cta.label }}
        </a>
      </div>

      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-full border border-brand-dark/10 text-brand-dark lg:hidden"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <svg
          v-if="!isOpen"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div
      class="border-t border-brand-dark/5 bg-brand-background px-6 pb-6 pt-4 lg:hidden"
      :class="isOpen ? 'block' : 'hidden'"
    >
      <div class="flex flex-col gap-4 text-sm font-medium text-brand-dark/80">
        <a
          v-for="item in props.menuItems"
          :key="item.label"
          :href="item.href"
            class="transition hover:text-brand-dark"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
      </div>
      <div class="mt-5 flex flex-col gap-3">
        <a
          :href="props.secondaryCta.href"
            class="rounded-full border border-brand-dark/10 px-5 py-2 text-center text-sm font-semibold text-brand-dark"
          @click="closeMenu"
        >
          {{ props.secondaryCta.label }}
        </a>
        <a
          :href="props.cta.href"
            class="rounded-full bg-brand-primary px-5 py-2 text-center text-sm font-semibold text-brand-dark"
          @click="closeMenu"
        >
          {{ props.cta.label }}
        </a>
      </div>
    </div>
  </nav>
</template>
