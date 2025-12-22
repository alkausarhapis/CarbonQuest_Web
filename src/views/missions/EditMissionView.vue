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
  coverImageFile: null,
  photoCaption: "",
  authorName: "",
  authorRole: "",
  points: "",
  highlights: "",
});

const imagePreview = ref(null);
const fileInput = ref(null);
const loading = ref(true);

const roles = ["Admin", "Editor", "Writer", "Contributor"];
const tagOptions = ["transportasi", "makanan", "energi", "lingkungan"];

onMounted(async () => {
  try {
    const response = await api.get(`/missions/${route.params.id}`);
    const mission = response.data.data || response.data;
    form.value = {
      title: mission.title || "",
      tags: mission.tags || "",
      description: mission.desc || "",
      coverImageFile: null,
      photoCaption: mission.photo_caption || "",
      authorName: mission.author_name || "",
      authorRole: mission.author_role || "",
      points: mission.points || "",
      highlights: mission.highlights || "",
    };
    if (mission.cover_image) {
      imagePreview.value = `https://carbonquest-api.bintangap.my.id${mission.cover_image}`;
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
  try {
    const formData = new FormData();

    formData.append("title", form.value.title || "Untitled");
    formData.append("desc", form.value.description || "No description");
    formData.append(
      "points",
      form.value.points ? form.value.points.toString() : "0"
    );

    if (form.value.tags) formData.append("tags", form.value.tags);
    if (form.value.coverImageFile)
      formData.append("coverImage", form.value.coverImageFile);
    if (form.value.photoCaption)
      formData.append("photoCaption", form.value.photoCaption);
    if (form.value.authorName)
      formData.append("authorName", form.value.authorName);
    if (form.value.authorRole)
      formData.append("authorRole", form.value.authorRole);
    if (form.value.highlights)
      formData.append("highlights", form.value.highlights);

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
          Mission Title<span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Ketik title disini"
          required
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Tag Misi<span class="text-red-500">*</span>
        </label>
        <select
          v-model="form.tags"
          required
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
          >Description</label
        >
        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Masukan deskripsi mission"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        ></textarea>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Cover image</label
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
              No image selected
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Photo Caption</label
            >
            <input
              v-model="form.photoCaption"
              type="text"
              placeholder="Short caption"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Author Name</label
            >
            <input
              v-model="form.authorName"
              type="text"
              placeholder="Enter author name"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Author Role</label
            >
            <select
              v-model="form.authorRole"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            >
              <option value="">Select role</option>
              <option v-for="role in roles" :key="role" :value="role">
                {{ role }}
              </option>
            </select>
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Mission Points</label
            >
            <input
              v-model="form.points"
              type="number"
              placeholder="Enter points (e.g., 100)"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Highlights</label
        >
        <textarea
          v-model="form.highlights"
          rows="4"
          placeholder="Key points or bullets..."
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        ></textarea>
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
