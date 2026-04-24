import { View, Text, type StyleProp, type ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { palette, radii, fontFamilies, gradients } from "@/constants/designTokens";

type Variant = "accent" | "pink" | "gold" | "mono";

export function Badge({
  label,
  variant = "accent",
  style,
}: {
  label: string;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
}) {
  const cols: readonly [string, string] =
    variant === "pink"
      ? gradients.accentPink
      : variant === "gold"
        ? gradients.accentGold
        : gradients.accent;

  if (variant === "mono") {
    return (
      <View
        style={[
          {
            alignSelf: "flex-start",
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: radii.pill,
            backgroundColor: palette.surfaceHi,
            borderWidth: 1,
            borderColor: palette.borderSoft,
          },
          style,
        ]}
      >
        <Text
          style={{
            fontFamily: fontFamilies.mono,
            fontSize: 10,
            color: palette.accent,
            letterSpacing: 1.5,
          }}
        >
          {label}
        </Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={cols as any}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        {
          alignSelf: "flex-start",
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: radii.pill,
        },
        style,
      ]}
    >
      <Text
        style={{
          fontFamily: fontFamilies.mono,
          fontSize: 10,
          color: palette.textInk,
          fontWeight: "700",
          letterSpacing: 1.5,
        }}
      >
        {label}
      </Text>
    </LinearGradient>
  );
}
