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
      primary: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      violet: colors.violet,
      purple: colors.purple,
      dark:{
        base:'#010409',
        content:'#0d1117'
      }
    },
    fontFamily: {
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      body: [
        // "Inter",
        // "ui-sans-serif",
        // "system-ui",
        // "-apple-system",
        // "system-ui",
        // "Segoe UI",
        // "Roboto",
        // "Helvetica Neue",
        // "Arial",
        // "Noto Sans",
        // "sans-serif",
        // "Apple Color Emoji",
        // "Segoe UI Emoji",
        // "Segoe UI Symbol",
        // "Noto Color Emoji",
      ],
      mono: [
        // "ui-monospace",
        // "SFMono-Regular",
        // "Menlo",
        // "Monaco",
        // "Consolas",
        // "Liberation Mono",
        // "Courier New",
        // "monospace",
      ],
    },
    extend: {},
  },
  plugins: [
    require("flowbite/plugin")
  ]
}
