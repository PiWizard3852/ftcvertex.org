import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      branding: '#9a1d2f',
      border: '#57534e',
    },
    screens: {
      sm: '640px',
    },
  },
  corePlugins: {
    aspectRatio: false,
    preflight: true,
  },
} satisfies Config;
