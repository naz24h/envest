import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#123857',
          900: '#2a4c68',
          800: '#416079',
          700: '#597489',
          600: '#71889a',
          500: '#899cab',
          400: '#a0afbc',
          300: '#b8c3cd',
          200: '#d0d7dd',
          100: '#e7ebee',
        }
      }
    },

    container: {
      center: true,
      padding: '1rem',
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
export default config
