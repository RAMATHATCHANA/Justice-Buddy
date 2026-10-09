/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        bluepastel: {
          "primary": "#6BAADD",
          "secondary": "#A8D5E2",
          "accent": "#8CC9E8",
          "neutral": "#3A4A5C",
          "base-100": "#E8F4F8",
          "base-200": "#D4E9F2",
          "base-300": "#B8D9E8",
          "info": "#5DADE2",
          "success": "#7FC8A9",
          "warning": "#F9C74F",
          "error": "#F08080",
        },
      },
      "light",
      "dark"
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
  },
}
