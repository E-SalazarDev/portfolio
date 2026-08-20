/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070F",
        panel: "#0B0E1E",
        panel2: "#12162C",
        paper: "#EAF0FF",
        muted: "#7C87A8",
        // cambia este bloque para probar otra paleta (turquesa, ámbar, magenta...)
        accent: {
          DEFAULT: "#8B5CF6",
          light: "#C7B8FF",
        },
        mint: "#33D6A6",
        amber: "#FFC145",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        accent: ["'Fraunces'", "serif"],
      },
    },
  },
  plugins: [],
};
