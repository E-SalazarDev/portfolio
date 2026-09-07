import { PALETTE } from "./src/theme/palette.js";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // === BASE — leído de src/theme/palette.js, no se edita aquí ===
        ink: PALETTE.ink,
        panel: PALETTE.panel,
        panel2: PALETTE.panel2,
        surface: PALETTE.surface,

        // === NEUTRALES ===
        paper: PALETTE.paper,
        muted: PALETTE.muted,

        // === ACENTOS ===
        accent: {
          DEFAULT: PALETTE.accent,
          light: PALETTE.accentLight,
          dim: PALETTE.accentDim,
        },
        secondary: PALETTE.secondary,
        mint: PALETTE.mint,
        amber: PALETTE.amber,
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