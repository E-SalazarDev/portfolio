// ============================================================
// FUENTE ÚNICA DE COLOR.
// Escalera de contraste corregida: cada nivel (ink/panel/panel2/surface)
// tiene un salto real de luminosidad, no un matiz casi idéntico —
// así una card SIEMPRE se distingue del fondo, sin importar qué acento
// esté activo. "secondary" ya no es un gris duplicado de "muted": es un
// matiz propio, porque es uno de los 4 colores que rotan entre
// proyectos/experiencias (ROTATION) y necesita poder distinguirse solo.
// ============================================================

export const PALETTE = {
  // === BASE — escalera de elevación, cada paso se nota ===
  ink: "#0B0C0F",       // fondo de página — el más oscuro
  panel: "#16181D",     // card — salto real sobre ink
  panel2: "#20232B",    // borde / superficie anidada dentro de la card
  surface: "#262A33",   // hover / estado activo — el más claro de los neutros

  // === NEUTRALES ===
  paper: "#F1F1F1",     // texto principal
  muted: "#9AA2AF",     // texto secundario — ajustado para leerse bien sobre panel, no solo sobre ink

  // === ACENTOS ===
  accent: "#0E7AFF",       // tu azul — acento de marca
  accentLight: "#5FACFF",  // usado en texto pequeño (labels, números) — necesita más contraste que un botón grande
  accentDim: "#0B4A96",

  // secondary: antes era el mismo gris que "muted" (#C0C0C0) — invisible
  // cuando le tocaba a un proyecto/experiencia en la rotación. Ahora es
  // un matiz propio, distinguible del azul, del verde y del ámbar.
  secondary: "#8B7CF6",
  mint: "#5FAE7A",
  amber: "#D98A3D",
};

function hexToRgbString(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r},${g},${b}`;
}

// Versión "r,g,b" de cada color — lista para usar en rgba(${RGB.accent}, 0.2)
export const RGB = Object.fromEntries(
  Object.entries(PALETTE).map(([key, hex]) => [key, hexToRgbString(hex)])
);