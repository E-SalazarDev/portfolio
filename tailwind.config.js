export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // === BASE 
        ink: "#05070F",       // fondo global — sin cambios
        panel: "#12162A",     // antes #0B0E1E — subido para diferenciarse de ink
        panel2: "#1C2140",    // antes #12162C — subido, para cards elevadas
        surface: "#262B52",   // NUEVO — tercer escalón, para hover/elementos activos

        // === NEUTRALES ===
        paper: "#EAF0FF",    
        muted: "#98A2C4",     // antes #7C87A8 

        // === ACENTOS 
        accent: {
          DEFAULT: "#8B5CF6",
          light: "#C7B8FF",
          dim: "#5B3FA8",      
        },
        secondary: "#5EA8FF", 
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