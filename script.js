// Ambil elemen DOM
const form = document.getElementById("articleForm");

const titleInput = document.getElementById("titleInput");
const tagsInput = document.getElementById("tagsInput");
const descInput = document.getElementById("descInput");

const photoCaptionInput = document.getElementById("photoCaptionInput");
const photoCreditInput = document.getElementById("photoCreditInput");
const authorSelect = document.getElementById("authorSelect");
const placeSelect = document.getElementById("placeSelect");
const highlightsInput = document.getElementById("highlightsInput");

const saveDraftBtn = document.getElementById("saveDraftBtn");
const submitBtn = document.getElementById("submitBtn");

const browseBtn = document.getElementById("browseBtn");
const clearImageBtn = document.getElementById("clearImageBtn");
const fileInput = document.getElementById("fileInput");
const selectedFile = document.getElementById("selectedFile");
const imageNote = document.getElementById("imageNote");

const logoutBtn = document.getElementById("logoutBtn");
const toastStack = document.getElementById("toastStack");

function showToast(pesan, variant = "primary") {
  const elemenToast = document.createElement("div");
  elemenToast.className = `toast text-bg-${variant} mb-2`;
  elemenToast.innerHTML = `
    <div class="toast-body">
      ${pesan}
    </div>
  `;
  document.getElementById("toastStack").appendChild(elemenToast);

  const notifikasi = new bootstrap.Toast(elemenToast, { delay: 2000 });
  notifikasi.show();

  elemenToast.addEventListener("hidden.bs.toast", () => elemenToast.remove());
}
function resetImageUI() {
  selectedFile.textContent = "";
  selectedFile.classList.add("d-none");
  imageNote.classList.remove("d-none");
  clearImageBtn.disabled = true;
}

// Init image picker (fungsi kosong dulu, diisi step selanjutnya)
function initImagePicker() {
  if (
    !browseBtn ||
    !fileInput ||
    !clearImageBtn ||
    !selectedFile ||
    !imageNote
  ) {
    console.error("Elemen image picker tidak lengkap.");
    return;
  }

  browseBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    const berkas = fileInput.files?.[0];
    if (!berkas) {
      resetImageUI();
      return;
    }
    selectedFile.textContent = berkas.name;
    selectedFile.classList.remove("d-none");
    imageNote.classList.add("d-none");
    clearImageBtn.disabled = false;
    showToast("Gambar dipilih.", "primary");
  });

  clearImageBtn.addEventListener("click", () => {
    fileInput.value = "";
    resetImageUI();
    showToast("Gambar dihapus.", "danger");
  });
}

function getFormData() {
  return {
    title: titleInput.value.trim(),
    tags: tagsInput.value.trim(),
    description: descInput.value.trim(),
    photoCaption: photoCaptionInput.value.trim(),
    photoCredit: photoCreditInput.value.trim(),
    author: authorSelect.value,
    place: placeSelect.value,
    highlights: highlightsInput.value.trim(),
    imageName: fileInput.files[0]?.name || "", // catatan: berkas tidak akan bisa di-restore otomatis
  };
}

function setFormData(data) {
  titleInput.value = data.title || "";
  tagsInput.value = data.tags || "";
  descInput.value = data.description || "";
  photoCaptionInput.value = data.photoCaption || "";
  photoCreditInput.value = data.photoCredit || "";
  authorSelect.value = data.author || "";
  placeSelect.value = data.place || "";
  highlightsInput.value = data.highlights || "";
  resetImageUI();
}

// Draft helpers (kosong dulu)
function saveDraft() {
  const data = getFormData();
  localStorage.setItem("draftArticle", JSON.stringify(data));
  showToast("Draft saved locally.", "secondary");
}
function loadDraft() {
  const raw = localStorage.getItem("draftArticle");
  if (!raw) return;
  try {
    setFormData(JSON.parse(raw));
  } catch {
    console.warn("Gagal parse draftArticle dari localStorage");
  }
}

// Validasi & Submit (kosong dulu)
function validateForm() {
  let valid = true;

  if (!titleInput.value.trim()) {
    titleInput.classList.add("is-invalid");
    valid = false;
  } else {
    titleInput.classList.remove("is-invalid");
  }

  if (!tagsInput.value.trim()) {
    tagsInput.classList.add("is-invalid");
    valid = false;
  } else {
    tagsInput.classList.remove("is-invalid");
  }

  return valid;
}
function handleSubmit() {
  if (!validateForm()) {
    showToast("Mohon lengkapi field yang wajib diisi.", "danger");
    return;
  }

  const dataKirim = getFormData();
  console.log("Mengirim data artikel:", dataKirim);

  // Demo: anggap sukses, kosongkan draft dan reset form
  localStorage.removeItem("draftArticle");
  form.reset();
  resetImageUI();

  showToast("Artikel berhasil dikirim (demo).", "success");
}

// Logout
function initLogout() {
  logoutBtn.addEventListener("click", () => {
    const yes = confirm("Apakah Anda ingin logout?");
    if (yes) window.location.href = "./login.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  resetImageUI();
  initImagePicker();
  loadDraft();
  initLogout();

  saveDraftBtn.addEventListener("click", saveDraft);
  submitBtn.addEventListener("click", handleSubmit);
});
