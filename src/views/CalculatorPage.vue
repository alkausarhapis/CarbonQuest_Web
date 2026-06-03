<script setup>
import { computed, reactive } from "vue";

const transportOptions = [
  { label: "Motorcycle", value: "motorcycle", factor: 2.1 },
  { label: "Car", value: "car", factor: 3.4 },
  { label: "Public Transport", value: "public", factor: 1.2 },
];

const form = reactive({
  transport: "motorcycle",
  electricity: 12,
  food: 3,
  waste: 1,
});

const transportEmission = computed(() => {
  return transportOptions.find((item) => item.value === form.transport)?.factor || 0;
});

const totalEmission = computed(() => {
  const electricity = Number(form.electricity) * 0.12;
  const food = Number(form.food) * 0.8;
  const waste = Number(form.waste) * 0.5;
  return transportEmission.value + electricity + food + waste;
});

const totalDisplay = computed(() => totalEmission.value.toFixed(1));

const rating = computed(() => {
  if (totalEmission.value < 5) return "Low";
  if (totalEmission.value < 8) return "Moderate";
  return "High";
});

const ratingColor = computed(() => {
  if (rating.value === "Low") return "text-success";
  if (rating.value === "Moderate") return "text-warning";
  return "text-danger";
});

const score = computed(() => {
  const value = Math.round(1000 - totalEmission.value * 80);
  return Math.max(300, value);
});

const suggestions = computed(() => {
  const items = [];
  if (form.transport === "car") {
    items.push("Try public transport twice a week to cut transport emissions.");
  }
  if (form.electricity > 15) {
    items.push("Switch to LED lighting and unplug idle devices overnight.");
  }
  if (form.food > 4) {
    items.push("Add two plant-based meals this week for a quick win.");
  }
  if (form.waste > 2) {
    items.push("Track waste and separate organics to reduce landfill impact.");
  }
  if (items.length === 0) {
    items.push("Great balance! Maintain your habits and keep missions active.");
  }
  return items;
});
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-8">
    <div class="rounded-3xl border border-dark/10 bg-white p-6 shadow-soft">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-dark/60">
            Carbon Calculator
          </p>
          <h2 class="mt-3 text-2xl font-semibold text-dark">
            Estimate your daily emissions
          </h2>
        </div>
        <span class="rounded-full bg-primary/60 px-4 py-2 text-xs font-semibold text-dark">
          SDG 12 aligned
        </span>
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div class="space-y-6">
          <div>
            <label class="text-sm font-semibold text-dark">Transportation</label>
            <div class="mt-3 grid gap-3 sm:grid-cols-3">
              <label
                v-for="option in transportOptions"
                :key="option.value"
                class="flex cursor-pointer items-center justify-between rounded-2xl border border-dark/10 bg-white px-4 py-3 text-sm font-medium text-dark/70 transition hover:border-dark/30"
                :class="form.transport === option.value ? 'border-dark bg-dark text-white' : ''"
              >
                <span>{{ option.label }}</span>
                <input
                  v-model="form.transport"
                  type="radio"
                  :value="option.value"
                  class="hidden"
                />
              </label>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="text-sm font-semibold text-dark">Electricity Usage (kWh)</label>
              <input
                v-model.number="form.electricity"
                type="number"
                min="0"
                class="mt-3 w-full rounded-2xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark focus:border-dark/40 focus:outline-none"
              />
            </div>
            <div>
              <label class="text-sm font-semibold text-dark">Food Consumption (meals)</label>
              <input
                v-model.number="form.food"
                type="number"
                min="0"
                class="mt-3 w-full rounded-2xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark focus:border-dark/40 focus:outline-none"
              />
            </div>
            <div>
              <label class="text-sm font-semibold text-dark">Waste Production (kg)</label>
              <input
                v-model.number="form.waste"
                type="number"
                min="0"
                class="mt-3 w-full rounded-2xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark focus:border-dark/40 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="rounded-3xl border border-dark/10 bg-dark p-6 text-white">
            <p class="text-xs uppercase tracking-[0.3em] text-white/60">Total CO2 Emission</p>
            <p class="mt-3 text-3xl font-semibold">{{ totalDisplay }} kg</p>
            <p class="mt-2 text-sm text-white/70">Estimated daily footprint</p>
          </div>
          <div class="rounded-3xl border border-dark/10 bg-white p-6 shadow-soft">
            <p class="text-xs uppercase tracking-[0.3em] text-dark/50">Environmental Rating</p>
            <p class="mt-3 text-2xl font-semibold" :class="ratingColor">{{ rating }}</p>
            <p class="mt-2 text-sm text-dark/60">Carbon Score</p>
            <p class="mt-1 text-lg font-semibold text-dark">{{ score }}</p>
          </div>
          <div class="rounded-3xl border border-dark/10 bg-white p-6 shadow-soft">
            <p class="text-xs uppercase tracking-[0.3em] text-dark/50">Personalized Suggestions</p>
            <ul class="mt-3 space-y-2 text-sm text-dark/70">
              <li v-for="item in suggestions" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
