<script setup>
import { computed } from "vue";

const props = defineProps({
  text: { type: String, default: "" },
  variant: {
    type: String,
    default: "default",
    validator: (v) => ["role", "tag", "category", "default"].includes(v),
  },
});

const roleColors = {
  Admin: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Editor: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  Writer: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Contributor: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

const tagColors = {
  transportasi: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  makanan: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  energi: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  lingkungan: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
};

const categoryColors = {
  Harian: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  Mingguan: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Bulanan: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
};

const badgeClass = computed(() => {
  if (props.variant === "role") {
    return roleColors[props.text] || roleColors.Contributor;
  }
  if (props.variant === "tag") {
    return tagColors[props.text?.toLowerCase()] || tagColors.transportasi;
  }
  if (props.variant === "category") {
    return categoryColors[props.text] || roleColors.Contributor;
  }
  return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
});
</script>

<template>
  <span
    v-if="text"
    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
    :class="badgeClass"
  >{{ text }}
  </span>
  <span v-else class="text-gray-400">-</span>
</template>
