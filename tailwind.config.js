/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Jost', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        cream: { DEFAULT: '#F5EDD6', light: '#FBF7EE', dark: '#E8D9B0' },
        espresso: { DEFAULT: '#2C1810', light: '#4A2E23', dark: '#1A0F0A' },
        caramel: { DEFAULT: '#C4843A', light: '#D9A05A', dark: '#A0692A' },
        parchment: '#F8F2E4',
        bark: '#6B4226',
        stone: '#8C7B6B',
      },
      animation: {
        'steam': 'steam 3s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'reveal': 'reveal 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
        'grain': 'grain 0.5s steps(2) infinite',
      },
      keyframes: {
        steam: {
          '0%,100%': { transform: 'translateY(0) scaleX(1)', opacity: 0.6 },
          '50%': { transform: 'translateY(-20px) scaleX(1.3)', opacity: 0 },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        reveal: {
          from: { clipPath: 'inset(0 100% 0 0)' },
          to: { clipPath: 'inset(0 0% 0 0)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(-2px, 2px)' },
        },
      },
    },
  },
  plugins: [],
}
