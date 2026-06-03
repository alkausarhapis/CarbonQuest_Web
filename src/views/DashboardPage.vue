<script setup>
import { computed, onMounted } from "vue";
import StatCard from "../components/shared/StatCard.vue";
import ChartCard from "../components/shared/ChartCard.vue";
import EmissionTrendChart from "../components/dashboard/EmissionTrendChart.vue";
import MissionProgressChart from "../components/dashboard/MissionProgressChart.vue";
import { useCarbonStore } from "../stores/carbonStore";

const carbonStore = useCarbonStore();

onMounted(() => {
  if (!carbonStore.overview.highlights?.length) {
    carbonStore.loadOverview();
  }
});

const highlights = computed(() => carbonStore.overview.highlights || []);
const activities = computed(() => carbonStore.overview.activities || []);
</script>

<template>
  <div class="space-y-8">
    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        v-for="item in highlights"
        :key="item.title"
        :title="item.title"
        :value="item.value"
        :change="item.change"
        :change-label="item.changeLabel"
        :variant="item.variant"
      />
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <ChartCard title="Emission Trend" subtitle="Last 7 days of daily emissions">
          <EmissionTrendChart />
        </ChartCard>
      </div>
      <ChartCard title="Mission Progress" subtitle="Category completion rate">
        <MissionProgressChart />
      </ChartCard>
    </div>

    <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div class="rounded-3xl border border-dark/10 bg-white p-6 shadow-soft">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-sm font-semibold text-dark">Monthly Impact Summary</p>
            <p class="mt-1 text-xs text-dark/60">Your measurable contribution this month</p>
          </div>
          <span class="rounded-full bg-primary/60 px-3 py-1 text-xs font-semibold text-dark">
            April 2026
          </span>
        </div>
        <div class="mt-6 grid gap-4 sm:grid-cols-3">
          <div class="rounded-2xl bg-dark/5 p-4">
            <p class="text-xs text-dark/60">CO2 Avoided</p>
            <p class="mt-2 text-lg font-semibold text-dark">12.4 kg</p>
          </div>
          <div class="rounded-2xl bg-dark/5 p-4">
            <p class="text-xs text-dark/60">Missions Completed</p>
            <p class="mt-2 text-lg font-semibold text-dark">14</p>
          </div>
          <div class="rounded-2xl bg-dark/5 p-4">
            <p class="text-xs text-dark/60">New Badges</p>
            <p class="mt-2 text-lg font-semibold text-dark">3</p>
          </div>
        </div>
      </div>

      <div class="rounded-3xl border border-dark/10 bg-white p-6 shadow-soft">
        <p class="text-sm font-semibold text-dark">Recent Activities</p>
        <div class="mt-4 space-y-4">
          <div
            v-for="activity in activities"
            :key="activity.title"
            class="flex items-start justify-between gap-3"
          >
            <div>
              <p class="text-sm text-dark">{{ activity.title }}</p>
              <p class="mt-1 text-xs text-dark/50">{{ activity.time }}</p>
            </div>
            <span class="text-xs font-semibold text-dark/70">{{ activity.xp }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
