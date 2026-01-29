import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: "#020617",     // Background utama
          dark: "#0f172a",      // Background sekunder
          primary: "#0ea5e9",   // Biru utama (Sky)
          neon: "#38bdf8",      // Biru terang (Glow)
        },
      },
      fontFamily: {
        // Pastikan variabel ini sesuai dengan yang ada di app/layout.tsx
        // Kita pakai --font-mono dari JetBrains Mono yang sudah disetting sebelumnya
        mono: ['var(--font-mono)', 'monospace'],
      },
      // --- TAMBAHAN ANIMASI SHAKE ---
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Plugin ini opsional, bagus untuk halaman blog (prose)
  ],
};
export default config;