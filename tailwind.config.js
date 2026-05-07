/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          teal: '#0f766e',
          slate: '#0f172a',
          mint: '#6ee7b7',
        },
        accent: {
          violet: '#8b5cf6',
          amber: '#f59e0b',
          emerald: '#10b981',
        },
      },
      boxShadow: {
        glass: '0 12px 40px rgba(15,23,42,0.10)',
        soft: '0 8px 24px rgba(15,23,42,0.08)',
      },
      backgroundImage: {
        hero: 'linear-gradient(135deg, #0f172a 0%, #115e59 50%, #059669 100%)',
        glow: 'radial-gradient(circle at top right, rgba(110,231,183,0.35), transparent 40%)',
      },
    },
  },
  plugins: [],
}

