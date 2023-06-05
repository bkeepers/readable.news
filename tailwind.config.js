/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./views/**/*.html.ejs",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
