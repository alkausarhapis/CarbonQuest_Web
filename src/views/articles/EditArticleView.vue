<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import LoadingSpinner from "../../components/LoadingSpinner.vue";
import FieldError from "../../components/shared/FieldError.vue";
import { useFormValidation } from "../../composables/useFormValidation";
import { required } from "../../utils/validation";
import api from "../../services/api";
import { useArticlesStore } from "../../stores/articles";
import { useToastStore } from "../../stores/toast";

const router = useRouter();
const route = useRoute();
const articlesStore = useArticlesStore();
const toastStore = useToastStore();

const form = ref({
  title: "",
  topic: "",
  description: "",
  coverImageFile: null,
  place: "",
});

const imagePreview = ref(null);
const fileInput = ref(null);
const loading = ref(true);
const apiError = ref("");

const { errors, validate, clearField, clearErrors, touch, hasError } =
  useFormValidation();

onMounted(async () => {
  try {
    const response = await api.get(`/articles/${route.params.id}`);
    const article = response.data.data || response.data;
    form.value = {
      title: article.title || "",
      topic: article.topic || "",
      description: article.description || "",
      coverImageFile: null,
      place: article.place || "",
    };
    if (article.cover_image) {
      imagePreview.value = `https://carbonquest-api.bintangap.my.id${article.cover_image}`;
    }
  } catch (error) {
  } finally {
    loading.value = false;
  }
});

function handleImageSelect(event) {
  const file = event.target.files[0];
  if (file) {
    form.value.coverImageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function removeImage() {
  imagePreview.value = null;
  form.value.coverImageFile = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
}

async function handleSubmit() {
  apiError.value = "";

  const rules = {
    title: (v) => required(v, "Judul artikel"),
    topic: (v) => required(v, "Topik"),
    description: (v) => required(v, "Isi artikel"),
  };

  if (!validate(rules, form.value)) return;

  clearErrors();

  try {
    const formData = new FormData();
    formData.append("title", form.value.title);
    formData.append("topic", form.value.topic);
    formData.append("description", form.value.description);
    formData.append("content", form.value.description);

    if (form.value.coverImageFile)
      formData.append("coverImage", form.value.coverImageFile);
    if (form.value.place) formData.append("place", form.value.place);

    await articlesStore.updateArticle(route.params.id, formData);
    toastStore.success("Artikel berhasil diperbarui");
    router.push("/");
  } catch (error) {
    apiError.value = articlesStore.error || "Gagal memperbarui artikel";
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Edit Artikel
      </h1>
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
          :disabled="articlesStore.loading"
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
          >Judul Artikel</label
        >
        <input
          v-model="form.title"
          @blur="touch('title')"
          @input="clearField('title')"
          type="text"
          placeholder="Ketik judul disini"
          :aria-invalid="hasError('title')"
          :aria-describedby="hasError('title') ? 'title-error' : undefined"
          class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          :class="hasError('title') ? 'border-red-500 ring-red-500/20 focus:ring-red-500/30' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'"
        />
        <FieldError :message="hasError('title') ? errors.title : ''" id="title-error" />
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Topik</label
        >
        <input
          v-model="form.topic"
          @blur="touch('topic')"
          @input="clearField('topic')"
          type="text"
          placeholder="e.g., climate, mobility"
          :aria-invalid="hasError('topic')"
          :aria-describedby="hasError('topic') ? 'topic-error' : undefined"
          class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          :class="hasError('topic') ? 'border-red-500 ring-red-500/20 focus:ring-red-500/30' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'"
        />
        <FieldError :message="hasError('topic') ? errors.topic : ''" id="topic-error" />
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Isi Artikel</label
        >
        <textarea
          v-model="form.description"
          @blur="touch('description')"
          @input="clearField('description')"
          rows="8"
          placeholder="Masukkan isi artikel"
          :aria-invalid="hasError('description')"
          :aria-describedby="hasError('description') ? 'description-error' : undefined"
          class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          :class="hasError('description') ? 'border-red-500 ring-red-500/20 focus:ring-red-500/30' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'"
        ></textarea>
        <FieldError :message="hasError('description') ? errors.description : ''" id="description-error" />
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Gambar Sampul</label
        >
        <div
          class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-800"
        >
          <div class="flex gap-2 mb-4">
            <button
              type="button"
              @click="$refs.fileInput.click()"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Cari
            </button>
            <button
              type="button"
              @click="removeImage"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Hapus
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleImageSelect"
              class="hidden"
            />
          </div>
          <div v-if="imagePreview" class="mt-4">
            <img
              :src="imagePreview"
              alt="Preview"
              class="max-h-48 rounded-lg"
            />
          </div>
          <p v-else class="text-gray-400 dark:text-gray-500 text-center">
            Tidak ada gambar dipilih
          </p>
        </div>
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Tempat</label
        >
        <input
          v-model="form.place"
          type="text"
          placeholder="Masukkan lokasi (misal: Bandung, Jakarta)"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      <div
        v-if="apiError"
        class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
      >
        {{ apiError }}
      </div>
    </form>
  </div>
</template>
