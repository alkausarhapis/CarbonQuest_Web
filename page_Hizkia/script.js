document.addEventListener("DOMContentLoaded", () => {
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const toggleCheckbox = document.getElementById("togglePwd");
  const pwdInput = document.getElementById("password");
  const emailInput = document.getElementById("email");
  const form = document.getElementById("loginForm");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  toggleCheckbox.addEventListener("change", () => {
    if (toggleCheckbox.checked) {
      pwdInput.type = "text";
    } else {
      pwdInput.type = "password";
    }
  });

  // Clear error when user starts typing
  emailInput.addEventListener("input", () => {
    emailInput.classList.remove("error");
    emailError.textContent = "";
  });

  pwdInput.addEventListener("input", () => {
    pwdInput.classList.remove("error");
    passwordError.textContent = "";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = pwdInput.value;

    // Clear previous errors
    emailInput.classList.remove("error");
    pwdInput.classList.remove("error");
    emailError.textContent = "";
    passwordError.textContent = "";

    let hasError = false;

    if (!validateEmail(email)) {
      emailInput.classList.add("error");
      emailError.textContent = "Mohon masukkan alamat email yang valid.";
      hasError = true;
    }

    if (password.length < 6) {
      pwdInput.classList.add("error");
      passwordError.textContent =
        "Mohon masukkan kata sandi minimal 6 karakter.";
      hasError = true;
    }

    if (hasError) {
      return;
    }

    window.location.replace("../page_hapis/index.html");
  });

  function validateEmail(email) {
    return emailregex.test(email);
  }
});
