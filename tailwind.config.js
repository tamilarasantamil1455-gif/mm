/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#06080F",
        primary: "#FF8C00",   // Nextify Orange-Gold
        secondary: "#FF6B00", // Nextify Deep Orange
        accent: "#F5A623",    // Nextify Warm Gold
        navy: "#0A1628",      // Nextify Dark Navy Blue
        navyLight: "#112240", // Nextify Navy Surface
        navyMid: "#1B3A5C",   // Nextify Navy Mid
        surface: "rgba(255, 255, 255, 0.03)",
        surfaceHover: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
