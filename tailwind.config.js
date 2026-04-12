/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vaera-white': '#FFFFFF',
        'vaera-ice': '#DCEFF6',
        'vaera-gray': '#F7F7F7',
        'vaera-navy': '#1F2A37',
        'vaera-light-navy': '#374151',
      },
      fontFamily: {
        'italiana': ['var(--font-italiana)', 'serif'],
        'poppins': ['var(--font-poppins)', 'sans-serif'],
        'mono': ['var(--font-roboto-mono)', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

