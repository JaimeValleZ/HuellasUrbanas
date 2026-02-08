/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#13a4ec",
        "background-light": "#f6f7f8",
        "background-dark": "#101c22",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"]
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
