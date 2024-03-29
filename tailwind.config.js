/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", ".storybook/*.js"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Coiny", "cursive"],
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
      },
      borderRadius: {
        squircle: "30%",
      },
    },
  },
  plugins: [],
};
