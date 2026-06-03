<script setup>
import { RouterLink } from "vue-router";
import SearchInput from "./SearchInput.vue";
import { ArrowUpDown, ArrowUp, ArrowDown } from "@lucide/vue";

const props = defineProps({
  title: { type: String, default: "" },
  columns: { type: Array, default: () => [] },
  data: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  emptyMessage: { type: String, default: "Tidak ada data" },
  search: { type: String, default: "" },
  sortKey: { type: String, default: "" },
  sortOrder: { type: String, default: "asc" },
  createLink: { type: String, default: "" },
  createLabel: { type: String, default: "+ Baru" },
  searchPlaceholder: { type: String, default: "Cari..." },
});

const emit = defineEmits([
  "update:search",
  "update:sortKey",
  "update:sortOrder",
  "delete",
]);

function toggleSort(key) {
  if (props.sortKey === key) {
    emit("update:sortOrder", props.sortOrder === "asc" ? "desc" : "asc");
  } else {
    emit("update:sortKey", key);
    emit("update:sortOrder", "asc");
  }
}

function sortIcon(key) {
  if (props.sortKey !== key) return ArrowUpDown;
  return props.sortOrder === "asc" ? ArrowUp : ArrowDown;
}

const skeletonRows = [1, 2, 3, 4, 5];
</script>

<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
  >
    <!-- Header -->
    <div
      class="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between"
    >
      <h3
        v-if="title"
        class="text-base font-semibold text-gray-900 dark:text-white"
      >
        {{ title }}
      </h3>
      <div class="flex items-center gap-3">
        <SearchInput
          v-if="search !== undefined"
          :model-value="search"
          :placeholder="searchPlaceholder"
          class="w-full sm:w-56"
          @update:model-value="emit('update:search', $event)"
        />
        <RouterLink
          v-if="createLink"
          :to="createLink"
          class="inline-flex h-10 items-center gap-2 rounded-xl bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          <svg
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          {{ createLabel }}
        </RouterLink>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th
              v-for="col in columns"
              :key="col.key"
              :class="[
                'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 align-middle',
                col.sortable ? 'cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200' : '',
              ]"
              :style="col.width ? { width: col.width } : {}"
              @click="col.sortable ? toggleSort(col.key) : null"
            >
              <div class="flex items-center gap-1.5">
                <span>{{ col.label }}</span>
                <component
                  v-if="col.sortable"
                  :is="sortIcon(col.key)"
                  class="h-3.5 w-3.5 shrink-0"
                  :class="sortKey === col.key ? 'text-brand-primary' : 'text-gray-300 dark:text-gray-600'"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Loading Skeleton -->
          <tr v-if="loading" v-for="n in skeletonRows" :key="'skeleton-' + n">
            <td
              v-for="col in columns"
              :key="'sk-' + col.key"
               class="px-6 py-4 align-middle"
            >
              <div
                class="h-4 animate-pulse rounded bg-gray-100 dark:bg-gray-800"
                :class="
                  n % 2 === 0 ? 'w-3/4' : n % 3 === 0 ? 'w-1/2' : 'w-2/3'
                "
              ></div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-else-if="data.length === 0">
            <td
              :colspan="columns.length"
              class="px-6 py-16 text-center text-gray-400 dark:text-gray-500"
            >
              <svg
                class="mx-auto mb-3 h-10 w-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p class="text-sm font-medium">{{ emptyMessage }}</p>
            </td>
          </tr>

          <!-- Data Rows -->
          <tr
            v-for="(row, rowIndex) in data"
            :key="rowIndex"
            class="border-b border-gray-100 transition last:border-0 hover:bg-gray-50/50 dark:border-gray-700/50 dark:hover:bg-gray-800/30"
          >
            <td
              v-for="col in columns"
              :key="col.key"
               class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 align-middle"
            >
              <slot
                name="cell"
                :key="col.key"
                :row="row"
                :value="row[col.key]"
              >
                {{ row[col.key] ?? "-" }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
