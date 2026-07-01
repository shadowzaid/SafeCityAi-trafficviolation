/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        carbon: '#0c111d',
        ink: '#101828',
        cyanx: '#20d3ee',
        mint: '#32d583',
        ember: '#ff6b4a',
      },
      boxShadow: {
        glow: '0 0 50px rgba(32, 211, 238, 0.28)',
      },
    },
  },
  plugins: [],
};
