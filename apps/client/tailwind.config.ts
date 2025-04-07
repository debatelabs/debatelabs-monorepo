import type { Config } from 'tailwindcss';
import themeConfig from './src/shared/config/app/theme.config';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: themeConfig.colors.primary,
        secondary: themeConfig.colors.secondary,
        dark: themeConfig.colors.dark,
        light: themeConfig.colors.light,
        alert: themeConfig.colors.alert,
        highlight: themeConfig.colors.highlight,
        paper: themeConfig.colors.paper
      },
      fontFamily: {
        namu: [themeConfig.fonts.namu],
        ruso: [themeConfig.fonts.ruso]
      }
    }
  },
  plugins: []
} satisfies Config;
