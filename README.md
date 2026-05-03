# 🌍 CarbonQuest Dashboard

CarbonQuest Dashboard adalah sistem manajemen konten web yang dirancang khusus untuk mendukung aplikasi mobile CarbonQuest. Dashboard ini berfungsi sebagai portal administrasi untuk mengelola konten artikel edukatif dan misi lingkungan yang akan ditampilkan dalam aplikasi utama.

Melalui dashboard ini, admin dan kontributor dapat dengan mudah membuat, mengedit, dan menghapus konten artikel tentang perubahan iklim serta misi-misi yang mendorong pengguna untuk berkontribusi dalam pengurangan emisi karbon.

🌐 **Live Demo:** [https://carbonquest.bintangap.my.id/](https://carbonquest.bintangap.my.id/)

## 🎯 Fitur-Fitur Dashboard

### Autentikasi

- Login dengan sistem token JWT
- Ganti password
- Protected routes dengan middleware

### Dashboard

- Overview statistik pengguna
- Tampilan progress misi
- Dark mode support

### Manajemen Artikel

- Lihat daftar artikel
- Buat artikel baru (admin)
- Edit artikel (admin)
- Hapus artikel (admin)

### Manajemen Misi

- Lihat daftar misi
- Buat misi baru (admin)
- Edit misi (admin)
- Hapus misi (admin)

### Manajemen Kuis

- Lihat daftar kuis
- Buat kuis baru (admin)
- Edit kuis (admin)
- Hapus kuis (admin)

## 📖 Tentang CarbonQuest

CarbonQuest adalah aplikasi mobile edukatif yang dirancang untuk membantu pengguna memahami, mengukur, dan mengurangi jejak karbon pribadi melalui pendekatan interaktif dan gamifikasi.

### Latar Belakang

Perubahan iklim dan peningkatan emisi karbon merupakan masalah global yang semakin mendesak untuk diatasi. Banyak individu belum memahami seberapa besar kontribusi aktivitas sehari-hari terhadap jejak karbon mereka.

CarbonQuest hadir sebagai solusi untuk:

- ✅ Meningkatkan kesadaran pengguna terhadap dampak lingkungan dari aktivitas harian
- ✅ Menyediakan sarana edukatif yang interaktif melalui kuis dan artikel
- ✅ Mendorong perubahan perilaku melalui sistem misi dan tantangan berhadiah poin

### Fitur Utama

- **📚 Artikel Edukatif** - Baca artikel informatif tentang lingkungan dan jejak karbon
- **🎯 Sistem Misi** - Selesaikan misi untuk mengurangi jejak karbon
- **❓ Kuis Interaktif** - Uji pengetahuan Anda tentang lingkungan
- **📊 Dashboard** - Pantau progress dan pencapaian Anda
- **🌙 Dark Mode** - Antarmuka yang nyaman untuk mata
- **👤 Manajemen Profil** - Kelola akun dan ubah password

## 🛠️ Tech Stack

### Frontend

- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript Framework
- **[Vite](https://vitejs.dev/)** - Next Generation Frontend Tooling
- **[Vue Router](https://router.vuejs.org/)** - Official Router for Vue.js
- **[Pinia](https://pinia.vuejs.org/)** - State Management for Vue
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS Framework
- **[Axios](https://axios-http.com/)** - HTTP Client

### DevOps & Deployment

- **[Docker](https://www.docker.com/)** - Containerization Platform
- **[Nginx](https://www.nginx.com/)** - Web Server
- **[Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/)** - Secure Tunneling

## 📋 Prerequisites

Sebelum memulai, pastikan Anda telah menginstall:

- [Node.js](https://nodejs.org/) (versi 16 atau lebih tinggi)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (untuk deployment)

## 🚀 Cara Menggunakan

### Development (Lokal)

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd CarbonQuest_Web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Konfigurasi API**

   Edit file [src/services/api.js](src/services/api.js) dan sesuaikan `baseURL` dengan backend API Anda:

   ```javascript
   const api = axios.create({
     baseURL: "http://localhost:3000/api", // Sesuaikan dengan URL backend
   });
   ```

4. **Jalankan development server**

   ```bash
   npm run dev
   ```

5. **Buka browser**

   Akses aplikasi di [http://localhost:5173](http://localhost:5173)

### Build untuk Production

```bash
npm run build
```

File hasil build akan tersimpan di folder `dist/`

### Preview Production Build

```bash
npm run preview
```

### Menggunakan Docker (Tanpa Cloudflare)

```bash
# Build image
docker build -t carbonquest-web .

# Run container
docker run -p 8080:80 carbonquest-web
```

Akses di [http://localhost:8080](http://localhost:8080)

## 📁 Struktur Folder

```
CarbonQuest_Web/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, dll
│   ├── components/      # Reusable Vue components
│   │   ├── ConfirmDialog.vue
│   │   ├── LoadingSpinner.vue
│   │   └── Toast.vue
│   ├── composables/     # Vue composition utilities
│   │   ├── useDarkMode.js
│   │   └── usePageTitle.js
│   ├── layouts/         # Layout components
│   │   └── DashboardLayout.vue
│   ├── router/          # Vue Router configuration
│   │   └── index.js
│   ├── services/        # API services
│   │   └── api.js
│   ├── stores/          # Pinia state management
│   │   ├── articles.js
│   │   ├── auth.js
│   │   ├── missions.js
│   │   ├── quizzes.js
│   │   └── toast.js
│   ├── views/           # Page components
│   │   ├── LandingView.vue
│   │   ├── articles/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── missions/
│   │   └── quizzes/
│   ├── App.vue          # Root component
│   ├── main.js          # Application entry point
│   └── style.css        # Global styles
├── docker-compose.yml   # Docker Compose configuration
├── Dockerfile           # Docker configuration
├── nginx.conf           # Nginx configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies & scripts
```

## 🔧 Konfigurasi

### Tailwind CSS

Konfigurasi Tailwind dapat diubah di [tailwind.config.js](tailwind.config.js)

### Vite

Konfigurasi Vite dapat diubah di [vite.config.js](vite.config.js)

### Nginx (Production)

Konfigurasi Nginx untuk production ada di [nginx.conf](nginx.conf)
