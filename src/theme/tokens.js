// src/theme/tokens.js
// Acentos rotativos usados en listas (Proyectos, Experiencia, Certificaciones).
// Sin hex propio: todo viene de palette.js, la única fuente de color.
import { PALETTE, RGB } from "./palette";

export const ACCENT = {
  primary:   { rgb: RGB.accent,    hex: PALETTE.accent,    text: "text-accent-light" }, // acento de marca
  secondary: { rgb: RGB.secondary, hex: PALETTE.secondary, text: "text-secondary" },    // secundario frío
  ai:        { rgb: RGB.mint,      hex: PALETTE.mint,      text: "text-mint" },         // mint
  warning:   { rgb: RGB.amber,     hex: PALETTE.amber,     text: "text-amber" },        // ámbar
};

export const ROTATION = [ACCENT.primary, ACCENT.secondary, ACCENT.ai, ACCENT.warning];

export function accentAlpha(accent, alpha) {
  return `rgba(${accent.rgb},${alpha})`;
}