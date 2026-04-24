import { Pressable, ActivityIndicator, Text, type PressableProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fontFamilies } from "@/constants/designTokens";

type Props = Omit<PressableProps, "children"> & {
  children: string;
  loading?: boolean;
  height?: number;
};

// Lavender->pink gradient pill CTA matching design handoff.
export function GradientPillButton({ children, onPress, loading, disabled, height = 56, style, ...rest }: Props) {
  return (
    <Pressable
      onPress={loading || disabled ? undefined : onPress}
      style={({ pressed }) => [
        {
          height,
          borderRadius: 999,
          overflow: "hidden",
          opacity: disabled ? 0.5 : pressed ? 0.92 : 1,
          shadowColor: "#C8A4FF",
          shadowOpacity: 0.4,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 8 },
          elevation: 10,
        },
        style as any,
      ]}
      {...rest}
    >
      <LinearGradient
        colors={["#C8A4FF", "#FF8FB5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        {loading ? (
          <ActivityIndicator color="#1a0e3d" />
        ) : (
          <Text style={{ color: "#1a0e3d", fontSize: 16, fontFamily: fontFamilies.bodyBold, letterSpacing: 0.3 }}>
            {children}
          </Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}
