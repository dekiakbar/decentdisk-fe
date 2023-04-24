// https://tailwindcss.com/docs/installation/using-postcss
/** 
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
