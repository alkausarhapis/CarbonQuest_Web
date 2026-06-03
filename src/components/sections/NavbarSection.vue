<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  logoText: {
    type: String,
    default: "Envarn",
  },
  menuItems: {
    type: Array,
    default: () => [
      { label: "Home", href: "#home" },
      { label: "About Us", href: "#about" },
      { label: "Service", href: "#service" },
      { label: "Blog", href: "#blog" },
      { label: "Contact us", href: "#contact" },
    ],
  },
  ctaText: {
    type: String,
    default: "Contact Us",
  },
  logoIcon: {
    type: String,
    default: "",
  },
});

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 12;
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav
    class="sticky top-0 z-50 border-b transition-all duration-300"
    :class="
      isScrolled
        ? 'border-white/5 bg-forest/95 shadow-lg shadow-black/10 backdrop-blur'
        : 'border-forest/10 bg-white/95 backdrop-blur'
    "
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-sage-100">
          <img
            v-if="logoIcon"
            :src="logoIcon"
            alt="Logo"
            class="h-5 w-5 object-contain"
          />
          <svg
            v-else
            class="h-5 w-5 text-forest"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M6.8 18.4c4.9-.6 8-2.9 10.8-8.6.2-.4-.1-.8-.6-.7-5.3 1.2-8.6 3.8-10.8 8.6-.1.4.2.8.6.7zm-1.8 2.1c-.3 0-.6-.2-.7-.5-.2-.7-.2-1.6 0-2.7-1.5-4.6-.2-8.5 4.1-11.7 2.9-2.2 6.3-3.4 10.1-3.6.4 0 .7.3.7.7-.2 6.2-3.2 10.8-8.8 13.5-1.7.8-3.4 1.3-5.1 1.5-.2.6-.3 1.1-.3 1.6 0 .4-.3.7-.7.7z"
            />
          </svg>
        </div>
        <span
          class="text-lg font-semibold tracking-wide"
          :class="isScrolled ? 'text-white' : 'text-forest'"
        >
          {{ props.logoText }}
        </span>
      </div>
      <div
        class="hidden items-center gap-6 text-sm font-medium lg:flex"
        :class="isScrolled ? 'text-white/80' : 'text-forest/70'"
      >
        <a
          v-for="item in props.menuItems"
          :key="item.label"
          :href="item.href"
          class="transition"
          :class="isScrolled ? 'hover:text-white' : 'hover:text-forest'"
        >
          {{ item.label }}
        </a>
      </div>
      <button
        type="button"
        class="rounded-full bg-sage-100 px-5 py-2 text-sm font-semibold text-forest transition hover:bg-white"
      >
        {{ props.ctaText }}
      </button>
    </div>
  </nav>
</template>
