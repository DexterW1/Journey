/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        landing: "url('/background/landing.jpeg')",
      },
      colors: {
        primary: "#2C6E49", // Forest Green
        primaryLight: "#4c956c", // Light Forest Green
        secondary: "#87CEEB", // Sky Blue
        accent: "#F08080", // Muted Coral
        accentLight: "#ffc9b9", // Light Muted Coral
        primaryDark: "#4f2914", // Dark Wood
        background: "#FFFFF0", // Ivory
        textPrimary: "#456239", // Dark Charcoal
        textEmphasis: "#0f3408", // Saddle Brown
        textSecondary: "#708090", // Slate Grey
        buttonPrimary: "#A8E6A1", // Soft Green
        buttonSecondary: "#B3DDF2", // Pale Blue
        cardBackground: "#c5d6b2", // Light Olive
        cardBorder: "#E6E6FA", // Soft Lavender
        cardContentBackground: "#F5F5F5", // Very Light Grey (for card content background)
        cardContentText: "#555555", // Darker Grey (for card content text)
        inputBorder: "#A0A0A0", // Light Grey (for input borders)
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
