<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMissionsStore } from "../../stores/missions";
import { useToastStore } from "../../stores/toast";

const router = useRouter();
const missionsStore = useMissionsStore();
const toastStore = useToastStore();

const form = ref({
  title: "",
  tags: "",
  description: "",
  points: "",
});

const tagOptions = ["transportasi", "makanan", "energi", "lingkungan"];

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

    await missionsStore.createMission(formData);
    toastStore.success("Misi berhasil dibuat");
    router.push("/");
  } catch (error) {
    toastStore.error(missionsStore.error || "Gagal membuat misi");
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Misi Baru</h1>
      <div class="flex gap-2">
        <button
          @click="router.push('/')"
          type="button"
          class="px-6 py-2 text-gray-700 transition bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Batal
        </button>
        <button
          @click="handleSubmit"
          :disabled="missionsStore.loading"
          class="px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Kirim
        </button>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label
          class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Judul Misi <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Ketik judul disini"
          class="w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
        />
      </div>

      <div>
        <label
          class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Tag Misi <span class="text-red-500">*</span>
        </label>
        <select
          v-model="form.tags"
          class="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="" disabled>Pilih tag misi</option>
          <option v-for="tag in tagOptions" :key="tag" :value="tag">
            {{ tag.charAt(0).toUpperCase() + tag.slice(1) }}
          </option>
        </select>
      </div>

      <div>
        <label
          class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >Perintah Misi <span class="text-red-500">*</span></label
        >
        <textarea
          v-model="form.description"
          rows="8"
          placeholder="Masukkan perintah misi"
          class="w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg outline-none resize-y dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
        ></textarea>
      </div>

      <div>
        <label
          class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >Poin Misi <span class="text-red-500">*</span></label
        >
        <input
          v-model="form.points"
          type="number"
          placeholder="Masukkan poin (misal: 100)"
          class="w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
        />
      </div>

      <div
        v-if="missionsStore.error"
        class="p-4 text-red-700 bg-red-100 border border-red-400 rounded-lg"
      >
        {{ missionsStore.error }}
      </div>
    </form>
  </div>
</template>
