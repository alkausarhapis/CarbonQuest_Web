document.addEventListener("DOMContentLoaded", function () {
  // Tinggi offset untuk navbar
  const NAV_OFFSET = 75;

  // Mendapatkan semua tautan yang href-nya dimulai dengan '#'
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      
      // Cegah loncatan default browser
      e.preventDefault(); 
      
      // Cek apakah itu tautan kembali ke atas saja (#)
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      
      // Cari elemen target (seperti #features)
      const targetElement = document.querySelector(href);

      if (targetElement) {
        // Lakukan scroll ke posisi elemen, dikurangi offset navbar
        window.scrollTo({
          top: targetElement.offsetTop - NAV_OFFSET,
          behavior: "smooth",
        });
      }
    });
  });
});