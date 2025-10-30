(function () {
  "use strict";

  const form = document.getElementById("missionForm");
  const titleInput = document.getElementById("titleInput");
  const tagsInput = document.getElementById("tagsInput");
  const descInput = document.getElementById("descInput");
  const highlightsInput = document.getElementById("highlightsInput");
  const photoCaptionInput = document.getElementById("photoCaptionInput");
  const authorInput = document.getElementById("authorInput");
  const authorRoleSelect = document.getElementById("authorRoleSelect");
  const missionPointsInput = document.getElementById("missionPointsInput");

  const submitBtn = document.getElementById("submitBtn");

  const browseBtn = document.getElementById("browseBtn");
  const clearImageBtn = document.getElementById("clearImageBtn");
  const fileInput = document.getElementById("fileInput");
  const imageNote = document.getElementById("imageNote");
  const selectedFile = document.getElementById("selectedFile");

  let selectedImage = null;

  browseBtn.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        selectedImage = {
          name: file.name,
          data: event.target.result,
        };
        imageNote.textContent = `Selected: ${file.name}`;
        selectedFile.textContent = file.name;
        selectedFile.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    }
  });

  clearImageBtn.addEventListener("click", function () {
    fileInput.value = "";
    selectedImage = null;
    imageNote.textContent = "No image selected";
    selectedFile.textContent = "";
    selectedFile.classList.add("hidden");
  });

  function validateForm() {
    let isValid = true;
    const errors = [];

    if (!titleInput.value.trim()) {
      errors.push("Mission title is required");
      isValid = false;
    }

    if (!tagsInput.value.trim()) {
      errors.push("Mission tag is required");
      isValid = false;
    }

    if (!descInput.value.trim()) {
      errors.push("Description is required");
      isValid = false;
    }

    if (!isValid) {
      alert("Please fill in required fields:\n" + errors.join("\n"));
    }

    return isValid;
  }

  function getFormData(isDraft = false) {
    return {
      id: generateId(),
      type: "mission",
      title: titleInput.value.trim(),
      tags: tagsInput.value.trim(),
      description: descInput.value.trim(),
      highlights: highlightsInput.value.trim(),
      photoCaption: photoCaptionInput.value.trim(),
      author: authorInput.value.trim(),
      authorRole: authorRoleSelect.value,
      missionPoints: missionPointsInput.value.trim(),
      image: selectedImage ? selectedImage.data : null,
      imageName: selectedImage ? selectedImage.name : null,
      status: isDraft ? "draft" : "pending",
      createdAt: new Date().toISOString(),
    };
  }

  function generateId() {
    return (
      "mission_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    );
  }

  function saveMission(data) {
    const STORAGE_KEY = "editorial_items_v2";
    let items = [];

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      items = stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error loading from storage:", e);
    }

    items.unshift({
      id: data.id,
      type: data.type,
      tag: data.tags || "General",
      title: data.title,
      author: data.author || "Unknown",
      authorRole: data.authorRole,
      missionPoints: data.missionPoints,
      description: data.description,
      image: data.image,
      imageName: data.imageName,
      stage: data.status === "draft" ? "pending" : "pending",
      createdAt: Date.now(),
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = getFormData(false);
    saveMission(data);

    alert("Mission submitted successfully!");
    window.location.href = "../page_hapis/index.html";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitBtn.click();
  });

  // Logout functionality
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to logout?")) {
        window.location.href = "../page_Hizkia/index.html";
      }
    });
  }
})();
