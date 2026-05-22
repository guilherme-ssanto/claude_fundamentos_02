/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D97757',
        'primary-dark': '#B85E3F',
        'bg-base': '#111110',
        'bg-card': '#1C1C1A',
        'bg-subtle': '#252523',
        'border-subtle': '#2E2E2B',
        'text-primary': '#EDEDEB',
        'text-muted': '#8A8A82',
        success: '#22C55E',
        error: '#EF4444',
        'level-ini': '#60A5FA',
        'level-int': '#FBBF24',
        'level-adv': '#A78BFA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
