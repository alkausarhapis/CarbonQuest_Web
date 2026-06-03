<script setup>
const props = defineProps({
  primaryCta: {
    type: Object,
    default: () => ({ label: "Start Journey", href: 'https://drive.google.com/drive/folders/1jFhOWbdc7BVrS3xr8qWJn1KzOh6Z8_26' }),
  },
  secondaryCta: {
    type: Object,
    default: () => ({ label: "Talk to our team", href: "#" }),
  },
});
</script>

<template>
  <section id="cta" class="bg-brand-white px-6 py-20">
    <div class="mx-auto max-w-6xl">
      <div class="relative overflow-hidden rounded-3xl bg-brand-dark px-8 py-12 text-white shadow-card">
        <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-primary/70 blur-[80px]"></div>
        <div class="relative z-10">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Start Your CarbonQuest
          </p>
          <h2 class="mt-4 text-3xl font-semibold md:text-4xl">
            Make sustainability feel effortless, measurable, and rewarding.
          </h2>
          <p class="mt-4 max-w-2xl text-sm text-white/70 md:text-base">
            Join a new generation of climate-aware people turning daily actions
            into meaningful progress with missions, quizzes, and community goals.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <a
              :href="props.primaryCta.href"
              class="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-dark"
            >
              {{ props.primaryCta.label }}
            </a>
            <a
              :href="props.secondaryCta.href"
              class="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white"
            >
              {{ props.secondaryCta.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
