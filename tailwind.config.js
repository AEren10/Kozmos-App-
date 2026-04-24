/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./features/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0B0B1A",
          soft: "#14142B",
          card: "#1C1C3A",
        },
        accent: {
          DEFAULT: "#C8A4FF",
          soft: "#7C5CFF",
          gold: "#F3C969",
        },
        text: {
          DEFAULT: "#F5F3FF",
          soft: "#B8B5D1",
          mute: "#6E6B8F",
        },
        border: "#2A2A4A",
      },
      fontFamily: {
        display: ["System"],
        body: ["System"],
      },
    },
  },
  plugins: [],
};
