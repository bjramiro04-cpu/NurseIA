import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-dm-serif)", "Georgia", "serif"],
      },
      colors: {
        // Paleta de marca NurseIA (morado profundo, ex-Canva "--n-*")
        brand: {
          50: "#F0EBF8",
          100: "#D4C8E8",
          200: "#B8A4D4",
          300: "#9B7FBF",
          400: "#7B4BAD",
          500: "#6A3A9E",
          600: "#5B2C91",
          700: "#4A2278",
          800: "#39185E",
          900: "#280E45",
        },
      },
      boxShadow: {
        "brand-sm": "0 2px 8px rgba(91, 44, 145, 0.08)",
        "brand-md": "0 4px 16px rgba(91, 44, 145, 0.12)",
        "brand-lg": "0 8px 24px rgba(91, 44, 145, 0.16)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out both",
        "slide-up": "slideUp 0.35s ease-out both",
        "slide-right": "slideRight 0.3s ease-out both",
        "alert-pulse": "alertPulse 2.4s ease-in-out infinite",
        "bed-pulse": "bedPulse 2.5s ease-in-out infinite",
        "dot-blink": "dotBlink 1.2s infinite",
        shimmer: "shimmer 1.4s infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        alertPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(239,68,68,0)" },
          "50%": { boxShadow: "0 0 0 6px rgba(239,68,68,0.12)" },
        },
        bedPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(239,68,68,0)" },
          "50%": { boxShadow: "0 0 0 5px rgba(239,68,68,0.18)" },
        },
        dotBlink: {
          "0%, 80%, 100%": { opacity: "0", transform: "scale(.8)" },
          "40%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
