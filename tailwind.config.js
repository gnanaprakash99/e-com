/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryLite: "var(--color-white)",
        primaryDark: "var(--color-dark)",
        green: "var(--color-green)",
        danger: "var(--color-danger)",
      },
      fontSize: {
        primaryRadius: '16px',
      },
      fontFamily: {
        sans: ['"Source Sans Pro"', "sans-serif"],
        sourceSans: ['"Source Sans Pro"', "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
        jkabode: ["JK Abode", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        spartan: ['"League Spartan"', "sans-serif"],
      },
    },
  },
  plugins: [],
}

