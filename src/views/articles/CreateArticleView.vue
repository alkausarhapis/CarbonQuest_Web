<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useArticlesStore } from "../../stores/articles";

const router = useRouter();
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

const roles = ["Admin", "Editor", "Writer", "Contributor"];

function handleImageSelect(event) {
  const file = event.target.files[0];
  console.log("=== handleImageSelect called ===");
  console.log("Selected file:", file);
  if (file) {
    console.log("File details:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });
    form.value.coverImageFile = file;
    console.log(
      "Stored in form.value.coverImageFile:",
      form.value.coverImageFile
    );
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
      console.log("Preview created successfully");
    };
    reader.readAsDataURL(file);
  } else {
    console.warn("No file selected from input!");
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
    console.log("=== HANDLE SUBMIT CALLED ===");
    console.log("Form values:", JSON.parse(JSON.stringify(form.value)));

    const formData = new FormData();

    // Required fields
    formData.append("title", form.value.title || "Untitled");
    formData.append("content", form.value.description || "No content");

    // Optional fields - gunakan camelCase sesuai API
    if (form.value.topic) formData.append("topic", form.value.topic);
    if (form.value.description)
      formData.append("description", form.value.description);

    // Debug: check if file exists
    console.log("Cover image file:", form.value.coverImageFile);
    if (form.value.coverImageFile) {
      console.log("File name:", form.value.coverImageFile.name);
      console.log("File size:", form.value.coverImageFile.size);
      console.log("File type:", form.value.coverImageFile.type);
      formData.append("coverImage", form.value.coverImageFile);
    } else {
      console.warn("No cover image file selected!");
    }

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

    console.log("Submitting article with FormData");
    // Debug: log all FormData entries
    for (let pair of formData.entries()) {
      console.log(
        pair[0] + ": " + (pair[1] instanceof File ? pair[1].name : pair[1])
      );
    }

    await articlesStore.createArticle(formData);
    router.push("/");
  } catch (error) {
    console.error("Failed to create article:", error);
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Artikel Baru</h1>
      <button
        @click="handleSubmit"
        :disabled="articlesStore.loading"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        Kirim
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Article Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Judul Artikel</label
        >
        <input
          v-model="form.title"
          type="text"
          placeholder="Ketik judul disini"
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
          >Deskripsi</label
        >
        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Masukan deskripsi artikel"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
        ></textarea>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Cover Image -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Gambar Sampul</label
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
            <p v-else class="text-gray-400 text-center">
              Tidak ada gambar dipilih
            </p>
          </div>
        </div>

        <!-- Right Side Fields -->
        <div class="space-y-4">
          <!-- Photo Caption -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Keterangan Foto</label
            >
            <input
              v-model="form.photoCaption"
              type="text"
              placeholder="Keterangan singkat"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Photo Credit -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Kredit Foto</label
            >
            <input
              v-model="form.photoCredit"
              type="text"
              placeholder="Fotografer atau sumber"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Author Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Nama Penulis</label
            >
            <input
              v-model="form.authorName"
              type="text"
              placeholder="Masukkan nama penulis"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Author Role -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Peran Penulis</label
            >
            <select
              v-model="form.authorRole"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">Pilih peran</option>
              <option v-for="role in roles" :key="role" :value="role">
                {{ role }}
              </option>
            </select>
          </div>

          <!-- Place -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Tempat</label
            >
            <input
              v-model="form.place"
              type="text"
              placeholder="Masukkan lokasi (misal: Bandung, Jakarta)"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Highlights -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Sorotan</label
        >
        <textarea
          v-model="form.highlights"
          rows="4"
          placeholder="Poin-poin penting..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
        ></textarea>
      </div>

      <!-- Error Message -->
      <div
        v-if="articlesStore.error"
        class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
      >
        {{ articlesStore.error }}
      </div>
    </form>
  </div>
</template>
