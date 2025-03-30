import type { Config } from 'tailwindcss';
import themeConfig from './src/core/configs/theme.config';

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/core/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: themeConfig.colors.primary,
        secondary: themeConfig.colors.secondary,
        dark: themeConfig.colors.dark,
        light: themeConfig.colors.light,
        alert: themeConfig.colors.alert
      },
      fontFamily: {
        namu: [themeConfig.fonts.namu],
        ruso: [themeConfig.fonts.ruso]
      }
    }
  },
  plugins: []
} satisfies Config;
