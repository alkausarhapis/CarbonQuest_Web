/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1e293b",
        sidebar: "#1e293b",
        accent: "#3b82f6",
      },
    },
  },
  plugins: [],
};
