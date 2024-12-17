module.exports = {
  content: ['./*.html'],
  darkMode: 'class',
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
        primaryLight: '#93c5fd',
        secondary: '#3b82f6',
        lightBlue: '#cbdceb',
        lightGray: '#92a29c',
        limeGreen: '#00ff99',
        neutral: '#f5f5f5',
        neutralDark: '#e5e7eb',
        accent: '#10b981',
        accentLight: '#6ee7b7',
        error: '#ef4444',
        warning: '#facc15',
      },
      backgroundImage: (theme) => ({
        'logo-dark-mode': "url('../images/logo-dark-mode.svg')",
        'logo-light-mode': "url('../images/logo-light-mode.svg')",
        'curvy-dark-mode': "url('../images/bg-curvy-dark-mode.svg')",
        'curvy-light-mode': "url('../images/bg-curvy-light-mode.svg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundImage: ['dark'],
    },
  },
  plugins: [],
};
