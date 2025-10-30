const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const contentList = $("#contentList");
const template = $("#cardTemplate");

const STORAGE_KEY = "editorial_items_v2";

function seed() {
  return [];
}

function load() {
  const json = localStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : seed();
}
function save(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
let items = load();

function uid() {
  return Math.random().toString(36).slice(2, 10);
}
function formatDateTime(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hh}:${mm}`;
}

function render(filter = "all", query = "") {
  contentList.innerHTML = "";
  const normalized = query.toLowerCase();

  const filteredItems = items
    .filter((it) => (filter === "all" ? true : it.type === filter))
    .filter((it) =>
      (it.title + it.author + it.tag).toLowerCase().includes(normalized)
    );

  filteredItems.forEach((it) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.dataset.id = it.id;
    node.querySelector(".pill.tag").textContent = it.tag;
    node.querySelector(".title").textContent = it.title;
    node.querySelector(".author").textContent = it.author;
    node.querySelector(".time").textContent = formatDateTime(
      it.updatedAt || it.createdAt
    );

    const aiCheckEl = node.querySelector(".ai-check");
    if (it.updatedAt && it.updatedAt !== it.createdAt) {
      aiCheckEl.textContent = "Edited";
    } else {
      aiCheckEl.textContent = "";
    }

    const pointsEl = node.querySelector(".mission-points");
    if (it.type === "mission" && it.missionPoints) {
      pointsEl.textContent = `🎯 ${it.missionPoints} Points`;
      pointsEl.classList.add("show");
    }

    const descEl = node.querySelector(".description");
    if (it.description) {
      descEl.textContent = it.description;
    } else {
      descEl.textContent = "No description available.";
    }

    const imgEl = node.querySelector(".card-image");
    if (it.image) {
      if (it.image.startsWith("data:image")) {
        imgEl.src = it.image;
      } else {
        imgEl.src = `https://placehold.co/400x300/e2e8f0/64748b?text=${encodeURIComponent(
          it.imageName || it.image
        )}`;
      }
      imgEl.alt = it.title;
      imgEl.classList.add("has-image");
    }

    node.removeAttribute("draggable");

    $(".edit", node).addEventListener("click", () => openEdit(it.id));
    $(".delete", node).addEventListener("click", () => del(it.id));

    contentList.appendChild(node);
  });

  if (filteredItems.length === 0) {
    contentList.innerHTML = '<div class="empty-state">No items found</div>';
  }
}
render();

let currentFilter = "all";
$$(".seg-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    $$(".seg-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    currentFilter = btn.dataset.filter;
    render(currentFilter, $("#searchInput").value);
  })
);

$("#searchInput").addEventListener("input", (e) =>
  render(currentFilter, e.target.value)
);

const modal = $("#modal");
const closeModalBtn = $("#closeModal");
const cancelBtn = $("#cancelBtn");
const overlay = $("#modalOverlay");
const form = $("#itemForm");

const browseImageBtn = $("#browseImageBtn");
const clearImageBtn = $("#clearImageBtn");
const imageUpload = $("#imageUpload");
const imageFileName = $("#imageFileName");

let selectedImageData = null;

browseImageBtn.addEventListener("click", () => imageUpload.click());

imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      selectedImageData = {
        name: file.name,
        data: event.target.result,
      };
      imageFileName.textContent = `Selected: ${file.name}`;
    };
    reader.readAsDataURL(file);
  }
});

clearImageBtn.addEventListener("click", () => {
  imageUpload.value = "";
  selectedImageData = null;
  imageFileName.textContent = "No image selected";
});

[closeModalBtn, cancelBtn, overlay].forEach((el) =>
  el.addEventListener("click", closeModal)
);

function openEdit(id) {
  const it = items.find((x) => x.id === id);
  if (!it) return;
  $("#modalTitle").textContent = `Edit ${
    it.type === "article" ? "Article" : "Mission"
  }`;
  $("#itemId").value = it.id;
  $("#type").value = it.type;
  $("#title").value = it.title;
  $("#author").value = it.author;
  $("#authorRole").value = it.authorRole || "";
  $("#description").value = it.description || "";
  $("#topic").value = it.tag || "";

  // Handle place field (only for articles)
  const placeField = $("#placeField");
  if (it.type === "article") {
    placeField.style.display = "flex";
    $("#place").value = it.place || "";
  } else {
    placeField.style.display = "none";
  }

  const missionPointsField = $("#missionPointsField");
  if (it.type === "mission") {
    missionPointsField.style.display = "flex";
    $("#missionPoints").value = it.missionPoints || "";
  } else {
    missionPointsField.style.display = "none";
  }

  if (it.image) {
    selectedImageData = {
      name: it.imageName || "current-image",
      data: it.image,
    };
    imageFileName.textContent = `Current image: ${
      it.imageName || "image file"
    }`;
  } else {
    selectedImageData = null;
    imageFileName.textContent = "No image selected";
  }

  modal.classList.add("show");
}
function closeModal() {
  modal.classList.remove("show");
  form.reset();
  selectedImageData = null;
  imageFileName.textContent = "No image selected";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemId = $("#itemId").value;
  const itemType = $("#type").value;

  const topicValue = $("#topic").value.trim();
  const finalTag =
    topicValue || (itemType === "article" ? "Article" : "Mission");

  const data = {
    id: itemId,
    type: itemType,
    tag: finalTag,
    title: $("#title").value.trim(),
    author: $("#author").value.trim(),
    authorRole: $("#authorRole").value,
    description: $("#description").value.trim(),
    image: selectedImageData ? selectedImageData.data : null,
    imageName: selectedImageData ? selectedImageData.name : null,
  };

  if (itemType === "article") {
    data.place = $("#place").value.trim();
  }

  if (itemType === "mission") {
    data.missionPoints = $("#missionPoints").value.trim();
  }

  items = items.map((it) => {
    if (it.id === data.id) {
      return {
        ...it,
        ...data,
        createdAt: it.createdAt,
        stage: it.stage,
        updatedAt: Date.now(),
      };
    }
    return it;
  });

  save(items);
  closeModal();
  render(currentFilter, $("#searchInput").value);
});

function del(id) {
  if (!confirm("Delete this item?")) return;
  items = items.filter((x) => x.id !== id);
  save(items);
  render(currentFilter, $("#searchInput").value);
}

// Logout functionality
const logoutBtn = $("#logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
      // Redirect to login page
      window.location.href = "../page_Hizkia/index.html";
    }
  });
}
