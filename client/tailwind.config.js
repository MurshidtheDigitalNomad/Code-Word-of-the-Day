/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",           
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        roboto: ['Roboto'],
        techy: ['Orbitron'],
        mokoto: ['MokotoGlitch']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
 
  ],
}


