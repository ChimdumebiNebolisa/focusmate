/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6366F1", // indigo-500
        secondary: "#A855F7", // purple-500
        accent: "#22D3EE", // cyan-400
      },
    },
  },
  plugins: [],
};
