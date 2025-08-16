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
        inputSelectBorder: "var(--color-inputSelectBorder)",

        primaryText: "var(--color-primaryText)",
        secondaryText: "var(--color-secondaryText)",
        teriteryText: "var(--color-teriteryText)",
        mutedText: "var(--color-mutedText)",

        primaryBtn: "var(--color-primaryBtn)",
        secondaryBtn: "var(--color-secondaryBtn)",
        buttonText: "var(--color-buttonText)",
        buttonText2: "var(--color-buttonText2)",
        deleteBtn: "var(--color-deleteBtn)",
        hoverBtnBg: "var(--color-hoverBtnBg)",
        hoverBtnText: "var(--color-hoverBtnText)",
        buttonBorder: "var(--color-buttonBorder)",
        cancelButton: "var(--color-cancelButton)",
        
        ratingStarcolor: "var(--color-ratingStarcolor)",

        success: "var(--color-success)",
        Warning: "var(--color-Warning)",
        Error: "var(--color-Error)",
        Info: "var(--color-Info)",
      },
      boxShadow: {
        cardShadow: '0 0px 0px var(--color-cardShadow)',
        hoverCardShadow: '0 0px 0px var(--color-hoverCardShadow)',
      },
      borderRadius: {
        primaryRadius: '12px',
        secondaryRadius: '6px',
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
        'primaryWidth': '150px',
      },
      height: {
        'primaryHeight': '48px',
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

