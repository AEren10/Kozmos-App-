// Legacy alias over designTokens.ts — single source of truth is designTokens.
// Do NOT add new values here; use designTokens.ts instead.
import { palette, fontFamilies, spacing as sp, radii as rd, gradients as gr } from "./designTokens";

export const colors = {
  bg: palette.bg,
  bgDeep: palette.bgDeep,
  bgMid: palette.bgMid,
  surface: palette.surface,
  surfaceHi: palette.surfaceHi,
  surfaceGlass: palette.surfaceGlass,
  border: palette.border,
  borderSoft: palette.borderSoft,
  borderStrong: palette.borderStrong,
  text: palette.text,
  textDim: palette.textDim,
  textMute: palette.textMute,
  textFaint: palette.textFaint,
  accent: palette.accent,
  accent2: palette.accent2,
  accentDeep: palette.accentDeep,
  accentGold: palette.accentGold,
  accentBlue: palette.accentBlue,
  accentGreen: palette.accentGreen,
  accentWarm: palette.accentWarm,
  glow: palette.glow,
  success: palette.success,
  danger: palette.danger,
  // legacy
  bgSoft: palette.bgInk,
  bgCard: palette.surfaceGlass,
  accentSoft: palette.accentDeep,
  textSoft: palette.textDim,
} as const;

export const fonts = {
  display: fontFamilies.display,
  displayItalic: fontFamilies.displayReg,
  displayBold: fontFamilies.displayBold,
  displayReg: fontFamilies.displayReg,
  body: fontFamilies.body,
  bodyMed: fontFamilies.bodyMed,
  bodyBold: fontFamilies.bodyBold,
  mono: fontFamilies.mono,
  monoBold: fontFamilies.monoMed,
} as const;

export const spacing = sp;
export const radii = rd;

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

export const gradients = gr;

export type ColorKey = keyof typeof colors;
