<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Dashboard",
  },
  subtitle: {
    type: String,
    default: "Track your impact across missions and daily habits.",
  },
});

const emit = defineEmits(["toggle"]);
</script>

<template>
  <header class="flex flex-wrap items-center justify-between gap-4 border-b border-dark/5 bg-background px-6 py-5">
    <div class="flex items-center gap-3">
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-2xl border border-dark/10 text-dark lg:hidden"
        @click="emit('toggle')"
        aria-label="Open sidebar"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div>
        <h1 class="font-heading text-2xl font-semibold text-dark">{{ props.title }}</h1>
        <p class="text-sm text-dark/60">{{ props.subtitle }}</p>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <div class="hidden items-center gap-2 rounded-full border border-dark/10 bg-white px-4 py-2 text-sm text-dark/60 md:flex">
        <span class="h-2 w-2 rounded-full bg-success"></span>
        Active streak: 6 days
      </div>
      <div class="flex items-center gap-3 rounded-full border border-dark/10 bg-white px-4 py-2">
        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-dark">
          <span class="text-xs font-semibold">AQ</span>
        </div>
        <div>
          <p class="text-sm font-semibold text-dark">Alya Quinn</p>
          <p class="text-xs text-dark/60">Eco Explorer</p>
        </div>
      </div>
    </div>
  </header>
</template>
