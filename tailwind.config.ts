import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans SC"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        sage: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#10B981',
          600: '#059669',
        },
        warm: {
          bg: '#FAF7F2',
          card: '#FFFFFF',
          dark: '#1E1B18',
          muted: '#78716C',
        }
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(217, 119, 6, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'hover': '0 20px 35px -5px rgba(217, 119, 6, 0.16), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 25px rgba(245, 158, 11, 0.35)',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        }
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
export default config;
