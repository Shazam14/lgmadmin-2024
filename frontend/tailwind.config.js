/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add any other paths where you use Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        "chatbot-green": "#286e34",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
