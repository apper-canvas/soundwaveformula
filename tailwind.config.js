/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DB954',
        secondary: '#191414',
        accent: '#1ED760',
        surface: '#282828',
        background: '#121212',
        success: '#1DB954',
        warning: '#FFA726',
        error: '#F44336',
        info: '#29B6F6',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Circular', 'Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Circular', 'Inter', 'ui-sans-serif', 'system-ui']
      },
      animation: {
        'pulse-glow': 'pulse 2s ease-in-out infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out'
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.5)' }
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}