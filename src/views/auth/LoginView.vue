<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AlertCircle, X } from "@lucide/vue";
import logoIcon from "../../assets/img/logo.png";
import LoadingSpinner from "../../components/LoadingSpinner.vue";
import FieldError from "../../components/shared/FieldError.vue";
import { useFormValidation } from "../../composables/useFormValidation";
import { required, email as emailRule } from "../../utils/validation";
import { useDarkMode } from "../../composables/useDarkMode";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const { isDark, toggleDarkMode } = useDarkMode();

const form = ref({ email: "", password: "" });
const showPassword = ref(false);

const { errors, validate, clearField, clearErrors, touch, hasError, setErrors } =
  useFormValidation();

const displayError = ref("");

function clearAllErrors() {
  clearErrors();
  displayError.value = "";
  authStore.error = null;
  localStorage.removeItem("loginError");
}

async function handleLogin() {
  displayError.value = "";

  const rules = {
    email: (v) => required(v, "Email") || emailRule(v),
    password: (v) => required(v, "Kata sandi"),
  };

  if (!validate(rules, form.value)) return;

  clearErrors();

  const success = await authStore.login(form.value.email, form.value.password);
  if (success) {
    router.push("/");
  } else if (authStore.error) {
    displayError.value = authStore.error;
  }
}
</script>

<template>
  <div
    class="flex min-h-screen transition-colors duration-200 bg-white dark:bg-gray-900"
  >
    <div class="relative hidden lg:flex lg:w-1/2">
      <img
        src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=2070"
        alt="Industrial pollution"
        class="object-cover w-full h-full"
      />
      <div
        class="absolute inset-0 flex items-center justify-center bg-black/40"
      >
        <div class="flex items-center gap-4">
          <div class="flex items-center justify-center w-40 h-40">
            <img
              :src="logoIcon"
              alt="CarbonQuest Logo"
              class="object-contain w-40 h-40"
            />
          </div>
          <span class="text-5xl font-bold text-white"
            >Carbon<span class="text-cyan-400">Quest</span></span
          >
        </div>
      </div>
    </div>

    <div
      class="relative flex items-center justify-center w-full p-8 transition-colors duration-200 bg-white lg:w-1/2 dark:bg-gray-900"
    >
      <button
        @click.stop="toggleDarkMode"
        type="button"
        class="absolute p-2 transition-colors duration-200 bg-gray-100 rounded-lg top-4 right-4 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        title="Toggle Dark Mode"
      >
        <svg
          v-if="!isDark"
          class="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>

      <div class="w-full max-w-md">
        <h1 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Masuk ke akun Anda
        </h1>
        <p class="mb-8 text-gray-600 dark:text-gray-400">
          Selamat datang kembali!👋
        </p>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >Email</label
            >
            <input
              v-model="form.email"
              @blur="touch('email')"
              @input="clearField('email'); displayError = ''"
              type="text"
              placeholder="Masukkan email Anda"
              :aria-invalid="hasError('email')"
              :aria-describedby="hasError('email') ? 'email-error' : undefined"
              class="w-full px-4 py-3 text-gray-900 placeholder-gray-400 transition bg-white border rounded-lg outline-none dark:border-gray-600 focus:ring-2 focus:border-transparent dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              :class="hasError('email') ? 'border-red-500 ring-red-500/20 focus:ring-red-500/30' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'"
            />
            <FieldError :message="hasError('email') ? errors.email : ''" id="email-error" />
          </div>

          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >Kata Sandi</label
            >
            <input
              v-model="form.password"
              @blur="touch('password')"
              @input="clearField('password'); displayError = ''"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Masukkan kata sandi"
              :aria-invalid="hasError('password')"
              :aria-describedby="hasError('password') ? 'password-error' : undefined"
              class="w-full px-4 py-3 text-gray-900 placeholder-gray-400 transition bg-white border rounded-lg outline-none dark:border-gray-600 focus:ring-2 focus:border-transparent dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              :class="hasError('password') ? 'border-red-500 ring-red-500/20 focus:ring-red-500/30' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'"
            />
            <FieldError :message="hasError('password') ? errors.password : ''" id="password-error" />
          </div>

          <div class="flex items-center">
            <input
              v-model="showPassword"
              type="checkbox"
              id="showPassword"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 focus:ring-blue-500 dark:bg-gray-800"
            />
            <label
              for="showPassword"
              class="ml-2 text-sm text-gray-600 dark:text-gray-400"
              >Tampilkan Kata Sandi</label
            >
          </div>

          <div
            v-if="displayError"
            class="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm dark:bg-red-950"
          >
            <AlertCircle class="h-5 w-5 shrink-0 text-red-500 dark:text-red-400" />
            <span class="flex-1 font-medium text-red-700 dark:text-red-400">{{
              displayError
            }}</span>
            <button
              @click="clearAllErrors"
              class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-red-400 transition hover:bg-red-200 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-300"
            >
              <X class="h-4 w-4" />
            </button>
          </div>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full px-4 py-3 font-medium text-white transition bg-gray-900 rounded-lg dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <LoadingSpinner v-if="authStore.loading" size="sm" />
            <span v-if="authStore.loading">Memproses...</span>
            <span v-else>Masuk</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
