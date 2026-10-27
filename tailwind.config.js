/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        forest: {
          950: '#051F20',
          900: '#0B2B26',
          800: '#163832',
          700: '#235347',
          400: '#8EB69B',
          100: '#DAF1DE',
        },
        brand: {
          DEFAULT: '#8EB69B',
          hover: '#DAF1DE',
          dark: '#235347',
          surface: '#163832',
          deep: '#0B2B26',
          abyss: '#051F20',
        }
      }
    },
  },
  plugins: [],
}
