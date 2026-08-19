/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#1a1715',
          100: '#17140f',
          200: '#221c16',
          300: '#2e2620',
          400: '#3d342b',
          500: '#4d4135',
          600: '#6b5848',
          700: '#8a6b48',
          800: '#b08d61',
          900: '#d9b98c',
        },
        cream: {
          50: '#141210',
          100: '#100e0c',
          200: '#1c1815',
        },
        ink: {
          DEFAULT: '#f4ead8',
          soft: '#e6d0b1',
          muted: '#b08d61',
        },
        terracotta: {
          400: '#d08a68',
          500: '#c97b56',
          600: '#e0926e',
        },
        gold: {
          400: '#d9b45a',
          500: '#c9a44a',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
