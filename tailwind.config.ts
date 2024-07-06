import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      black: "#000000",
    },
    aspectRatio: {
      animation: '16 / 9',
    },
    screens: {},
  },
  corePlugins: {
    aspectRatio: false,
    preflight: true,
  },
} satisfies Config;
