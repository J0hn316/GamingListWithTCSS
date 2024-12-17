module.exports = {
  content: ['./*.html'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1020px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#1c1c22',
        lightBlue: '#cbdceb',
        lightGray: '#92a29c',
        limeGreen: '#00ff99',
      },
    },
  },
  plugins: [],
};
