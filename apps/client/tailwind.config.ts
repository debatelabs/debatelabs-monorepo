import type { Config } from 'tailwindcss';
import themeConfig from './src/shared/configs/theme.config';

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: themeConfig.colors.primary,
        primaryGradient: themeConfig.colors.primaryGradient,
        secondary: themeConfig.colors.secondary,
        dark: themeConfig.colors.dark,
        darkLight: themeConfig.colors.darkLight,
        light: themeConfig.colors.light,
        alert: themeConfig.colors.alert,
        dimmedScreen: themeConfig.colors.dimmedScreen
      },
      fontFamily: {
        namu: [themeConfig.fonts.namu],
        ruso: [themeConfig.fonts.ruso]
      }
    }
  },
  plugins: []
} satisfies Config;
