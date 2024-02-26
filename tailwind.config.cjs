/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "70%": {
            width: "100%"
          },
          "100%": {
            width: "100%"
          }
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(5%)'
          },
          '50%': {
            transform: 'none'
          },
        }
      },
      animation: {
        typing: "typing 1.5s steps(20) infinite alternate, blink .7s infinite",
        float: 'float 5s ease-in-out infinite',
      }
    }
  },
  safelist: [
    {
      pattern: /text-(base|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/,
    },
  ],
  plugins: []
};
