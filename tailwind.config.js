/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", ".storybook/*.js"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poetsen One", "cursive"],
      },
      colors: {
        primary: {
          50: "#edfcf7",
          100: "#d4f7e9",
          200: "#aceed7",
          300: "#76dfc0",
          400: "#3ec9a5",
          500: "#1bae8d",
          600: "#109e81",
          700: "#0b715f",
          800: "#0c594c",
          900: "#0b4940",
        },
        brand: {
          light: "#6014B0",
          dark: "#8882ff",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#141414",
        },
        background: {
          light: "#F1F1F1",
          dark: "#000000",
        },
        error: {
          light: "#D84747",
          dark: "#FF6262",
        },
        gray: {
          700: "#4f4f4f",
          800: "#2e2e2e",
          900: "#171717",
        },
      },
      borderRadius: {
        squircle: "30%",
      },
    },
  },
  plugins: [],
};
