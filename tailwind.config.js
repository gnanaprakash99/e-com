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
        headerHeading: "var(--color-headerHeading)",
        headerTextColor: "var(--color-headerTextColor)",
        headerSelectedNavText: "var(--color-headerSelectedNavText)",
        headerHoverNavText: "var(--color-headerHoverNavText)",
        headerHoverBtnText: "var(--color-headerHoverBtnText)",
        headerHoverBtnBg: "var(--color-headerHoverBtnBg)",
        headerBtnBorder: "var(--color-headerBtnBorder)",

        searchInputBg: "var(--color-searchInputBg)",

        productCardBg: "var(--color-productCardBg)",
        productCartBorder: "var(--color-productCartBorder)",
        productCartMutedcolor: "var(--color-productCartMutedcolor)",
        productCartRatingText: "var(--color-productCartRatingText)",

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
        deleteBtn: "var(--color-deleteBtn)",
        hoverBtnBg: "var(--color-hoverBtnBg)",
        hoverBtnText: "var(--color-hoverBtnText)",
        
        success: "var(--color-success)",
        Warning: "var(--color-Warning)",
        Error: "var(--color-Error)",
        Info: "var(--color-Info)",
      },
      boxShadow: {
        cardShadow: '0 4px 20px var(--color-cardShadow)',
        hoverCardShadow: '0 8px 30px var(--color-hoverCardShadow)',
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
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-out': {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'fade-out': 'fade-out 0.3s ease-in forwards',
      },
    },
  },
  plugins: [],
}

