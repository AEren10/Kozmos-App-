import { Text, type TextProps } from "react-native";
import { colors, fontSizes, fonts } from "@/constants/theme";

export function H1({ style, ...rest }: TextProps) {
  return (
    <Text
      style={[
        { color: colors.text, fontSize: fontSizes.hero, fontFamily: fonts.display, lineHeight: 48, letterSpacing: -1 },
        style as any,
      ]}
      {...rest}
    />
  );
}

export function H2({ style, ...rest }: TextProps) {
  return (
    <Text
      style={[
        { color: colors.text, fontSize: fontSizes.display, fontFamily: fonts.display, lineHeight: 38, letterSpacing: -0.5 },
        style as any,
      ]}
      {...rest}
    />
  );
}

export function H3({ style, ...rest }: TextProps) {
  return (
    <Text
      style={[
        { color: colors.text, fontSize: fontSizes.xl, fontFamily: fonts.displayReg, letterSpacing: -0.3 },
        style as any,
      ]}
      {...rest}
    />
  );
}

export function Body({ style, ...rest }: TextProps) {
  return (
    <Text style={[{ color: colors.textDim, fontSize: fontSizes.md, fontFamily: fonts.body, lineHeight: 22 }, style as any]} {...rest} />
  );
}

export function Caption({ style, ...rest }: TextProps) {
  return (
    <Text
      style={[
        { color: colors.textMute, fontSize: fontSizes.xs, fontFamily: fonts.mono, letterSpacing: 1.5 },
        style as any,
      ]}
      {...rest}
    />
  );
}

export function MonoLabel({ style, ...rest }: TextProps) {
  return (
    <Text
      style={[
        {
          color: colors.accent,
          fontSize: 10,
          fontFamily: fonts.mono,
          letterSpacing: 2,
          textTransform: "uppercase",
        },
        style as any,
      ]}
      {...rest}
    />
  );
}
