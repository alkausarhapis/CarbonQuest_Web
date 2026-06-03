<script setup>
import { computed, onMounted, ref } from "vue";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable.vue";
import { useLeaderboardStore } from "../stores/leaderboardStore";

const tabs = ["Monthly", "All Time"];
const activeTab = ref("Monthly");
const leaderboardStore = useLeaderboardStore();

onMounted(() => {
  if (!leaderboardStore.monthly.length) {
    leaderboardStore.loadLeaderboard();
  }
});

const activeLeaders = computed(() => {
  if (activeTab.value === "Monthly") return leaderboardStore.monthly;
  return leaderboardStore.allTime;
});
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-8">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-dark/60">
          Leaderboard
        </p>
        <h2 class="mt-3 text-2xl font-semibold text-dark">
          Celebrate the community impact
        </h2>
      </div>
      <div class="flex gap-2 rounded-full border border-dark/10 bg-white p-2">
        <button
          v-for="tab in tabs"
          :key="tab"
          type="button"
          class="rounded-full px-4 py-2 text-xs font-semibold transition"
          :class="activeTab === tab ? 'bg-dark text-white' : 'text-dark/60'"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <LeaderboardTable :leaders="activeLeaders" />
  </div>
</template>
