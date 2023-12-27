import colors from 'tailwindcss/colors';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    colors: {
      blue: colors.lightBlue,
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [require('flowbite/plugin')],
} satisfies Config;
