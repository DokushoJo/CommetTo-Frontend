/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        128: "36rem",
      },
      height: {
        128: "36rem",
      },
      colors: {
        purple: "#9B5DE5",
        yellow: "#FEE440",
        pink: "#F15BB5",
        teal: "#00F5D4",
      },
      spacing: {
        96: "25rem",
      },
    },
    plugins: [],
  },
};
