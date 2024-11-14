/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        teko: ['"Teko"', 'sans-serif'],
        abel: ['"Abel"', 'sans-serif'] 
      }
    },
  },
  plugins: [],
};
