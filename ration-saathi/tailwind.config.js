/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        service: {
          50: "#f1f8f7",
          100: "#dcefeb",
          500: "#168277",
          600: "#116960",
          700: "#0d524c",
        },
        trust: {
          50: "#f1f7fb",
          500: "#2878a8",
          700: "#185272",
        },
      },
    },
  },
  plugins: [],
};
