/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        landing: "url('/background/landing.jpeg')",
      },
      colors: {
        primary: "#A2BCBB", // Main elements
        secondary: "#D2CBC1", // Highlights/accents
        background: "#FBF8F1", // Main background
        accent: "#D5E2DB", // Smaller details/contrasts
        neutral: "#686060", // Text/subdued elements
        foreground: "hsl(var(--foreground))",
        // btn: {
        //   background: "hsl(var(--btn-background))",
        //   "background-hover": "hsl(var(--btn-background-hover))",
        // },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         btn: {
//           background: "hsl(var(--btn-background))",
//           "background-hover": "hsl(var(--btn-background-hover))",
//         },
//       },
//     },
//   },
//   plugins: [],
// };
