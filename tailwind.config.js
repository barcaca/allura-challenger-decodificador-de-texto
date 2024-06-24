const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
