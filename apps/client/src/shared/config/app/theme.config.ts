/**
 * Central theme configuration for the application
 * This file contains all color definitions used across the app
 */

const themeConfig = {
  colors: {
    primary: {
      main: '#6073ec',
      gradient: 'linear-gradient(95deg, #2e46df 7.98%, #586be3 52.47%, #8d99e3 80.33%)'
    },
    secondary: '#ffffff',
    dark: {
      main: '#0f0f10',
      text: 'rgba(179, 179, 179, 0.5)',
      lighter: {
        main: '#1c1c1f',
        text: '#B3B3B3C7',
        border: '#2d2d33'
      }
    },
    highlight: {
      main: 'rgba(168, 180, 195, 0.08)',
      nav: 'rgba(85,105,230,0.18)'
    },
    paper: {
      main: '#2d2d33',
      border: '#41414a'
    },
    light: '#d9d9d9',
    alert: '#C22D21',
    dimmed: {
      screen: 'rgba(0, 0, 0, 0.2)'
    }
  },
  fonts: {
    namu: 'var(--font-namu)',
    ruso: 'var(--font-ruso)'
  }
};

export default themeConfig;
