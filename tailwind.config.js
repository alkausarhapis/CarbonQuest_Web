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
        sage: {
          700: "#4a5c3a",
          600: "#6b7c5b",
          100: "#e8ede2",
        },
        ink: "#1a1a1a",
        forest: "#2d3a22",
        brand: {
          primary: "#6EC9E0",
          secondary: "#206171",
          medium: "#3E8799",
          dark: "#123942",
          background: "#EDEDED",
          white: "#FFFFFF",
        },
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Manrope", "sans-serif"],
        brandHeading: ["Space Grotesk", "sans-serif"],
        brandBody: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px -32px rgba(18, 57, 66, 0.28)",
        card: "0 18px 40px -28px rgba(18, 57, 66, 0.45)",
        glow: "0 0 0 1px rgba(110, 201, 224, 0.35), 0 20px 45px -30px rgba(62, 135, 153, 0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(110, 201, 224, 0)" },
          "50%": { boxShadow: "0 0 0 10px rgba(110, 201, 224, 0.22)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        float: "float 6s ease-in-out infinite",
        progress: "progress 1.4s ease-out forwards",
        glow: "glow 3.2s ease-in-out infinite",
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(110, 201, 224, 0.4), transparent)",
        "soft-grid": "linear-gradient(90deg, rgba(18, 57, 66, 0.05) 1px, transparent 1px), linear-gradient(180deg, rgba(18, 57, 66, 0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
