const logoutBtn = document.querySelector(".logout-item");
logoutBtn.addEventListener("click", function () {
  const confirmLogout = confirm("Kamu yakin ingin logout?");
  if (confirmLogout) {
    window.location.href = "../page_Syarif/index.html";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navbarHeight = 75; // Tinggi Navbar tetap (sesuai padding-top di CSS)

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const href = this.getAttribute("href");

      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetElement = document.querySelector(href);

      if (targetElement) {
        // Scroll ke posisi, dikurangi tinggi navbar
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
