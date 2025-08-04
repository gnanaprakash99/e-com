/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryLite: "var(--color-primaryLite)",
        secondaryLite: "var(--color-secondaryLite)",
        teritaryLite: "var(--color-teritaryLite)",
        primaryText: "var(--color-primaryText)",
        secondaryText: "var(--color-secondaryText)",
        primaryborder: "var(--color-primaryborder)",
        primaryInput: "var(--color-primaryInput)",
        white: "var(--color-white)",
        dark: "var(--color-dark)",
        green: "var(--color-green)",
        yellow: "var(--color-yellow)",
      },
      borderRadius: {
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
      width: {
        'primaryButton': '150px',
      },
      height: {
        'primaryButton': '48px',
      },
    },
  },
  plugins: [],
}

