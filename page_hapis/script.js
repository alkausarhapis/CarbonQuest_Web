const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const articleTableBody = $("#articleTableBody");
const missionTableBody = $("#missionTableBody");

const STORAGE_KEY = "editorial_items_v2";

function seed() {
  return [
    {
      id: uid(),
      type: "article",
      tag: "Climate Change",
      title: "Inovasi Teknologi: Kunci Tekan Emisi Karbon Global",
      author: "Shagun Bhardwaj",
      authorRole: "Admin",
      description:
        "Teknologi terbaru membantu mengurangi emisi karbon secara signifikan di berbagai sektor industri.",
      place: "Jakarta",
      createdAt: new Date("2024-01-12T08:53:00").getTime(),
      stage: "approved",
      image: null,
      imageName: null,
    },
    {
      id: uid(),
      type: "article",
      tag: "Policy",
      title: "Kebijakan Baru: Pemerintah Serius Pangkas Emisi Karbon",
      author: "Shagun Bhardwaj",
      authorRole: "Admin",
      description:
        "Pemerintah mengeluarkan kebijakan baru untuk mendukung pengurangan emisi karbon nasional.",
      place: "Bandung",
      createdAt: new Date("2024-01-13T09:33:00").getTime(),
      stage: "review",
      image: null,
      imageName: null,
    },
    {
      id: uid(),
      type: "article",
      tag: "Industry",
      title: "Sektor Industri Bergerak: Komitmen Menuju Nol Emisi",
      author: "Shagun Bhardwaj",
      authorRole: "Contributor",
      description:
        "Berbagai perusahaan industri berkomitmen untuk mencapai target nol emisi pada tahun 2050.",
      place: "Surabaya",
      createdAt: new Date("2024-01-14T08:30:00").getTime(),
      stage: "pending",
      image: null,
      imageName: null,
    },
    {
      id: uid(),
      type: "article",
      tag: "Energy",
      title: "Listrik Hijau: Solusi Terdepan Kurangi Jejak Karbon",
      author: "John Doe",
      authorRole: "Admin",
      description:
        "Energi terbarukan menjadi solusi utama dalam mengurangi jejak karbon di Indonesia.",
      place: "Yogyakarta",
      createdAt: new Date("2024-01-14T08:53:00").getTime(),
      stage: "approved",
      image: null,
      imageName: null,
    },
    {
      id: uid(),
      type: "article",
      tag: "Transportation",
      title: "Transportasi Publik: Andalan Baru Reduksi Emisi Kota",
      author: "Jane Smith",
      authorRole: "Contributor",
      description:
        "Sistem transportasi publik yang efisien dapat mengurangi emisi karbon hingga 40% di kota besar.",
      place: "Semarang",
      createdAt: new Date("2024-01-14T09:53:00").getTime(),
      stage: "review",
      image: null,
      imageName: null,
    },
    {
      id: uid(),
      type: "mission",
      tag: "Climate Action",
      title: "Menuju Nol Emisi",
      author: "Admin Team",
      authorRole: "Admin",
      description:
        "Misi untuk mencapai target nol emisi karbon melalui berbagai program dan kegiatan.",
      missionPoints: "100",
      createdAt: new Date("2024-01-12T08:53:00").getTime(),
      stage: "approved",
      image: null,
      imageName: null,
    },
    {
      id: uid(),
      type: "mission",
      tag: "Clean Air",
      title: "Wujudkan Udara Bersih",
      author: "Admin Team",
      authorRole: "Admin",
      description:
        "Program penanaman pohon dan pengurangan polusi untuk udara yang lebih bersih.",
      missionPoints: "75",
      createdAt: new Date("2024-01-13T09:33:00").getTime(),
      stage: "approved",
      image: null,
      imageName: null,
    },
    {
      id: uid(),
      type: "mission",
      tag: "Green Energy",
      title: "Sediakan Energi Hijau",
      author: "Energy Team",
      authorRole: "Contributor",
      description:
        "Misi untuk menyediakan energi terbarukan yang ramah lingkungan.",
      missionPoints: "150",
      createdAt: new Date("2024-01-14T08:30:00").getTime(),
      stage: "review",
      image: null,
      imageName: null,
    },
    {
      id: uid(),
      type: "mission",
      tag: "Transportation",
      title: "Revolusi Transportasi Hijau",
      author: "Transport Team",
      authorRole: "Admin",
      description:
        "Transformasi sistem transportasi menuju lebih ramah lingkungan dan berkelanjutan.",
      missionPoints: "120",
      createdAt: new Date("2024-01-14T08:53:00").getTime(),
      stage: "pending",
      image: null,
      imageName: null,
    },
    {
      id: uid(),
      type: "mission",
      tag: "Industry",
      title: "Industri Pangkas Emisi",
      author: "Industry Team",
      authorRole: "Contributor",
      description:
        "Mendorong industri untuk mengurangi emisi karbon melalui teknologi bersih.",
      missionPoints: "90",
      createdAt: new Date("2024-01-14T09:53:00").getTime(),
      stage: "approved",
      image: null,
      imageName: null,
    },
  ];
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

function render(query = "") {
  articleTableBody.innerHTML = "";
  missionTableBody.innerHTML = "";
  const normalized = query.toLowerCase();

  const articles = items
    .filter((it) => it.type === "article")
    .filter((it) =>
      (it.title + it.author + it.tag).toLowerCase().includes(normalized)
    );

  const missions = items
    .filter((it) => it.type === "mission")
    .filter((it) =>
      (it.title + it.author + it.tag).toLowerCase().includes(normalized)
    );

  if (articles.length === 0) {
    articleTableBody.innerHTML =
      '<tr><td colspan="7"><div class="empty-state">No articles found</div></td></tr>';
  } else {
    articles.forEach((it, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><span class="table-id">${index + 1}</span></td>
        <td><span class="table-title" title="${it.title}">${
        it.title
      }</span></td>
        <td>${it.author}</td>
        <td>${it.authorRole || "-"}</td>
        <td>${it.place || "-"}</td>
        <td>${formatDateTime(it.updatedAt || it.createdAt)}</td>
        <td>
          <div class="table-actions">
            <button class="icon-btn edit" title="Edit" data-id="${it.id}">
              <img src="../page_hapis/assets/edit.png" alt="Edit" />
            </button>
            <button class="icon-btn delete" title="Delete" data-id="${it.id}">
              <img src="../page_hapis/assets/trashbin.png" alt="Delete" />
            </button>
          </div>
        </td>
      `;

      row
        .querySelector(".edit")
        .addEventListener("click", () => openEdit(it.id));
      row.querySelector(".delete").addEventListener("click", () => del(it.id));

      articleTableBody.appendChild(row);
    });
  }

  if (missions.length === 0) {
    missionTableBody.innerHTML =
      '<tr><td colspan="7"><div class="empty-state">No missions found</div></td></tr>';
  } else {
    missions.forEach((it, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><span class="table-id">${index + 1}</span></td>
        <td><span class="table-title" title="${it.title}">${
        it.title
      }</span></td>
        <td>${it.author}</td>
        <td>${it.authorRole || "-"}</td>
        <td>${it.missionPoints || "-"} pts</td>
        <td>${formatDateTime(it.updatedAt || it.createdAt)}</td>
        <td>
          <div class="table-actions">
            <button class="icon-btn edit" title="Edit" data-id="${it.id}">
              <img src="../page_hapis/assets/edit.png" alt="Edit" />
            </button>
            <button class="icon-btn delete" title="Delete" data-id="${it.id}">
              <img src="../page_hapis/assets/trashbin.png" alt="Delete" />
            </button>
          </div>
        </td>
      `;

      row
        .querySelector(".edit")
        .addEventListener("click", () => openEdit(it.id));
      row.querySelector(".delete").addEventListener("click", () => del(it.id));

      missionTableBody.appendChild(row);
    });
  }
}
render();

$("#searchInput").addEventListener("input", (e) => render(e.target.value));

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
  render($("#searchInput").value);
});

function del(id) {
  if (!confirm("Delete this item?")) return;
  items = items.filter((x) => x.id !== id);
  save(items);
  render($("#searchInput").value);
}

const logoutBtn = $("#logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
      window.location.href = "../page_Syarif/index.html";
    }
  });
}
