
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'primary': '#0070f3',
      'secondary': '#ff4081',
      'success': '#4caf50',
      'info': '#2196f3',
      'warning': '#ffeb3b',
      'danger': '#f44336',
      'light': '#f4f4f4',
      'dark': '#212121',
      'gray': '#BFCBC2',
      'white': colors.white,
      'yellow': colors.yellow,
      'green': colors.green,
      'blue': colors.blue,
      'snowWhite': '#f4eded',
      'prussianBlue': '#022f40',
      'englishViolet': '#44344f',
      'black': '#000000',
      'transparent': 'transparent',
      'asumicha': '#373C38',
      'kincha': '#C7802D',
      'yamabuki': '#FFB11B',
      // 'current': 'currentColor',
    },
    extend: {
      brightness: {
        65: '.65',
      },
      boxShadow: {
        'glow': '0 0 8px',
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
