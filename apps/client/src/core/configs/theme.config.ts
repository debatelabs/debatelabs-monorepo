/**
 * Central theme configuration for the application
 * This file contains all color definitions used across the app
 */

const themeConfig = {
  colors: {
    primary: {
      main: '#6375e8',
      gradient: 'linear-gradient(95deg, #2e46df 7.98%, #586be3 52.47%, #8d99e3 80.33%)'
    },
    secondary: '#ffffff',
    dark: {
      main: '#121212',
      lighter: '#1A1A1A',
      highlight: 'rgba(199, 199, 199, 0.08)',
      text: 'rgba(179, 179, 179, 0.5)',
      textLighter: 'rgba(179,179,179,0.78)'
    },
    light: '#d9d9d9',
    alert: '#d45058',
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
