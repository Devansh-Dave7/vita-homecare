import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        monorope: ['var(--font-manrope)', 'sans-serif'],
      },
      scale: {
        '105': '1.05',
        '110': '1.1',
      },
    },
  },
};

export default config;
