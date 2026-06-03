<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useArticlesStore } from "../../stores/articles";
import { useToastStore } from "../../stores/toast";

const router = useRouter();
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
  if (!form.value.title.trim()) {
    toastStore.error("Judul artikel harus diisi");
    return;
  }
  if (!form.value.topic.trim()) {
    toastStore.error("Topik harus diisi");
    return;
  }
  if (!form.value.description.trim()) {
    toastStore.error("Isi artikel harus diisi");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("title", form.value.title);
    formData.append("topic", form.value.topic);
    formData.append("description", form.value.description);
    formData.append("content", form.value.description);

    if (form.value.coverImageFile) {
      formData.append("coverImage", form.value.coverImageFile);
    }
    if (form.value.place) formData.append("place", form.value.place);

    await articlesStore.createArticle(formData);
    toastStore.success("Artikel berhasil dibuat");
    router.push("/");
  } catch (error) {
    toastStore.error(articlesStore.error || "Gagal membuat artikel");
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Artikel Baru
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
          Kirim
        </button>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Judul Artikel <span class="text-red-500">*</span></label
        >
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
          >Topik <span class="text-red-500">*</span></label
        >
        <input
          v-model="form.topic"
          type="text"
          placeholder="e.g., climate, mobility"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Isi Artikel <span class="text-red-500">*</span></label
        >
        <textarea
          v-model="form.description"
          rows="8"
          placeholder="Masukkan isi artikel"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        ></textarea>
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
        v-if="articlesStore.error"
        class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
      >
        {{ articlesStore.error }}
      </div>
    </form>
  </div>
</template>
