/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,md}",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      screens: {
        xs: "250px",
        ...defaultTheme.screens,
      },
    },
    // screens: {
    //   // xs: "270px",
    //   ...defaultTheme.screens,
    // },
  },
  plugins: [],
};
