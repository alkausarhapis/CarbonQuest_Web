<script setup>
import { useScrollReveal } from "../../composables/useScrollReveal";

const props = defineProps({
  title: {
    type: String,
    default: "Be Part of the Change",
  },
  description: {
    type: String,
    default:
      "Your support fuels reforestation, education, and community-led climate solutions across the globe.",
  },
  actionLink: {
    type: String,
    default: "#",
  },
  volunteerLink: {
    type: String,
    default: "#",
  },
});

const emit = defineEmits(["join", "collaborate"]);

const { target, isVisible } = useScrollReveal();

const joinVolunteer = () => {
  emit("join");
};

const collaborate = () => {
  emit("collaborate");
};
</script>

<template>
  <section id="impact" ref="target" class="bg-sage-100 px-6 py-20">
    <div
      class="mx-auto max-w-6xl transition-all duration-700 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <h2 class="font-heading text-3xl font-bold leading-tight text-ink md:text-4xl">
          {{ props.title }}
        </h2>
        <p class="max-w-xl text-sm text-sage-700">
          {{ props.description }}
        </p>
      </div>
      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <div class="rounded-3xl bg-white p-6 shadow-lg shadow-black/5">
          <h3 class="text-lg font-semibold">Hitung Jejak Karbon</h3>
          <p class="mt-3 text-sm text-sage-600">
            Mulai dengan kalkulator emisi harian untuk melihat dampak nyata aktivitasmu.
          </p>
          <a
            :href="props.actionLink"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex w-full items-center justify-center rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-forest"
          >
            Buka Kalkulator
          </a>
        </div>
        <div class="rounded-3xl bg-white p-6 shadow-lg shadow-black/5">
          <h3 class="text-lg font-semibold">Volunteer with Us</h3>
          <p class="mt-3 text-sm text-sage-600">
            Join field programs, local events, and community education initiatives.
          </p>
          <a
            :href="props.volunteerLink"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest"
            @click="joinVolunteer"
          >
            Join Now
          </a>
        </div>
        <div class="rounded-3xl bg-white p-6 shadow-lg shadow-black/5">
          <h3 class="text-lg font-semibold">Partner for Impact</h3>
          <p class="mt-3 text-sm text-sage-600">
            Collaborate with us to scale sustainable solutions worldwide.
          </p>
          <button
            type="button"
            class="mt-6 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest"
            @click="collaborate"
          >
            Let's Collaborate
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
