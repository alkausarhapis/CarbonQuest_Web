<script setup>
const props = defineProps({
  brandName: {
    type: String,
    default: "Envarn",
  },
  description: {
    type: String,
    default:
      "Growing resilient ecosystems through community-driven conservation and climate action.",
  },
  navLinks: {
    type: Array,
    default: () => [
      { label: "About Us", href: "#about" },
      { label: "Service", href: "#service" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
  },
  socialLinks: {
    type: Array,
    default: () => [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  },
  copyright: {
    type: String,
    default: "2026 Envarn. All rights reserved.",
  },
});
</script>

<template>
  <footer class="bg-ink px-6 py-16 text-white">
    <div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-sage-100">
            <svg class="h-5 w-5 text-forest" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M6.8 18.4c4.9-.6 8-2.9 10.8-8.6.2-.4-.1-.8-.6-.7-5.3 1.2-8.6 3.8-10.8 8.6-.1.4.2.8.6.7zm-1.8 2.1c-.3 0-.6-.2-.7-.5-.2-.7-.2-1.6 0-2.7-1.5-4.6-.2-8.5 4.1-11.7 2.9-2.2 6.3-3.4 10.1-3.6.4 0 .7.3.7.7-.2 6.2-3.2 10.8-8.8 13.5-1.7.8-3.4 1.3-5.1 1.5-.2.6-.3 1.1-.3 1.6 0 .4-.3.7-.7.7z"
              />
            </svg>
          </div>
          <span class="text-lg font-semibold">{{ props.brandName }}</span>
        </div>
        <p class="mt-4 max-w-sm text-sm text-white/70">
          {{ props.description }}
        </p>
      </div>
      <div class="flex flex-col gap-6 sm:flex-row sm:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Navigation
          </p>
          <ul class="mt-4 space-y-2 text-sm text-white/80">
            <li v-for="link in props.navLinks" :key="link.label">
              <a :href="link.href" class="transition hover:text-white">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Social
          </p>
          <ul class="mt-4 space-y-2 text-sm text-white/80">
            <li v-for="link in props.socialLinks" :key="link.label">
              <a :href="link.href" class="transition hover:text-white">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/50">
      {{ props.copyright }}
    </div>
  </footer>
</template>
