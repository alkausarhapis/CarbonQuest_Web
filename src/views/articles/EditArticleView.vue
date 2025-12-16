<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useArticlesStore } from "../../stores/articles";
import api from "../../services/api";

const router = useRouter();
const route = useRoute();
const articlesStore = useArticlesStore();

const form = ref({
  title: "",
  topic: "",
  description: "",
  coverImageFile: null,
  photoCaption: "",
  photoCredit: "",
  authorName: "",
  authorRole: "",
  place: "",
  highlights: "",
});

const imagePreview = ref(null);
const fileInput = ref(null);
const loading = ref(true);

const roles = ["Admin", "Editor", "Writer", "Contributor"];

onMounted(async () => {
  try {
    const response = await api.get(`/articles/${route.params.id}`);
    const article = response.data.data || response.data;
    form.value = {
      title: article.title || "",
      topic: article.topic || "",
      description: article.description || "",
      coverImageFile: null,
      photoCaption: article.photo_caption || "",
      photoCredit: article.photo_credit || "",
      authorName: article.author_name || "",
      authorRole: article.author_role || "",
      place: article.place || "",
      highlights: article.highlights || "",
    };
    if (article.cover_image) {
      // Tampilkan existing image dari server
      imagePreview.value = `https://carbonquest-api.bintangap.my.id${article.cover_image}`;
    }
  } catch (error) {
    // Error handled
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
  try {
    const formData = new FormData();

    // Required fields
    formData.append("title", form.value.title || "Untitled");
    formData.append("content", form.value.description || "No content");

    // Optional fields
    if (form.value.topic) formData.append("topic", form.value.topic);
    if (form.value.description)
      formData.append("description", form.value.description);
    if (form.value.coverImageFile)
      formData.append("coverImage", form.value.coverImageFile);
    if (form.value.photoCaption)
      formData.append("photoCaption", form.value.photoCaption);
    if (form.value.photoCredit)
      formData.append("photoCredit", form.value.photoCredit);
    if (form.value.authorName)
      formData.append("authorName", form.value.authorName);
    if (form.value.authorRole)
      formData.append("authorRole", form.value.authorRole);
    if (form.value.place) formData.append("place", form.value.place);
    if (form.value.highlights)
      formData.append("highlights", form.value.highlights);

    await articlesStore.updateArticle(route.params.id, formData);
    router.push("/");
  } catch (error) {
    // Error handled by store
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Edit Artikel</h1>
      <div class="flex gap-2">
        <button
          @click="router.push('/')"
          type="button"
          class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
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

    <div v-if="loading" class="text-center py-8">Memuat...</div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Article Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Judul Artikel</label
        >
        <input
          v-model="form.title"
          type="text"
          placeholder="Ketik title disini"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <!-- Topic -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Isi Topic</label
        >
        <input
          v-model="form.topic"
          type="text"
          placeholder="e.g., climate, mobility"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Description</label
        >
        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Masukan deskripsi article"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
        ></textarea>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Cover Image -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Cover image</label
          >
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div class="flex gap-2 mb-4">
              <button
                type="button"
                @click="$refs.fileInput.click()"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
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
            <p v-else class="text-gray-400 text-center">No image selected</p>
          </div>
        </div>

        <!-- Right Side Fields -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Photo Caption</label
            >
            <input
              v-model="form.photoCaption"
              type="text"
              placeholder="Short caption"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Photo Credit</label
            >
            <input
              v-model="form.photoCredit"
              type="text"
              placeholder="Photographer or source"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Author Name</label
            >
            <input
              v-model="form.authorName"
              type="text"
              placeholder="Enter author name"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Author Role</label
            >
            <select
              v-model="form.authorRole"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">Select role</option>
              <option v-for="role in roles" :key="role" :value="role">
                {{ role }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Place</label
            >
            <input
              v-model="form.place"
              type="text"
              placeholder="Enter location (e.g., Bandung, Jakarta)"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Highlights -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Highlights</label
        >
        <textarea
          v-model="form.highlights"
          rows="4"
          placeholder="Key points or bullets..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
        ></textarea>
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
