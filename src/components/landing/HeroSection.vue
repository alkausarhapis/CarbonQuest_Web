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

const floatingStats = [
  { label: "Daily Emissions", value: "4.3 kg CO2" },
  { label: "Weekly Improvement", value: "+12%" },
  { label: "Points", value: "2,450 XP" },
];
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
      <!-- Hero Text Column -->
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
          <span class="rounded-full bg-white px-4 py-2 shadow-soft"
            >Kalkulator Karbon</span
          >
          <span class="rounded-full bg-white px-4 py-2 shadow-soft"
            >Misi Ramah Lingkungan</span
          >
          <span class="rounded-full bg-white px-4 py-2 shadow-soft"
            >Peringkat Komunitas</span
          >
        </div>
      </div>

      <!-- Dashboard Card Column -->
      <div class="relative z-10">
        <!-- Main Carbon Score Card with background image -->
        <div
          class="relative overflow-hidden rounded-[32px] bg-cover bg-center text-white shadow-card min-h-[320px]"
          :style="{ backgroundImage: `url(${homeScreenImage})` }"
        >
          <!-- Dark overlay -->
        </div>

        <!-- Floating stats positioned relative to this column -->
        <div
          v-for="(stat, index) in floatingStats"
          :key="stat.label"
          class="absolute hidden rounded-3xl border border-brand-dark/10 bg-white px-4 py-3 text-sm font-semibold text-brand-dark shadow-soft md:block"
          :class="[
            index === 0 ? '-left-6 top-10 animate-float' : '',
            index === 1 ? '-right-4 top-24 animate-float' : '',
            index === 2 ? 'left-8 -bottom-6 animate-float' : '',
          ]"
        >
          <p class="text-xs text-brand-dark/60">{{ stat.label }}</p>
          <p class="mt-1 text-base">{{ stat.value }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
