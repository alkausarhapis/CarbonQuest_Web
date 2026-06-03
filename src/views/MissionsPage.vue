<script setup>
import { computed, onMounted, ref } from "vue";
import MissionCard from "../components/missions/MissionCard.vue";
import { useMissionStore } from "../stores/missionStore";

const tabs = ["Available", "In Progress", "Completed"];
const activeTab = ref("Available");
const missionStore = useMissionStore();

onMounted(() => {
  if (!missionStore.missions.length) {
    missionStore.loadMissions();
  }
});

const filteredMissions = computed(() => {
  return missionStore.missions.filter(
    (mission) => mission.status === activeTab.value
  );
});
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-8">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-dark/60">
          Eco Missions
        </p>
        <h2 class="mt-3 text-2xl font-semibold text-dark">
          Complete missions and earn rewards
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

    <div class="grid gap-6 md:grid-cols-2">
      <MissionCard
        v-for="mission in filteredMissions"
        :key="mission.title"
        :title="mission.title"
        :xp="mission.xp"
        :progress="mission.progress"
        :difficulty="mission.difficulty"
        :deadline="mission.deadline"
      />
    </div>
  </div>
</template>
