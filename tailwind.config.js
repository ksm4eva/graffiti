/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#ffffff',
          100: '#ffffff',
          200: '#f5f5f5',
          300: '#e9e9e9',
          400: '#e0e0e0',
          500: '#c4c4c4',
          600: '#8e8e8e',
          700: '#717171',
          800: '#5b5b5b',
          900: '#3a3a3a',
        },
        cream: {
          50: '#ffffff',
          100: '#ffffff',
          200: '#f5f5f5',
        },
        ink: {
          DEFAULT: '#211922',
          soft: '#5b5b5b',
          muted: '#8e8e8e',
        },
        terracotta: {
          400: '#e60023',
          500: '#e60023',
          600: '#ad081b',
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
