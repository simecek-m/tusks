/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        brand: ["Coiny", "cursive"],
      },
      colors: {
        brand: {
          50: "#B0FFD9",
          100: "#8DFFC8",
          200: "#77F9B8",
          300: "#5FF2A7",
          400: "#44EB96",
          500: "#1DE484",
          600: "#15BD6D",
          700: "#0D9C57",
          800: "#057942",
          900: "#00592E",
        },
      },
    },
  },
  plugins: [],
};
