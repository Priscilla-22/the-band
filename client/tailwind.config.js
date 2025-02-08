/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        delius: ["Delius", "cursive"],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

