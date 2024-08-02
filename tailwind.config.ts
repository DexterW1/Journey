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
        // Custom colors
        sliderTrackB: "#0372f5",
        sliderTrackP: "#9652d9",
        sliderTrackG: "#18c964",
        sliderTrackY: "#f4a628",
        sliderTrackR: "#f41865",
        // sliderTrack: {
        //   "0": "#0372f5",
        //   "1": "#9652d9",
        //   "2": "#18c964",
        //   "3": "#f4a628",
        //   "4": "#f41865",
        // },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: "#0372f5",
          },
        },
      },
    }),
  ],
};
