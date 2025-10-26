const browseBtn = document.getElementById("browseBtn");
const clearImageBtn = document.getElementById("clearImageBtn");
const fileInput = document.getElementById("fileInput");
const imageNote = document.getElementById("imageNote");
const logoutBtn = document.querySelector(".logout-item");

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

function logout() {
  logoutBtn.addEventListener("click", () => {
    const yes = confirm("Apakah Anda ingin logout?");
    if (yes) window.location.href = "../page_Syarif/index.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  resetImageUI();
  cariGambar();
  logout();
});
