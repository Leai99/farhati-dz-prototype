import type { Config } from 'tailwindcss'
import { colors, fonts } from './src/styles/tokens'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors,
      fontFamily: {
        arabic: fonts.arabic,
        latin: fonts.latin,
      },
    },
  },
  plugins: [],
} satisfies Config
