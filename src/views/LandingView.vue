<script setup>
import { useDarkMode } from "../composables/useDarkMode";
import logoIcon from "../assets/img/logo.png";
import heroImage from "../assets/img/home-screen.png";

const { isDark, toggleDarkMode } = useDarkMode();
</script>

<template>
  <div
    class="landing-root min-h-screen text-slate-900 transition-colors duration-200 bg-white dark:bg-slate-950 dark:text-slate-100"
  >
    <nav class="sticky top-0 z-20 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div class="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-11 h-11">
            <img
              :src="logoIcon"
              alt="CarbonQuest Logo"
              class="object-contain w-11 h-11"
            />
          </div>
          <span class="text-xl font-semibold tracking-wide"
            >Carbon<span class="text-emerald-500">Quest</span></span
          >
        </div>
        <div class="items-center hidden gap-6 text-sm font-medium md:flex">
          <a class="transition hover:text-emerald-700" href="#beranda"
            >Beranda</a
          >
          <a class="transition hover:text-emerald-700" href="#kalkulator"
            >Kalkulator</a
          >
          <a class="transition hover:text-emerald-700" href="#dampak"
            >Dampak</a
          >
          <a class="transition hover:text-emerald-700" href="#tim"
            >Tentang Kami</a
          >
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="toggleDarkMode"
            type="button"
            class="p-2 transition border rounded-md border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            title="Toggle Dark Mode"
          >
            <svg
              v-if="!isDark"
              class="w-5 h-5 text-slate-700"
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
              class="w-5 h-5 text-amber-400"
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
      </div>
    </nav>

    <section id="beranda" class="relative px-6 pt-16 pb-24">
      <div class="grid items-center gap-12 mx-auto max-w-7xl pt-10">
        <div>
          <p class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-wide text-emerald-700 uppercase border border-emerald-200 rounded-md bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
            Kalkulator Jejak Karbon
          </p>
          <h1 class="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
            Cari tahu berapa banyak CO2 yang kamu hasilkan dan langkah nyata
            untuk menguranginya.
          </h1>
          <p class="mt-5 text-lg text-slate-600 dark:text-slate-300">
            CarbonQuest membantu kamu memahami jejak karbon pribadi, menantang
            diri lewat misi, dan membangun kebiasaan ramah lingkungan melalui
            pendekatan edukatif yang menyenangkan.
          </p>
          <div class="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="https://drive.google.com/drive/folders/1jFhOWbdc7BVrS3xr8qWJn1KzOh6Z8_26?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 text-sm font-semibold text-white transition rounded-md bg-emerald-600 hover:bg-emerald-700"
            >
              Hitung Emisi Karbon Kamu
            </a>
            <a
              href="#fitur"
              class="inline-flex items-center px-6 py-3 text-sm font-semibold transition border rounded-md border-emerald-200 text-emerald-700 hover:border-emerald-300 hover:text-emerald-900 dark:border-emerald-700 dark:text-emerald-200"
            >
              Lihat Fitur Utama
            </a>
          </div>
        </div>
      </div>
    </section>

    <section id="fitur" class="px-6 py-20">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-col items-center text-center">
          <p class="text-xs font-semibold tracking-[0.2em] text-emerald-600">
            FITUR UTAMA
          </p>
          <h2 class="mt-4 text-3xl font-semibold md:text-4xl">
            Platform lengkap untuk perjalanan hijau kamu
          </h2>
        </div>
        <div class="grid gap-6 mt-12 md:grid-cols-2 xl:grid-cols-3">
          <div class="p-6 bg-white border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="mt-5 text-lg font-semibold">Artikel Edukatif</h3>
            <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Panduan, berita, dan tips praktis untuk membantu kamu memahami isu iklim.
            </p>
          </div>
          <div class="p-6 bg-white border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 class="mt-5 text-lg font-semibold">Sistem Kuis</h3>
            <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Uji pengetahuanmu lewat kuis harian dan dapatkan feedback instan.
            </p>
          </div>
          <div class="p-6 bg-white border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 class="mt-5 text-lg font-semibold">Misi & Tantangan</h3>
            <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Rangkaian misi hijau dengan poin, badge, dan hadiah untuk motivasi.
            </p>
          </div>
          <div class="p-6 bg-white border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="mt-5 text-lg font-semibold">Profil Pengguna</h3>
            <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Pantau progres, perbarui profil, dan lihat statistik pribadi kamu.
            </p>
          </div>
          <div class="p-6 bg-white border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 class="mt-5 text-lg font-semibold">Autentikasi Aman</h3>
            <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Registrasi mudah, verifikasi email, dan status login yang terjaga.
            </p>
          </div>
          <div class="p-6 bg-white border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="mt-5 text-lg font-semibold">Leaderboard</h3>
            <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Bersaing sehat dengan teman lewat papan peringkat komunitas hijau.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="kalkulator" class="px-6 py-20 bg-slate-50 dark:bg-slate-900">
      <div class="grid items-center gap-12 mx-auto max-w-7xl lg:grid-cols-2">
        <div class="relative">
          <div class="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 dark:border-emerald-900 dark:bg-emerald-900/20">
            <img
              src="../assets/img/kuis-screen.png"
              alt="Ilustrasi kalkulator"
              class="w-full rounded-2xl object-cover"
            />
          </div>
        </div>
        <div>
          <p class="text-xs font-semibold tracking-[0.2em] text-emerald-600">
            KALKULATOR
          </p>
          <h2 class="mt-4 text-3xl font-semibold md:text-4xl">
            Ayo cek emisi karbon kamu sekarang!
          </h2>
          <p class="mt-4 text-base text-slate-600 dark:text-slate-300">
            Mulai dari transportasi harian, listrik rumah, hingga konsumsi makanan.
            Masukkan datanya dan lihat hasilnya langsung. Bandingkan dengan
            rata-rata nasional atau temanmu untuk memacu perubahan.
          </p>
          <div class="flex flex-wrap items-center gap-4 mt-6">
            <a
              href="https://drive.google.com/drive/folders/1jFhOWbdc7BVrS3xr8qWJn1KzOh6Z8_26?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 text-sm font-semibold text-white transition rounded-md bg-emerald-600 hover:bg-emerald-700"
            >
              Hitung Emisi Karbon Kamu
            </a>
          </div>
        </div>
      </div>
    </section>

    <section id="dampak" class="px-6 py-20">
      <div class="mx-auto max-w-7xl">
        <div class="text-center">
          <p class="text-xs font-semibold tracking-[0.2em] text-emerald-600">
            DAMPAK POSITIF
          </p>
          <h2 class="mt-4 text-3xl font-semibold md:text-4xl">
            4 dampak baik mengurangi emisi karbon
          </h2>
        </div>
        <div class="grid gap-6 mt-12 lg:grid-cols-[1fr_0.9fr_1fr]">
          <div class="space-y-6">
            <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
              <h3 class="text-lg font-semibold">Pemanasan Global</h3>
              <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Emisi yang berlebih memperparah efek rumah kaca. Mengurangi emisi
                membantu menstabilkan suhu bumi.
              </p>
            </div>
            <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
              <h3 class="text-lg font-semibold">Ketersediaan Air</h3>
              <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Iklim yang stabil menjaga siklus air tetap seimbang untuk pertanian
                dan kebutuhan harian.
              </p>
            </div>
          </div>
          <div class="hidden items-center justify-center lg:flex">
            <div class="w-full rounded-2xl border border-emerald-100 bg-emerald-50 px-8 py-10 text-center shadow-sm dark:border-emerald-900 dark:bg-emerald-900/20">
              <p class="text-sm text-emerald-700 dark:text-emerald-300">Dunia Lebih Baik</p>
              <p class="mt-4 text-2xl font-semibold">Dampak nyata dari aksi kecil</p>
              <p class="mt-4 text-sm text-slate-500 dark:text-slate-300">
                Setiap langkah menurunkan jejak karbon berdampak pada kualitas hidup.
              </p>
            </div>
          </div>
          <div class="space-y-6">
            <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
              <h3 class="text-lg font-semibold">Bencana Alam</h3>
              <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Perubahan iklim meningkatkan risiko banjir, kebakaran, hingga badai.
              </p>
            </div>
            <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
              <h3 class="text-lg font-semibold">Isu Kesehatan</h3>
              <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Udara bersih menurunkan risiko penyakit pernapasan dan meningkatkan
                kesejahteraan masyarakat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="tim" class="px-6 py-20">
      <div class="mx-auto max-w-6xl">
        <div class="text-center">
          <p class="text-xs font-semibold tracking-[0.2em] text-emerald-600">
            TIM PENGEMBANG
          </p>
          <h2 class="mt-4 text-3xl font-semibold md:text-4xl">
            Dibangun oleh tim yang peduli lingkungan
          </h2>
        </div>
        <div class="grid gap-6 mt-12 md:grid-cols-2">
          <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <h3 class="text-lg font-semibold">M. Hafizh Al Kautsar</h3>
            <p class="text-sm text-emerald-600 dark:text-emerald-300">103022300069</p>
          </div>
          <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <h3 class="text-lg font-semibold">Bintang Anugrah Pratama</h3>
            <p class="text-sm text-emerald-600 dark:text-emerald-300">103022300058</p>
          </div>
          <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <h3 class="text-lg font-semibold">Hizkia Nicander Budiyanto</h3>
            <p class="text-sm text-emerald-600 dark:text-emerald-300">103022300127</p>
          </div>
          <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <h3 class="text-lg font-semibold">Albert Febrian</h3>
            <p class="text-sm text-emerald-600 dark:text-emerald-300">103022300003</p>
          </div>
          <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <h3 class="text-lg font-semibold">Syarif</h3>
            <p class="text-sm text-emerald-600 dark:text-emerald-300">103022300094</p>
          </div>
        </div>
      </div>
    </section>

    <section class="px-6 pb-20">
      <div class="mx-auto max-w-6xl">
        <div class="cta-panel flex flex-col items-center gap-6 rounded-2xl border border-emerald-700/40 px-8 py-12 text-center text-white">
          <h2 class="text-3xl font-semibold md:text-4xl">
            Bergabunglah dengan misi kami
          </h2>
          <p class="max-w-2xl text-sm text-emerald-50">
            Setiap tindakan kecil menciptakan perubahan besar. Mulai dari langkah
            sederhana hari ini dan jadi bagian komunitas hijau CarbonQuest.
          </p>
          <a
            href="https://drive.google.com/drive/folders/1jFhOWbdc7BVrS3xr8qWJn1KzOh6Z8_26?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-6 py-3 text-sm font-semibold text-emerald-700 transition bg-white rounded-md hover:bg-emerald-50"
          >
            Coba Sekarang
          </a>
        </div>
      </div>
    </section>

    <footer class="px-6 py-8 text-center text-sm text-slate-500">
      © 2026 CarbonQuest. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&display=swap");

.landing-root {
  font-family: "Source Sans 3", ui-sans-serif, system-ui;
}

.hero-card {
  border: 1px solid rgba(148, 163, 184, 0.35);
}

.cta-panel {
  background: linear-gradient(120deg, #0f766e, #0ea5a0 55%, #14b8a6 100%);
}
</style>
