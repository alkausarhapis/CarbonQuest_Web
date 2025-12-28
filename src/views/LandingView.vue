<script setup>
import { useRouter } from "vue-router";
import { useDarkMode } from "../composables/useDarkMode";
import logoIcon from "../assets/img/logo.png";

const router = useRouter();
const { isDark, toggleDarkMode } = useDarkMode();

function goToLogin() {
  router.push("/login");
}
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-200 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
  >
    <nav
      class="flex items-center justify-between px-8 py-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
    >
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-12 h-12">
          <img
            :src="logoIcon"
            alt="CarbonQuest Logo"
            class="object-contain w-12 h-12"
          />
        </div>
        <span class="text-2xl font-bold text-gray-900 dark:text-white"
          >Carbon<span class="text-cyan-400">Quest</span></span
        >
      </div>
      <div class="flex items-center gap-4">
        <button
          @click="toggleDarkMode"
          type="button"
          class="p-2 transition-colors duration-200 bg-gray-100 rounded-lg dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
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
      </div>
    </nav>

    <section class="px-8 py-20 text-center">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-center w-32 h-32 mx-auto mb-8">
          <img
            :src="logoIcon"
            alt="CarbonQuest Logo"
            class="object-contain w-32 h-32"
          />
        </div>
        <h1 class="mb-6 text-6xl font-bold text-gray-900 dark:text-white">
          Carbon<span class="text-cyan-400">Quest</span>
        </h1>
        <p
          class="max-w-2xl mx-auto mb-8 text-xl text-gray-600 dark:text-gray-300"
        >
          Platform edukasi untuk mengurangi jejak karbon dan melestarikan bumi.
          Bergabunglah dalam misi menyelamatkan planet kita untuk generasi
          mendatang.
        </p>
        <a
          href="https://drive.google.com/drive/folders/1jFhOWbdc7BVrS3xr8qWJn1KzOh6Z8_26?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block px-8 py-4 text-lg font-semibold text-white transition bg-gray-900 rounded-lg dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 hover:scale-105"
        >
          Coba Sekarang
        </a>
      </div>
    </section>

    <section class="px-8 py-16 bg-white dark:bg-gray-800">
      <div class="max-w-6xl mx-auto">
        <h2
          class="mb-6 text-4xl font-bold text-center text-gray-900 dark:text-white"
        >
          Latar Belakang
        </h2>
        <div
          class="max-w-4xl mx-auto space-y-6 text-lg text-gray-600 dark:text-gray-300"
        >
          <p>
            Perubahan iklim dan peningkatan emisi karbon merupakan masalah
            global yang semakin mendesak untuk diatasi. Banyak individu belum
            memahami seberapa besar kontribusi aktivitas sehari-hari terhadap
            jejak karbon mereka.
          </p>
          <p>
            Untuk menjawab tantangan tersebut, kami mengembangkan
            <span class="font-semibold text-gray-900 dark:text-white"
              >CarbonQuest</span
            >, sebuah aplikasi edukatif yang dirancang untuk membantu pengguna
            memahami, mengukur, dan mengurangi jejak karbon pribadi melalui
            pendekatan interaktif dan gamifikasi.
          </p>
          <div class="grid gap-4 mt-8 md:grid-cols-2">
            <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div class="flex items-start gap-3">
                <div
                  class="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-400"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p class="text-gray-700 dark:text-gray-300">
                  Meningkatkan kesadaran pengguna terhadap dampak lingkungan
                  dari aktivitas harian
                </p>
              </div>
            </div>
            <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div class="flex items-start gap-3">
                <div
                  class="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-400"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p class="text-gray-700 dark:text-gray-300">
                  Menyediakan sarana edukatif yang interaktif melalui kuis dan
                  artikel
                </p>
              </div>
            </div>
            <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div class="flex items-start gap-3">
                <div
                  class="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-400"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p class="text-gray-700 dark:text-gray-300">
                  Mendorong perubahan perilaku melalui sistem misi dan tantangan
                  berhadiah poin
                </p>
              </div>
            </div>
            <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div class="flex items-start gap-3">
                <div
                  class="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-400"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p class="text-gray-700 dark:text-gray-300">
                  Menghadirkan pengalaman pengguna yang menyenangkan dengan
                  konsep gamifikasi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="px-8 py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div class="max-w-6xl mx-auto">
        <h2
          class="mb-12 text-4xl font-bold text-center text-gray-900 dark:text-white"
        >
          Fitur Utama
        </h2>
        <div class="grid gap-8 md:grid-cols-3">
          <div
            class="p-8 transition bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg"
          >
            <div
              class="flex items-center justify-center w-16 h-16 mb-4 rounded-lg bg-cyan-400"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3
              class="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
            >
              Artikel Edukatif
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Koleksi artikel dengan kategori Tips, Berita, dan Panduan tentang
              perubahan iklim, jejak karbon, dan cara mengurangi dampak
              lingkungan.
            </p>
          </div>

          <div
            class="p-8 transition bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg"
          >
            <div
              class="flex items-center justify-center w-16 h-16 mb-4 rounded-lg bg-cyan-400"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <h3
              class="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
            >
              Sistem Kuis
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Kuis harian, mingguan, dan bulanan dengan penilaian otomatis
              berbasis poin dan feedback performa untuk menguji pengetahuan
              Anda.
            </p>
          </div>

          <div
            class="p-8 transition bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg"
          >
            <div
              class="flex items-center justify-center w-16 h-16 mb-4 rounded-lg bg-cyan-400"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3
              class="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
            >
              Misi & Tantangan
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Daftar misi ramah lingkungan dengan status Aktif, Selesai, atau
              Terkunci. Sistem poin dan hadiah untuk kebiasaan positif.
            </p>
          </div>

          <div
            class="p-8 transition bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg"
          >
            <div
              class="flex items-center justify-center w-16 h-16 mb-4 rounded-lg bg-cyan-400"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3
              class="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
            >
              Profil Pengguna
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Upload foto profil, edit data diri seperti nama, email, bio, dan
              telepon. Pantau progres dan statistik Anda.
            </p>
          </div>

          <div
            class="p-8 transition bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg"
          >
            <div
              class="flex items-center justify-center w-16 h-16 mb-4 rounded-lg bg-cyan-400"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h3
              class="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
            >
              Autentikasi
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Registrasi dan login dengan validasi email, penyimpanan status
              login yang aman, dan logout dengan konfirmasi.
            </p>
          </div>

          <div
            class="p-8 transition bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg"
          >
            <div
              class="flex items-center justify-center w-16 h-16 mb-4 rounded-lg bg-cyan-400"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3
              class="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
            >
              Leaderboard
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Peringkat pengguna berdasarkan skor total dengan desain podium
              khusus untuk tiga besar. Berkompetisi dan raih posisi teratas!
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="px-8 py-16 bg-white dark:bg-gray-800">
      <div class="max-w-6xl mx-auto">
        <h2
          class="mb-12 text-4xl font-bold text-center text-gray-900 dark:text-white"
        >
          Teknologi & Arsitektur
        </h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <h3
              class="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
            >
              Flutter & Dart
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Framework UI multiplatform dengan bahasa pemrograman Dart
            </p>
          </div>
          <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <h3
              class="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
            >
              GetX
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              State management, navigasi, dan dependency injection
            </p>
          </div>
          <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <h3
              class="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
            >
              GetStorage
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Penyimpanan data pengguna secara lokal
            </p>
          </div>
          <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <h3
              class="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
            >
              SharedPreferences
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Menyimpan status login dan sesi aktif
            </p>
          </div>
          <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <h3
              class="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
            >
              Google Fonts
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Tipografi modern dan mudah dibaca
            </p>
          </div>
          <div class="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <h3
              class="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
            >
              Image Picker
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Upload foto profil dari galeri atau kamera
            </p>
          </div>
        </div>
      </div>
    </section>

    <section
      class="px-8 py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div class="max-w-4xl mx-auto">
        <h2
          class="mb-12 text-4xl font-bold text-center text-gray-900 dark:text-white"
        >
          Tim Pengembang
        </h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div
            class="p-6 transition bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg"
          >
            <h3
              class="mb-1 text-lg font-semibold text-gray-900 dark:text-white"
            >
              M. Hafizh Al Kautsar
            </h3>
            <p class="text-cyan-600 dark:text-cyan-400">103022300069</p>
          </div>
          <div
            class="p-6 transition bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg"
          >
            <h3
              class="mb-1 text-lg font-semibold text-gray-900 dark:text-white"
            >
              Bintang Anugrah Pratama
            </h3>
            <p class="text-cyan-600 dark:text-cyan-400">103022300058</p>
          </div>
          <div
            class="p-6 transition bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg"
          >
            <h3
              class="mb-1 text-lg font-semibold text-gray-900 dark:text-white"
            >
              Hizkia Nicander Budiyanto
            </h3>
            <p class="text-cyan-600 dark:text-cyan-400">103022300127</p>
          </div>
          <div
            class="p-6 transition bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg"
          >
            <h3
              class="mb-1 text-lg font-semibold text-gray-900 dark:text-white"
            >
              Albert Febrian
            </h3>
            <p class="text-cyan-600 dark:text-cyan-400">103022300003</p>
          </div>
          <div
            class="p-6 transition bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg"
          >
            <h3
              class="mb-1 text-lg font-semibold text-gray-900 dark:text-white"
            >
              Syarif
            </h3>
            <p class="text-cyan-600 dark:text-cyan-400">103022300094</p>
          </div>
        </div>
      </div>
    </section>

    <section class="px-8 py-20 text-center bg-white dark:bg-gray-800">
      <div class="max-w-3xl mx-auto">
        <h2 class="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
          Bergabunglah dengan Misi Kami
        </h2>
        <p class="mb-8 text-xl text-gray-600 dark:text-gray-300">
          Setiap tindakan kecil membuat perbedaan besar. Mari bersama-sama
          menciptakan masa depan yang lebih hijau dan berkelanjutan.
        </p>
        <a
          href="https://drive.google.com/drive/folders/1jFhOWbdc7BVrS3xr8qWJn1KzOh6Z8_26?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block px-8 py-4 text-lg font-semibold text-white transition bg-gray-900 rounded-lg dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 hover:scale-105"
        >
          Coba Sekarang
        </a>
      </div>
    </section>

    <footer
      class="px-8 py-6 text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <p class="text-gray-600 dark:text-gray-400">
        © 2025 CarbonQuest. All rights reserved.
      </p>
    </footer>
  </div>
</template>
