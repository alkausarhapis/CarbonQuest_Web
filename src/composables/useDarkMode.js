import { ref, watchEffect } from "vue";

// Shared reactive state
const isDark = ref(false);
let initialized = false;

// Initialize immediately when module loads
function init() {
  if (typeof window === "undefined") return;

  const saved = localStorage.getItem("darkMode");
  if (saved !== null) {
    isDark.value = saved === "true";
  } else {
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // Apply theme whenever isDark changes
  watchEffect(() => {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(isDark.value));
  });

  initialized = true;
}

// Auto-init
init();

export function useDarkMode() {
  if (!initialized && typeof window !== "undefined") {
    init();
  }

  function toggleDarkMode() {
    isDark.value = !isDark.value;
  }

  return {
    isDark,
    toggleDarkMode,
  };
}
