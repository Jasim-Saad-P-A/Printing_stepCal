/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B1220',
          surface: '#111C30',
          card: '#172235',
          cardHover: '#1c2b42',
          cardDark: '#0D1525',
          border: '#23354E',
          borderLight: '#334155',
          primary: '#2563EB',
          accent: '#6366F1',
          success: '#10B981',
          warning: '#F59E0B',
          pink: '#EC4899',
          muted: '#94A3B8',
          text: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
