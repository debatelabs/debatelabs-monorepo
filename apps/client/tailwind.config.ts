import type { Config } from 'tailwindcss';

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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        primaryGradient: 'var(--primary-gradient)',
        secondary: 'var(--secondary)',
        dark: 'var(--dark)',
        light: 'var(--light)',
        alert: 'var(--alert)',
        dimmedScreen: 'var(--dimmed-screen)'
      },
      fontFamily: {
        namu: ['var(--font-namu)'],
        ruso: ['var(--font-ruso)']
      }
    }
  },
  plugins: []
} satisfies Config;
