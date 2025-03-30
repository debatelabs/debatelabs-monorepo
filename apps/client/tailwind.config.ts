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
        primaryGradient: themeConfig.colors.primaryGradient,
        secondary: themeConfig.colors.secondary,
        dark: themeConfig.colors.dark,
        darkLighter: themeConfig.colors.darkLighter,
        darkHighlight: themeConfig.colors.darkHighlight,
        light: themeConfig.colors.light,
        alert: themeConfig.colors.alert,
        dimmedScreen: themeConfig.colors.dimmedScreen,
        dimmedText: themeConfig.colors.dimmedText
      },
      fontFamily: {
        namu: [themeConfig.fonts.namu],
        ruso: [themeConfig.fonts.ruso]
      }
    }
  },
  plugins: []
} satisfies Config;
