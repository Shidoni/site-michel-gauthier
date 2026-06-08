import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        bordeaux: {
          DEFAULT: '#3a0505',
          light:   '#5c1515',
          dark:    '#1e0202',
          nav:     '#6b3a10',
        },
        or: {
          DEFAULT: '#c9a040',
          light:   '#e0c070',
          dark:    '#9a7820',
        },
        creme: '#f0ebe0',
      },
    },
  },
  plugins: [],
}

export default config
