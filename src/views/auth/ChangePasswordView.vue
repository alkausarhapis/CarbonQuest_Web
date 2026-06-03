<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FieldError from "../../components/shared/FieldError.vue";
import { useFormValidation } from "../../composables/useFormValidation";
import { required, minLength, matches, notMatch } from "../../utils/validation";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const successMessage = ref("");
const serverError = ref("");

const { errors, validate, clearField, clearErrors, touch, hasError } =
  useFormValidation();

async function handleChangePassword() {
  successMessage.value = "";
  serverError.value = "";

  const rules = {
    currentPassword: (v) => required(v, "Password saat ini"),
    newPassword: (v) =>
      required(v, "Password baru") || minLength(v, 6, "Password baru"),
    confirmPassword: (v) =>
      required(v, "Konfirmasi password") || matches(v, form.value.newPassword, "Konfirmasi password"),
  };

  if (!validate(rules, form.value)) return;

  if (form.value.currentPassword === form.value.newPassword) {
    errors.value.newPassword = "Password baru harus berbeda dengan password lama";
    touch("newPassword");
    return;
  }

  clearErrors();

  const success = await authStore.changePassword(
    form.value.currentPassword,
    form.value.newPassword
  );

  if (success) {
    successMessage.value = "Password berhasil diubah!";
    form.value.currentPassword = "";
    form.value.newPassword = "";
    form.value.confirmPassword = "";

    setTimeout(() => {
      router.push("/");
    }, 2000);
  } else if (authStore.error) {
    serverError.value = authStore.error;
  }
}

function handleCancel() {
  router.push("/");
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200"
    >
      <div class="p-6 border-b dark:border-gray-700">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Ganti Password
        </h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Ubah password akun Anda
        </p>
      </div>

      <form @submit.prevent="handleChangePassword" class="p-6 space-y-6">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password Saat Ini
          </label>
          <div class="relative">
            <input
              v-model="form.currentPassword"
              @blur="touch('currentPassword')"
              @input="clearField('currentPassword'); serverError = ''"
              :type="showCurrentPassword ? 'text' : 'password'"
              placeholder="Masukkan password saat ini"
              autocomplete="current-password"
              :aria-invalid="hasError('currentPassword')"
              :aria-describedby="hasError('currentPassword') ? 'currentPassword-error' : undefined"
              class="w-full pl-4 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
              :class="hasError('currentPassword') ? 'border-red-500 ring-red-500/20 focus:ring-red-500/30' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'"
            />
            <button
              type="button"
              @click="showCurrentPassword = !showCurrentPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <svg v-if="!showCurrentPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
          </div>
          <FieldError :message="hasError('currentPassword') ? errors.currentPassword : ''" id="currentPassword-error" />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password Baru
          </label>
          <div class="relative">
            <input
              v-model="form.newPassword"
              @blur="touch('newPassword')"
              @input="clearField('newPassword'); serverError = ''"
              :type="showNewPassword ? 'text' : 'password'"
              placeholder="Masukkan password baru (min. 6 karakter)"
              autocomplete="new-password"
              :aria-invalid="hasError('newPassword')"
              :aria-describedby="hasError('newPassword') ? 'newPassword-error' : undefined"
              class="w-full pl-4 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
              :class="hasError('newPassword') ? 'border-red-500 ring-red-500/20 focus:ring-red-500/30' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'"
            />
            <button
              type="button"
              @click="showNewPassword = !showNewPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <svg v-if="!showNewPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
          </div>
          <FieldError :message="hasError('newPassword') ? errors.newPassword : ''" id="newPassword-error" />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Konfirmasi Password Baru
          </label>
          <div class="relative">
            <input
              v-model="form.confirmPassword"
              @blur="touch('confirmPassword')"
              @input="clearField('confirmPassword'); serverError = ''"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Masukkan ulang password baru"
              autocomplete="new-password"
              :aria-invalid="hasError('confirmPassword')"
              :aria-describedby="hasError('confirmPassword') ? 'confirmPassword-error' : undefined"
              class="w-full pl-4 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
              :class="hasError('confirmPassword') ? 'border-red-500 ring-red-500/20 focus:ring-red-500/30' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
          </div>
          <FieldError :message="hasError('confirmPassword') ? errors.confirmPassword : ''" id="confirmPassword-error" />
        </div>

        <div
          v-if="successMessage"
          class="p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg"
        >
          {{ successMessage }}
        </div>

        <div
          v-if="serverError"
          class="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg"
        >
          {{ serverError }}
        </div>

        <div class="flex gap-3">
          <button
            type="button"
            @click="handleCancel"
            class="flex-1 py-3 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="authStore.loading"
            class="flex-1 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="authStore.loading">Memproses...</span>
            <span v-else>Simpan Password</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
