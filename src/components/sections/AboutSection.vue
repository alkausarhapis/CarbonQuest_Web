<script setup>
import { useScrollReveal } from "../../composables/useScrollReveal";

const props = defineProps({
  label: {
    type: String,
    default: "WHO WE ARE",
  },
  description: {
    type: String,
    default:
      "We are a global environmental nonprofit committed to protecting forests, restoring ecosystems, and empowering communities to live sustainably.",
  },
  portraitImage: {
    type: String,
    default: "",
  },
  landscapeImage: {
    type: String,
    default: "",
  },
  portraitAlt: {
    type: String,
    default: "Community leader portrait",
  },
  landscapeAlt: {
    type: String,
    default: "Community volunteers holding saplings",
  },
  stats: {
    type: Array,
    default: () => [
      { value: "100K+", label: "Supporters" },
      { value: "12", label: "Active Countries" },
      { value: "10,000+", label: "Volunteers" },
    ],
  },
});

const { target, isVisible } = useScrollReveal();
</script>

<template>
  <section id="about" ref="target" class="bg-white px-6 py-20">
    <div
      class="mx-auto grid max-w-6xl gap-12 transition-all duration-700 ease-out lg:grid-cols-[1.2fr_0.8fr]"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-sage-600">
          {{ props.label }}
        </p>
        <p class="mt-6 font-heading text-2xl font-bold leading-snug text-ink md:text-3xl">
          {{ props.description }}
        </p>
        <div class="mt-8 grid gap-4 sm:grid-cols-3">
          <div
            v-for="stat in props.stats"
            :key="stat.label"
            class="rounded-2xl border border-sage-100 bg-white p-4 shadow-sm"
          >
            <p class="text-lg font-semibold text-ink">{{ stat.value }}</p>
            <p class="text-xs uppercase tracking-[0.2em] text-sage-600">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <div class="overflow-hidden rounded-3xl">
          <img
            v-if="props.portraitImage"
            :src="props.portraitImage"
            :alt="props.portraitAlt"
            class="h-64 w-full object-cover"
          />
        </div>
        <div class="overflow-hidden rounded-3xl">
          <img
            v-if="props.landscapeImage"
            :src="props.landscapeImage"
            :alt="props.landscapeAlt"
            class="h-40 w-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>
