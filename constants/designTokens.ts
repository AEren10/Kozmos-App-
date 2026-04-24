// designTokens.ts — Nebula theme, single source of truth
// Mirrors .claude/design-handoff/project/src/theme-nebula.jsx
// NOTE: Existing constants/theme.ts is kept as legacy alias exporter.

import { Platform } from "react-native";

export const palette = {
  // backgrounds
  bg: "#0d0820",
  bgDeep: "#1a0e3d",
  bgMid: "#3a1d6e",
  bgSoft: "#4a1570",
  bgInk: "#14142B",

  // surfaces
  surface: "rgba(255,255,255,0.04)",
  surfaceHi: "rgba(255,255,255,0.08)",
  surfaceGlass: "rgba(255,255,255,0.06)",
  surfaceDeep: "rgba(13,8,32,0.85)",

  // borders
  border: "rgba(196,170,255,0.18)",
  borderSoft: "rgba(196,170,255,0.15)",
  borderStrong: "rgba(196,170,255,0.35)",
  borderFaint: "rgba(255,255,255,0.06)",

  // text
  text: "#f0ebff",
  textDim: "rgba(240,235,255,0.65)",
  textMute: "rgba(240,235,255,0.40)",
  textMuted: "rgba(240,235,255,0.40)",
  textFaint: "rgba(240,235,255,0.25)",
  textInk: "#1a0e3d",

  // accents
  accent: "#c4a4ff",
  accent2: "#ff9ad1",
  accentDeep: "#8b5cf6",
  accentGold: "#ffd77a",
  accentBlue: "#b0dcff",
  accentGreen: "#d0f0c0",
  accentWarm: "#ff8f6b",
  accentPlum: "#5b2ea6",

  // glow
  glow: "rgba(196,170,255,0.45)",
  glowSoft: "rgba(196,170,255,0.22)",
  glowPink: "rgba(255,154,209,0.45)",

  // semantic
  success: "#4ADE80",
  danger: "#F87171",
  warning: "#F59E0B",
} as const;

export const gradients = {
  bg: ["#3a1d6e", "#1a0e3d", "#0d0820"] as const,
  bgSoft: ["#4a1570", "#1a0e3d", "#0d0820"] as const,
  accent: ["#c4a4ff", "#8b5cf6"] as const,
  accentPink: ["#ff9ad1", "#c4a4ff"] as const,
  accentGold: ["#ffd77a", "#ff9ad1"] as const,
  orb: ["#ffffff", "#c4a4ff", "#5b2ea6"] as const,
  orbPink: ["#ffd5e8", "#ff9ad1", "#a02070"] as const,
  cta: ["#c4a4ff", "#8b5cf6"] as const,
  ctaBright: ["#c4a4ff", "#8b5cf6"] as const,
  badge: ["#ff9ad1", "#c4a4ff"] as const,
  strength: ["#c4a4ff", "#ff9ad1"] as const,
  sheetFade: ["transparent", "rgba(13,8,32,0.95)"] as const,
};

export const fontFamilies = {
  display: "Fraunces_300Light_Italic",
  displayReg: "Fraunces_400Regular_Italic",
  displayBold: "Fraunces_600SemiBold",
  body: "Inter_400Regular",
  bodyMed: "Inter_500Medium",
  bodyBold: "Inter_700Bold",
  mono: "JetBrainsMono_400Regular",
  monoMed: "JetBrainsMono_500Medium",
} as const;

type TypoToken = {
  family: keyof typeof fontFamilies;
  size: number;
  lineHeight: number;
  letterSpacing?: number;
};

export const typography = {
  heroDisplay: { family: "display", size: 42, lineHeight: 46, letterSpacing: -1 },
  h1: { family: "display", size: 36, lineHeight: 42, letterSpacing: -0.5 },
  h2: { family: "display", size: 30, lineHeight: 36, letterSpacing: -0.4 },
  h3: { family: "display", size: 24, lineHeight: 30, letterSpacing: -0.3 },
  quote: { family: "displayReg", size: 18, lineHeight: 28 },
  body: { family: "body", size: 15, lineHeight: 22 },
  bodySm: { family: "body", size: 13, lineHeight: 20 },
  label: { family: "bodyMed", size: 14, lineHeight: 20 },
  mono: { family: "mono", size: 12, lineHeight: 18, letterSpacing: 1 },
  monoSm: { family: "mono", size: 10, lineHeight: 14, letterSpacing: 2 },
  caption: { family: "body", size: 11, lineHeight: 16 },
} satisfies Record<string, TypoToken>;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

export const radii = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  xxl: 28,
  pill: 999,
} as const;

/**
 * Shadows — iOS shadow*, Android elevation in parallel.
 */
export const shadows = {
  none: {},
  sm: Platform.select({
    ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6 },
    default: { elevation: 2 },
  }),
  md: Platform.select({
    ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 14 },
    default: { elevation: 6 },
  }),
  glowAccent: Platform.select({
    ios: { shadowColor: "#8b5cf6", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.55, shadowRadius: 30 },
    default: { elevation: 12 },
  }),
  glowPink: Platform.select({
    ios: { shadowColor: "#ff9ad1", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 24 },
    default: { elevation: 10 },
  }),
  orb: Platform.select({
    ios: { shadowColor: "#c4a4ff", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.7, shadowRadius: 30 },
    default: { elevation: 16 },
  }),
} as const;

export const durations = {
  fast: 180,
  base: 280,
  slow: 500,
  slower: 700,
  // loop cycles
  twinkle: 3200,
  floatSlow: 5000,
  floatMed: 4000,
  pulse: 1200,
  glow: 3000,
  rotateSlow: 30000,
  rotateMed: 20000,
  rotateFast: 12000,
  orbitSlow: 14000,
  orbitMed: 10000,
  orbitFast: 7000,
  shimmer: 2400,
  rotateXLong: 60000,
  rotateReveal: 40000,
  intro: 25000,
  orbitSlowLogin: 18000,
} as const;

export const easings = {
  // cubic-bezier presets used across design
  standard: [0.4, 0, 0.2, 1] as const,
  emphasized: [0.2, 0.8, 0.3, 1] as const,
  decelerate: [0, 0, 0.2, 1] as const,
} as const;

export type Palette = typeof palette;
export type FontFamily = keyof typeof fontFamilies;
