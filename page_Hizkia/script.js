document.addEventListener('DOMContentLoaded', () => {
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const toggleBtn = document.getElementById('togglePwd');
  const pwdInput = document.getElementById('password');
  const backBtn = document.getElementById('backBtn');
  const form = document.getElementById('loginForm');
  const googleBtn = document.getElementById('googleBtn');

  toggleBtn.addEventListener('click', () => {
    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      toggleBtn.textContent = '🙈';
    } else {
      pwdInput.type = 'password';
      toggleBtn.textContent = '👁️';
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = pwdInput.value;

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 6 ) {
      alert('Please enter a password with at least 6 characters.');
      return;
    }

    window.location.replace('../page_hapis/index.html');
  });

  googleBtn.addEventListener('click', () => {
    alert('Google login flow would start here (mock).');
  });

  function validateEmail(email) {
    return emailregex.test(email);
  }
});