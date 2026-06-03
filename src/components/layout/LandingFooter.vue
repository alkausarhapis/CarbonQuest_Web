<script setup>
import logoSrc from "../../assets/img/logo.png";

const props = defineProps({
  brand: {
    type: String,
    default: "CarbonQuest",
  },
  description: {
    type: String,
    default:
      "Ukur jejak karbonmu, selesaikan misi, dan ubah kebiasaan harian menjadi dampak iklim.",
  },
  navLinks: {
    type: Array,
    default: () => [
      { label: "Fitur", href: "#features" },
      { label: "Misi", href: "#missions" },
      { label: "Artikel", href: "#articles" },
      { label: "Peringkat", href: "#leaderboard" },
    ],
  },
  resourceLinks: {
    type: Array,
    default: () => [
      { label: "Kalkulator", href: "/calculator" },
      { label: "Kuis", href: "/quizzes" },
      { label: "Dasbor", href: "/dashboard" },
    ],
  },
  socialLinks: {
    type: Array,
    default: () => [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  },
  copyright: {
    type: String,
    default: "2026 CarbonQuest. Semua hak dilindungi.",
  },
});
</script>

<template>
  <footer class="bg-brand-secondary text-white">
    <div class="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <div class="flex items-center gap-3">
          <img
            :src="logoSrc"
            alt="Logo CarbonQuest"
            class="h-14 w-20 shrink-0 object-contain"
          />
          <span class="text-lg font-semibold">{{ props.brand }}</span>
        </div>
        <p class="mt-4 max-w-sm text-sm text-white/70">
          {{ props.description }}
        </p>
      </div>
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
          Platform
        </p>
        <ul class="mt-4 space-y-2 text-sm text-white/75">
          <li v-for="link in props.navLinks" :key="link.label">
            <a :href="link.href" class="transition hover:text-white">
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
          Sumber Daya
        </p>
        <ul class="mt-4 space-y-2 text-sm text-white/75">
          <li v-for="link in props.resourceLinks" :key="link.label">
            <a :href="link.href" class="transition hover:text-white">
              {{ link.label }}
            </a>
          </li>
        </ul>
        <div class="mt-6 flex items-center gap-4 text-sm text-white/65">
          <a
            v-for="link in props.socialLinks"
            :key="link.label"
            :href="link.href"
            class="transition hover:text-white"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
    <div class="border-t border-white/10">
      <div class="mx-auto max-w-6xl px-6 py-6 text-xs text-white/50">
        {{ props.copyright }}
      </div>
    </div>
  </footer>
</template>
