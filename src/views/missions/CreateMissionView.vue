<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FieldError from "../../components/shared/FieldError.vue";
import { useFormValidation } from "../../composables/useFormValidation";
import { required, selectRequired, pointsRequired } from "../../utils/validation";
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
const apiError = ref("");

const { errors, validate, clearField, clearErrors, touch, hasError } =
  useFormValidation();

async function handleSubmit() {
  apiError.value = "";

  const rules = {
    title: (v) => required(v, "Judul misi"),
    tags: (v) => selectRequired(v, "Tag misi"),
    description: (v) => required(v, "Perintah misi"),
    points: (v) => pointsRequired(v, "Poin misi"),
  };

  if (!validate(rules, form.value)) return;

  clearErrors();

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
    apiError.value = missionsStore.error || "Gagal membuat misi";
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Misi Baru</h1>
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
          Judul Misi
        </label>
        <input
          v-model="form.title"
          @blur="touch('title')"
          @input="clearField('title')"
          type="text"
          placeholder="Ketik judul disini"
          :aria-invalid="hasError('title')"
          :aria-describedby="hasError('title') ? 'title-error' : undefined"
          class="w-full px-4 py-3 rounded-lg outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border focus:ring-2 focus:border-transparent"
          :class="hasError('title') ? 'border-red-500 ring-red-500/20 focus:ring-red-500/30' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'"
        />
        <FieldError :message="hasError('title') ? errors.title : ''" id="title-error" />
      </div>

      <div>
        <label
          class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Tag Misi
        </label>
        <select
          v-model="form.tags"
          @blur="touch('tags')"
          @change="clearField('tags')"
          :aria-invalid="hasError('tags')"
          :aria-describedby="hasError('tags') ? 'tags-error' : undefined"
          class="w-full px-4 py-3 rounded-lg outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white border focus:ring-2 focus:border-transparent"
          :class="hasError('tags') ? 'border-red-500 ring-red-500/20 focus:ring-red-500/30' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'"
        >
          <option value="" disabled>Pilih tag misi</option>
          <option v-for="tag in tagOptions" :key="tag" :value="tag">
            {{ tag.charAt(0).toUpperCase() + tag.slice(1) }}
          </option>
        </select>
        <FieldError :message="hasError('tags') ? errors.tags : ''" id="tags-error" />
      </div>

      <div>
        <label
          class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >Perintah Misi</label
        >
        <textarea
          v-model="form.description"
          @blur="touch('description')"
          @input="clearField('description')"
          rows="8"
          placeholder="Masukkan perintah misi"
          :aria-invalid="hasError('description')"
          :aria-describedby="hasError('description') ? 'description-error' : undefined"
          class="w-full px-4 py-3 rounded-lg outline-none resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border focus:ring-2 focus:border-transparent"
          :class="hasError('description') ? 'border-red-500 ring-red-500/20 focus:ring-red-500/30' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'"
        ></textarea>
        <FieldError :message="hasError('description') ? errors.description : ''" id="description-error" />
      </div>

      <div>
        <label
          class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >Poin Misi</label
        >
        <input
          v-model="form.points"
          @blur="touch('points')"
          @input="clearField('points')"
          type="number"
          placeholder="Masukkan poin (misal: 100)"
          :aria-invalid="hasError('points')"
          :aria-describedby="hasError('points') ? 'points-error' : undefined"
          class="w-full px-4 py-3 rounded-lg outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border focus:ring-2 focus:border-transparent"
          :class="hasError('points') ? 'border-red-500 ring-red-500/20 focus:ring-red-500/30' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'"
        />
        <FieldError :message="hasError('points') ? errors.points : ''" id="points-error" />
      </div>

      <div
        v-if="apiError"
        class="p-4 text-red-700 bg-red-100 border border-red-400 rounded-lg"
      >
        {{ apiError }}
      </div>
    </form>
  </div>
</template>
