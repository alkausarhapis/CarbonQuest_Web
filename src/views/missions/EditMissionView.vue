<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import LoadingSpinner from "../../components/LoadingSpinner.vue";
import api from "../../services/api";
import { useMissionsStore } from "../../stores/missions";
import { useToastStore } from "../../stores/toast";

const router = useRouter();
const route = useRoute();
const missionsStore = useMissionsStore();
const toastStore = useToastStore();

const form = ref({
  title: "",
  tags: "",
  description: "",
  points: "",
});

const loading = ref(true);

const tagOptions = ["transportasi", "makanan", "energi", "lingkungan"];

onMounted(async () => {
  try {
    const response = await api.get(`/missions/${route.params.id}`);
    const mission = response.data.data || response.data;
    form.value = {
      title: mission.title || "",
      tags: mission.tags || "",
      description: mission.desc || "",
      points: mission.points || "",
    };
  } catch (error) {
  } finally {
    loading.value = false;
  }
});

async function handleSubmit() {
  if (!form.value.title.trim()) {
    toastStore.error("Judul misi harus diisi");
    return;
  }
  if (!form.value.tags) {
    toastStore.error("Tag misi harus dipilih");
    return;
  }
  if (!form.value.description.trim()) {
    toastStore.error("Perintah misi harus diisi");
    return;
  }
  if (!form.value.points) {
    toastStore.error("Poin misi harus diisi");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("title", form.value.title);
    formData.append("tags", form.value.tags);
    formData.append("desc", form.value.description);
    formData.append("points", form.value.points.toString());

    await missionsStore.updateMission(route.params.id, formData);
    toastStore.success("Misi berhasil diperbarui");
    router.push("/");
  } catch (error) {
    toastStore.error(missionsStore.error || "Gagal memperbarui misi");
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Edit Misi</h1>
      <div class="flex gap-2">
        <button
          @click="router.push('/')"
          type="button"
          class="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Batal
        </button>
        <button
          @click="handleSubmit"
          :disabled="missionsStore.loading"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          Perbarui
        </button>
      </div>
    </div>

    <div v-if="loading" class="py-12">
      <LoadingSpinner size="lg" />
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Judul Misi <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Ketik judul disini"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Tag Misi <span class="text-red-500">*</span>
        </label>
        <select
          v-model="form.tags"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="" disabled>Pilih tag misi</option>
          <option v-for="tag in tagOptions" :key="tag" :value="tag">
            {{ tag.charAt(0).toUpperCase() + tag.slice(1) }}
          </option>
        </select>
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Perintah Misi <span class="text-red-500">*</span></label
        >
        <textarea
          v-model="form.description"
          rows="8"
          placeholder="Masukkan perintah misi"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        ></textarea>
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Poin Misi <span class="text-red-500">*</span></label
        >
        <input
          v-model="form.points"
          type="number"
          placeholder="Masukkan poin (misal: 100)"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      <div
        v-if="missionsStore.error"
        class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
      >
        {{ missionsStore.error }}
      </div>
    </form>
  </div>
</template>
