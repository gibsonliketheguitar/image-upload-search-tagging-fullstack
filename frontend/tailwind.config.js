/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./component/**/*.{js,ts,jsx,tsx}",
    "./core-element/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Nunito Sans', 'Helvetica', 'Arial', 'sans-serif'],
      serif: ['Lora', 'serif'],
    },
    extend: {
      colors: {
        primary: '#661dbb',
        secondary: '#36cfc9',
        dark: '#25034c',
        light: '#25034c'
      },
    },
  },
  plugins: [],
};
