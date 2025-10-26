const logoutBtn = document.querySelector(".logout-item");
logoutBtn.addEventListener("click", function () {
  const confirmLogout = confirm("Kamu yakin ingin logout?");
  if (confirmLogout) {
    window.location.href = "../page_Hizkia/index.html";
  }
});

const articleData = [
  {
    id: "1998498",
    title: "Inovasi Teknologi: Kunci Tekan Emisi Karbon Global",
    time: "12-Jan-2024 | 08:53 am",
    provided: "Shagun Bhardwaj",
    edited: "Shagun Bhardwaj",
    desk: "-",
  },
  {
    id: "1998499",
    title: "Kebijakan Baru: Pemerintah Serius Pangkas Emisi Karbon",
    time: "13-Jan-2024 | 09:33 am",
    provided: "Shagun Bhardwaj",
    edited: "Shagun Bhardwaj",
    desk: "-",
  },
  {
    id: "1998500",
    title: "Sektor Industri Bergerak: Komitmen Menuju Nol Emisi",
    time: "14-Jan-2024 | 08:30 am",
    provided: "Shagun Bhardwaj",
    edited: "Shagun Bhardwaj",
    desk: "-",
  },
  {
    id: "1998501",
    title: "Listrik Hijau: Solusi Terdepan Kurangi Jejak Karbon",
    time: "14-Jan-2024 | 08:53 am",
    provided: "Shagun Bhardwaj",
    edited: "Shagun Bhardwaj",
    desk: "-",
  },
  {
    id: "1998502",
    title: "Transportasi Publik: Andalan Baru Reduksi Emisi Kota",
    time: "14-Jan-2024 | 09:53 am",
    provided: "Shagun Bhardwaj",
    edited: "Shagun Bhardwaj",
    desk: "-",
  },
];

const missionData = [
  { id: "1", title: "Menuju Nol Emisi.", time: "12-Jan-2024 | 08:53 am" },
  { id: "2", title: "Wujudkan Udara Bersih.", time: "13-Jan-2024 | 09:33 am" },
  { id: "3", title: "Sediakan Energi Hijau.", time: "14-Jan-2024 | 08:30 am" },
  {
    id: "4",
    title: "Revolusi Transportasi Hijau.",
    time: "14-Jan-2024 | 08:53 am",
  },
  { id: "5", title: "Industri Pangkas Emisi.", time: "14-Jan-2024 | 09:53 am" },
];

// Load table data
function loadArticleTable() {
  const tbody = document.getElementById("articleTableBody");
  tbody.innerHTML = "";

  articleData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.time}</td>
            <td>${item.provided}</td>
            <td>${item.edited}</td>
            <td>${item.desk}</td>
        `;
    tbody.appendChild(row);
  });
}

function loadMissionTable() {
  const tbody = document.getElementById("missionTableBody");
  tbody.innerHTML = "";

  missionData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.time}</td>
        `;
    tbody.appendChild(row);
  });
}

loadArticleTable();
loadMissionTable();
