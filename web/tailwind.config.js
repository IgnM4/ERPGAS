/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FB923C',
          orangeDark: '#F59E0B',
          navy: '#0B1F3B',
          red: '#DC2626',
          black: '#000000'
        }
      }
    }
  },
  darkMode: 'class',
  plugins: []
}