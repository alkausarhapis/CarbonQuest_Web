<script setup>
import { computed } from "vue";
import { useScrollReveal } from "../../composables/useScrollReveal";

const props = defineProps({
  headlineLines: {
    type: Array,
    default: () => ["Protecting Nature,", "Restoring the Future"],
  },
  subtext: {
    type: String,
    default: "We restore ecosystems, protect forests, and empower communities to live sustainably.",
  },
  primaryCta: {
    type: Object,
    default: () => ({ label: "Join The Mission", href: "#impact" }),
  },
  secondaryCta: {
    type: Object,
    default: () => ({ label: "Donate Now", href: "#impact" }),
  },
  badgeText: {
    type: String,
    default: "FOR THE PLANET. FOR NATURE. FOR PEOPLE.",
  },
  imageAlt: {
    type: String,
    default: "Hands nurturing a young tree",
  },
  imageSrc: {
    type: String,
    default: "",
  },
});

const { target, isVisible } = useScrollReveal();

const badgeId = computed(() => `badge-${Math.random().toString(36).slice(2, 9)}`);
</script>

<template>
  <section
    id="home"
    ref="target"
    class="bg-forest px-6 pb-24 pt-28 text-white"
  >
    <div
      class="mx-auto grid max-w-6xl items-center gap-12 transition-all duration-700 ease-out lg:grid-cols-2"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div>
        <h1 class="font-heading text-4xl font-bold leading-tight md:text-5xl">
          <span v-for="(line, index) in props.headlineLines" :key="index" class="block">
            <span :class="index === 1 ? 'text-sage-100' : ''">
              {{ line }}
            </span>
          </span>
        </h1>
        <p class="mt-5 text-base text-white/70 md:text-lg">
          {{ props.subtext }}
        </p>
        <div class="mt-8 flex flex-wrap items-center gap-4">
          <a
            :href="props.primaryCta.href"
            class="rounded-full bg-sage-100 px-6 py-3 text-sm font-semibold text-forest transition hover:bg-white"
          >
            {{ props.primaryCta.label }}
          </a>
          <a
            :href="props.secondaryCta.href"
            class="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
          >
            {{ props.secondaryCta.label }}
          </a>
        </div>
      </div>
      <div class="relative">
        <div class="absolute -top-6 right-0">
          <div class="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10">
            <svg class="absolute inset-0" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <path
                  :id="badgeId"
                  d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
                />
              </defs>
              <text font-size="7" class="fill-white/80">
                <textPath :href="`#${badgeId}`" startOffset="0%">
                  {{ props.badgeText }}
                </textPath>
              </text>
            </svg>
            <span class="text-xs font-semibold text-white">Eco</span>
          </div>
        </div>
        <div class="rounded-[36px] bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
          <slot name="image">
            <img
              v-if="props.imageSrc"
              :src="props.imageSrc"
              :alt="props.imageAlt"
              class="h-full w-full rounded-[28px] object-cover"
            />
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>
