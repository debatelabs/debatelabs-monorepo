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
      lighter: '#1c1c1f',
      highlight: 'rgba(168, 180, 195, 0.08)',
      text: 'rgba(179, 179, 179, 0.5)',
      textLighter: '#B3B3B3C7'
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
