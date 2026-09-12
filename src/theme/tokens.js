import { PALETTE, RGB } from "./palette";

export const ACCENT = {
  primary:   { rgb: RGB.accent,    hex: PALETTE.accent,    text: "text-accent-light" },
  secondary: { rgb: RGB.secondary, hex: PALETTE.secondary, text: "text-secondary" },
  ai:        { rgb: RGB.mint,      hex: PALETTE.mint,      text: "text-mint" },
  warning:   { rgb: RGB.amber,     hex: PALETTE.amber,     text: "text-amber" },
};

export const ROTATION = [ACCENT.primary, ACCENT.secondary, ACCENT.ai, ACCENT.warning];

export function accentAlpha(accent, alpha) {
  return `rgba(${accent.rgb},${alpha})`;
}