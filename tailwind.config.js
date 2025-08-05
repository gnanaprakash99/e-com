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
        headerBg: "var(--color-headerBg)",
        headerButtonBg: "var(--color-headerButtonBg)",
        headerHoverButtonBg: "var(--color-headerHoverButtonBg)",
        headerTextColor: "var(--color-headerTextColor)",
        pageBg: "var(--color-pageBg)",
        cardBg: "var(--color-cardBg)",
        inputBg: "var(--color-inputBg)",
        primaryText: "var(--color-primaryText)",
        secondaryText: "var(--color-secondaryText)",
        mutedText: "var(--color-mutedText)",
        headingText: "var(--color-headingText)",
        primaryBtn: "var(--color-primaryBtn)",
        secondaryBtn: "var(--color-secondaryBtn)",
        buttonText: "var(--color-buttonText)",
        success: "var(--color-success)",
        Warning: "var(--color-Warning)",
        Error: "var(--color-Error)",
        Info: "var(--color-Info)",
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

