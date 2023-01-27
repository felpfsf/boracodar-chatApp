/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        background: '#1A1924',
        inputBg: '#282843',
        sentBg: '#07847E',
        receivedBg: '#633BBC',
        paragraph: '#E1E1E6',
        status: '#00B37E'
      },
      screens: {
        tabletMd: '896px',
        desktopHD: '1366px'
      }
    }
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/forms')]
}
