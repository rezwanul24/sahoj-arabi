/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1e2926',
        moss: '#286653',
        lime: '#d8ef78',
        paper: '#f6f7f2',
      },
      fontFamily: {
        sans: ['Noto Sans Bengali', 'sans-serif'],
        arabic: ['Noto Naskh Arabic', 'serif'],
      },
    },
  },
  plugins: [],
}