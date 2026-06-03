<script setup>
import { useScrollReveal } from "../../composables/useScrollReveal";

const props = defineProps({
  quote: {
    type: String,
    default:
      "Whether you contribute your time, your resources, or your voice, every effort moves us closer to a greener tomorrow.",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  imageAlt: {
    type: String,
    default: "Forest canopy",
  },
});

const { target, isVisible } = useScrollReveal();
</script>

<template>
  <section ref="target" class="relative h-[420px] w-full">
    <slot name="image">
      <img
        v-if="props.imageUrl"
        :src="props.imageUrl"
        :alt="props.imageAlt"
        class="absolute inset-0 h-full w-full object-cover"
      />
    </slot>
    <div class="absolute inset-0 bg-black/50"></div>
    <div
      class="relative mx-auto flex h-full max-w-5xl items-end px-6 pb-16 transition-all duration-700 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
    >
      <p class="font-heading text-2xl font-semibold leading-snug text-white md:text-3xl">
        {{ props.quote }}
      </p>
    </div>
  </section>
</template>
