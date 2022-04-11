module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
     'md': '768px',
     'lg': '1024px',
     'xl': '1280px',
     '2xl': '1536px',
    },
    extend: {
      screens: {
        '3xl': '1920px',
      },
    },
  },
  
  plugins: [],
}
