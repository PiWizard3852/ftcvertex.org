import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
    },
    screens: {},
  },
  corePlugins: {
    preflight: true,
  },
} satisfies Config
