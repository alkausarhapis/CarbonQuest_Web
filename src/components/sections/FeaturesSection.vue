<script setup>
import { useScrollReveal } from "../../composables/useScrollReveal";

const props = defineProps({
  label: {
    type: String,
    default: "FITUR UTAMA",
  },
  title: {
    type: String,
    default: "Fitur yang Menggerakkan Perubahan",
  },
  features: {
    type: Array,
    default: () => [],
  },
});

const { target, isVisible } = useScrollReveal();

const iconPaths = {
  document:
    "M9 3h5l5 5v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm5 1v4h4",
  quiz:
    "M12 3a7 7 0 0 1 7 7v4a7 7 0 1 1-14 0v-4a7 7 0 0 1 7-7zm-3 7h6m-3 4h3",
  leaf:
    "M6.8 18.4c4.9-.6 8-2.9 10.8-8.6.2-.4-.1-.8-.6-.7-5.3 1.2-8.6 3.8-10.8 8.6-.1.4.2.8.6.7z",
  user:
    "M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z",
  shield:
    "M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3zm-2 7 2 2 4-4",
  chart:
    "M5 20h14M8 16V8m4 8V4m4 12v-6",
};
</script>

<template>
  <section id="features" ref="target" class="bg-white px-6 py-20">
    <div
      class="mx-auto max-w-6xl transition-all duration-700 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-sage-600">
          {{ props.label }}
        </p>
        <h2 class="mt-4 font-heading text-3xl font-bold text-ink md:text-4xl">
          {{ props.title }}
        </h2>
      </div>
      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="feature in props.features"
          :key="feature.title"
          class="rounded-3xl border border-sage-100 bg-white p-6 shadow-lg shadow-black/5"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-forest">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                v-if="iconPaths[feature.icon]"
                :d="iconPaths[feature.icon]"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle v-else cx="12" cy="12" r="9" />
            </svg>
          </div>
          <h3 class="mt-5 text-lg font-semibold text-ink">{{ feature.title }}</h3>
          <p class="mt-3 text-sm text-sage-600">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
