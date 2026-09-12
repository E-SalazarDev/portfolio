export const PALETTE = {
  ink: "#08090C",
  panel: "#101217",
  panel2: "#1A1D24",
  surface: "#23262F",

  paper: "#F5F6F7",
  muted: "#8B93A1",

  accent: "#3B82F6",
  accentLight: "#93C5FD",
  accentDim: "#1E3A8A",

  secondary: "#A78BFA",
  mint: "#34D399",
  amber: "#FBBF24",
};

function hexToRgbString(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r},${g},${b}`;
}

export const RGB = Object.fromEntries(
  Object.entries(PALETTE).map(([key, hex]) => [key, hexToRgbString(hex)])
);