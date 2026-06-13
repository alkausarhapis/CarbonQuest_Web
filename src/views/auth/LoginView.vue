<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AlertCircle, X, Eye, EyeOff, Loader2 } from "@lucide/vue";
import logoIcon from "../../assets/img/logo.png";
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

const { errors, validate, clearField, clearErrors, touch, hasError } =
  useFormValidation();

const serverError = ref(authStore.error || "");

function clearAllErrors() {
  clearErrors();
  serverError.value = "";
  authStore.error = null;
  localStorage.removeItem("loginError");
}

async function handleLogin(e) {
  e.preventDefault();

  const rules = {
    email: (v) => required(v, "Email") || emailRule(v),
    password: (v) => required(v, "Kata sandi"),
  };

  if (!validate(rules, form.value)) return;

  clearErrors();

  const success = await authStore.login(form.value.email, form.value.password);
  if (success) {
    serverError.value = "";
    router.push("/");
  } else if (authStore.error) {
    serverError.value = authStore.error;
  }
}
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gray-50 p-8 transition-colors duration-200 dark:bg-gray-950 lg:p-10"
  >
    <div
      class="flex w-full max-w-[1600px] flex-col overflow-hidden rounded-3xl shadow-2xl lg:h-[85vh] lg:flex-row"
    >
      <!-- Left Branding Panel -->
      <div
        class="relative hidden w-1/2 flex-col justify-end bg-brand-dark p-12 lg:flex"
      >
        <img
          src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=2070"
          alt=""
          class="absolute inset-0 h-full w-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/60 to-brand-dark/30"
        ></div>

        <div class="relative z-10">
          <div class="flex items-center gap-3">
            <img
              :src="logoIcon"
              alt="CarbonQuest Logo"
              class="h-12 w-16 shrink-0 object-contain"
            />
            <span class="text-2xl font-bold text-white">
              Carbon<span class="text-brand-primary">Quest</span>
            </span>
          </div>
          <div class="mt-6 w-12 border-t border-white/10"></div>
          <p class="mt-6 text-2xl font-semibold text-white">
            Ukur. Kurangi. Dampaki.
          </p>
          <p class="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
            Lacak emisi, selesaikan misi keberlanjutan, dan bangun masa depan
            yang lebih hijau.
          </p>
        </div>

        <!-- Dark mode toggle -->
        <button
          @click.stop="toggleDarkMode"
          type="button"
          class="absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/60 backdrop-blur-sm transition hover:bg-white/20 hover:text-white"
        >
          <svg
            v-if="!isDark"
            class="h-4 w-4"
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
            class="h-4 w-4"
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
      </div>

      <!-- Right Login Panel -->
      <div
        class="flex h-full w-full items-center justify-center bg-white px-8 py-12 transition-colors duration-200 dark:bg-gray-900 lg:w-1/2 lg:px-16"
      >
        <div class="w-full max-w-sm">
          <!-- Mobile brand -->
          <div class="mb-10 flex items-center gap-3 lg:hidden">
            <img
              :src="logoIcon"
              alt="CarbonQuest Logo"
              class="h-8 w-10 shrink-0 object-contain"
            />
            <span class="text-lg font-bold text-gray-900 dark:text-white">
              Carbon<span class="text-brand-primary">Quest</span>
            </span>
          </div>

          <h1
            class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Selamat Datang Kembali
          </h1>
          <p class="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            Masuk untuk mengakses dasbor Anda
          </p>

          <form @submit="handleLogin" class="mt-8 space-y-5">
            <!-- Email -->
            <div>
              <label
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                v-model="form.email"
                @blur="touch('email')"
                @input="clearField('email')"
                type="text"
                placeholder="anda@email.com"
                autocomplete="email"
                :aria-invalid="hasError('email')"
                :aria-describedby="
                  hasError('email') ? 'email-error' : undefined
                "
                class="h-12 w-full rounded-xl border px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                :class="
                  hasError('email')
                    ? 'border-red-400 ring-2 ring-red-400/30'
                    : 'border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30 dark:border-gray-600 dark:focus:border-brand-primary'
                "
              />
              <FieldError
                :message="hasError('email') ? errors.email : ''"
                id="email-error"
              />
            </div>

            <!-- Password -->
            <div>
              <label
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div class="relative">
                <input
                  v-model="form.password"
                  @blur="touch('password')"
                  @input="clearField('password')"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Masukkan kata sandi"
                  autocomplete="current-password"
                  :aria-invalid="hasError('password')"
                  :aria-describedby="
                    hasError('password') ? 'password-error' : undefined
                  "
                  class="h-12 w-full rounded-xl border px-4 pr-12 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                  :class="
                    hasError('password')
                      ? 'border-red-400 ring-2 ring-red-400/30'
                      : 'border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30 dark:border-gray-600 dark:focus:border-brand-primary'
                  "
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Eye v-if="!showPassword" class="h-4 w-4" />
                  <EyeOff v-else class="h-4 w-4" />
                </button>
              </div>
              <FieldError
                :message="hasError('password') ? errors.password : ''"
                id="password-error"
              />
            </div>

            <!-- Error -->
            <div
              v-if="serverError"
              class="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm dark:bg-red-950"
            >
              <AlertCircle
                class="h-5 w-5 shrink-0 text-red-500 dark:text-red-400"
              />
              <span class="flex-1 font-medium text-red-700 dark:text-red-400">
                {{ serverError }}
              </span>
              <button
                @click="clearAllErrors"
                class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-red-400 transition hover:bg-red-200 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-300"
              >
                <X class="h-4 w-4" />
              </button>
            </div>

            <!-- Submit -->
            <button
              type="button"
              @click="handleLogin"
              :disabled="authStore.loading"
              class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-primary text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Loader2 v-if="authStore.loading" class="h-4 w-4 animate-spin" />
              <span v-if="authStore.loading">Memproses...</span>
              <span v-else>Masuk</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
