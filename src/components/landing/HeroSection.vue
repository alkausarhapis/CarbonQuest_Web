<script setup>
import homeScreenImage from "../../assets/img/home-screen.png";

const props = defineProps({
  primaryCta: {
    type: Object,
    default: () => ({ label: "Start Journey", href: "/dashboard" }),
  },
  secondaryCta: {
    type: Object,
    default: () => ({ label: "Explore Features", href: "#features" }),
  },
});
</script>

<template>
  <section id="home" class="relative overflow-hidden bg-brand-background">
    <div class="absolute inset-0 bg-hero-radial"></div>

    <div
      class="absolute -right-16 top-24 h-48 w-48 rounded-full bg-brand-primary/60 blur-[80px]"
    ></div>

    <div
      class="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-28 lg:grid-cols-2"
    >
      <!-- Left Content -->
      <div class="relative z-10 animate-fade-up">
        <p
          class="inline-flex items-center gap-2 rounded-full border border-brand-dark/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-dark/60"
        >
          Platform Siap SDG 12
        </p>

        <h1
          class="mt-6 font-brandHeading text-4xl font-semibold leading-tight text-brand-dark md:text-5xl"
        >
          Pantau Karbon. Selesaikan Misi. Ciptakan Dampak.
        </h1>

        <p class="mt-5 text-base text-brand-dark/60 md:text-lg">
          Ukur jejak karbonmu, pelajari kebiasaan berkelanjutan, selesaikan misi
          ramah lingkungan, dan bersaing dengan pengguna lain sambil
          berkontribusi pada masa depan yang lebih hijau.
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-4">
          <a
            :href="props.primaryCta.href"
            class="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-dark shadow-glow transition hover:-translate-y-0.5"
          >
            {{ props.primaryCta.label }}
          </a>

          <a
            :href="props.secondaryCta.href"
            class="rounded-full border border-brand-dark/10 px-6 py-3 text-sm font-semibold text-brand-dark/70 transition hover:border-brand-dark/40"
          >
            {{ props.secondaryCta.label }}
          </a>
        </div>

        <div
          class="mt-8 flex flex-wrap gap-3 text-xs font-semibold text-brand-dark/70"
        >
          <span class="rounded-full bg-white px-4 py-2 shadow-soft">
            Kalkulator Karbon
          </span>

          <span class="rounded-full bg-white px-4 py-2 shadow-soft">
            Misi Ramah Lingkungan
          </span>

          <span class="rounded-full bg-white px-4 py-2 shadow-soft">
            Peringkat Komunitas
          </span>
        </div>
      </div>

      <!-- Right Content -->
      <div class="relative z-10 flex justify-center">
        <div class="relative w-fit">
          <!-- Phone Mockup -->
          <img
            :src="homeScreenImage"
            alt="CarbonQuest App"
            class="h-auto w-full max-w-[240px] lg:max-w-[300px]"
          />

          <!-- Daily Emissions -->
          <div
            class="absolute -left-[20%] top-[8%] hidden rounded-3xl border border-brand-dark/10 bg-white px-4 py-3 shadow-soft md:block animate-float"
          >
            <p class="text-xs font-semibold text-brand-dark/60">
              Daily Emissions
            </p>
            <p class="mt-1 text-base font-semibold text-brand-dark">
              4.3 kg CO2
            </p>
          </div>

          <!-- Weekly Improvement -->
          <div
            class="absolute -right-[38%] top-[45%] hidden rounded-3xl border border-brand-dark/10 bg-white px-4 py-3 shadow-soft md:block animate-float"
          >
            <p class="text-xs font-semibold text-brand-dark/60">
              Weekly Improvement
            </p>
            <p class="mt-1 text-base font-semibold text-brand-dark">
              +12%
            </p>
          </div>

          <!-- Points -->
          <div
            class="absolute bottom-[12%] -left-[20%] hidden rounded-3xl border border-brand-dark/10 bg-white px-4 py-3 shadow-soft md:block animate-float"
          >
            <p class="text-xs font-semibold text-brand-dark/60">
              Points
            </p>
            <p class="mt-1 text-base font-semibold text-brand-dark">
              2,450 XP
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>