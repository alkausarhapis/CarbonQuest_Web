const logoutBtn = document.querySelector(".logout-item");
logoutBtn.addEventListener("click", function () {
  const confirmLogout = confirm("Kamu yakin ingin logout?");
  if (confirmLogout) {
    window.location.href = "../page_Syarif/index.html";
  }
});

// Ambil elemen DOM
const browseBtn = document.getElementById("browseBtn");
const clearImageBtn = document.getElementById("clearImageBtn");
const fileInput = document.getElementById("fileInput");
const imageNote = document.getElementById("imageNote");

function resetImageUI() {
  imageNote.textContent = "No image selected";
  clearImageBtn.disabled = true;
}

function cariGambar() {
  browseBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (!file) {
      resetImageUI();
      return;
    }
    imageNote.textContent = file.name;
    clearImageBtn.disabled = false;
  });

  clearImageBtn.addEventListener("click", () => {
    fileInput.value = "";
    resetImageUI();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  resetImageUI();
  cariGambar();
  logout();
});
