// https://tailwindcss.com/docs/installation/using-postcss
/** 
 * @type {import('tailwindcss').Config}
 */
const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      violet: colors.violet,
      dark:{
        base:'#010409',
        content:'#0d1117',
        light:'#171c23'
      }
    }
  },
  plugins: [
    require("flowbite/plugin")
  ]
}
