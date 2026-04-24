import { View, Text, type TextStyle, type StyleProp } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { gradients } from "@/constants/designTokens";

/**
 * Real gradient text via MaskedView + LinearGradient.
 * Pass `colors` for custom palette; defaults to accent gradient.
 */
export function GradientText({
  children,
  style,
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
}: {
  children: string;
  style?: StyleProp<TextStyle>;
  colors?: readonly [string, string, ...string[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}) {
  const palette = colors ?? gradients.accent;
  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: "transparent", color: "#000" }]}>
          {children}
        </Text>
      }
    >
      <LinearGradient colors={palette as any} start={start} end={end}>
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

// Kept for external callers that destructure View (none expected, but safe).
export { View };
