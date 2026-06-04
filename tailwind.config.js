/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pms277': {
          light: '#D5E4F4',
          DEFAULT: '#ABCAE9',
          dark: '#6BA3D4',
          deep: '#4A87BD',
        },
      },
    },
  },
  plugins: [],
}
