export const ACCENT = {
  primary: { rgb: "139,92,246", hex: "#8B5CF6", text: "text-accent-light" }, // violeta — marca
  secondary: { rgb: "94,168,255", hex: "#5EA8FF", text: "text-secondary" }, // azul frío
  ai: { rgb: "51,214,166", hex: "#33D6A6", text: "text-mint" }, // mint
  warning: { rgb: "255,193,69", hex: "#FFC145", text: "text-amber" }, // ámbar
};


export const ROTATION = [ACCENT.primary, ACCENT.secondary, ACCENT.ai, ACCENT.warning];


export function accentAlpha(accent, alpha) {
  return "rgba(" + accent.rgb + "," + alpha + ")";
}