// Nebula teması — organic purple/indigo gradients, soft glow, italic serif accents

export const colors = {
  bg: "#0d0820",
  bgDeep: "#1a0e3d",
  bgMid: "#3a1d6e",
  surface: "rgba(255,255,255,0.04)",
  surfaceHi: "rgba(255,255,255,0.08)",
  surfaceGlass: "rgba(255,255,255,0.06)",
  border: "rgba(196,170,255,0.18)",
  borderSoft: "rgba(196,170,255,0.15)",
  borderStrong: "rgba(196,170,255,0.35)",
  text: "#f0ebff",
  textDim: "rgba(240,235,255,0.65)",
  textMute: "rgba(240,235,255,0.40)",
  textFaint: "rgba(240,235,255,0.25)",
  accent: "#c4a4ff",
  accent2: "#ff9ad1",
  accentDeep: "#8b5cf6",
  accentGold: "#ffd77a",
  accentBlue: "#b0dcff",
  accentGreen: "#d0f0c0",
  accentWarm: "#ff8f6b",
  glow: "rgba(196,170,255,0.45)",
  success: "#4ADE80",
  danger: "#F87171",
  // legacy aliases
  bgSoft: "#14142B",
  bgCard: "rgba(255,255,255,0.05)",
  accentSoft: "#8b5cf6",
  textSoft: "rgba(240,235,255,0.65)",
} as const;

export const fonts = {
  display: "Fraunces_300Light_Italic",
  displayBold: "Fraunces_600SemiBold",
  displayReg: "Fraunces_400Regular_Italic",
  body: "Inter_400Regular",
  bodyMed: "Inter_500Medium",
  bodyBold: "Inter_700Bold",
  mono: "JetBrainsMono_400Regular",
  monoBold: "JetBrainsMono_500Medium",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 28,
  pill: 999,
} as const;

export const fontSizes = {
  xxs: 10,
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 26,
  display: 32,
  hero: 42,
} as const;

export const gradients = {
  bg: ["#3a1d6e", "#1a0e3d", "#0d0820"] as const,
  bgSoft: ["#4a1570", "#1a0e3d", "#0d0820"] as const,
  accent: ["#c4a4ff", "#8b5cf6"] as const,
  accentPink: ["#ff9ad1", "#c4a4ff"] as const,
  orb: ["#fff", "#c4a4ff", "#5b2ea6"] as const,
  cta: ["#c4a4ff", "#8b5cf6"] as const,
};

export type ColorKey = keyof typeof colors;
