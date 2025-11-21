/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        casper: {
          primary: '#FF0011',
          dark: '#0A0A0A',
          light: '#F5F5F5',
        },
      },
    },
  },
  plugins: [],
};
