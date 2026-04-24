import { Pressable, ActivityIndicator, Text, View, type PressableProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { palette, radii, gradients, shadows, fontFamilies } from "@/constants/designTokens";

type Variant = "primary" | "secondary" | "ghost" | "pill";

export function Button({
  children,
  onPress,
  variant = "primary",
  loading,
  disabled,
  style,
  ...rest
}: Omit<PressableProps, "children"> & {
  children: string;
  variant?: Variant;
  loading?: boolean;
}) {
  const isGradient = variant === "primary" || variant === "pill";
  const height = variant === "pill" ? 56 : 54;
  const borderRadius = variant === "pill" ? radii.pill : 27;

  return (
    <Pressable
      onPress={loading || disabled ? undefined : onPress}
      style={({ pressed }) => [
        {
          height,
          borderRadius,
          overflow: "hidden",
          opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
        },
        isGradient ? (shadows.glowAccent as any) : undefined,
        style as any,
      ]}
      {...rest}
    >
      {isGradient ? (
        <LinearGradient
          colors={gradients.cta as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {loading ? (
            <ActivityIndicator color={palette.textInk} />
          ) : (
            <Text
              style={{
                color: palette.textInk,
                fontSize: 16,
                fontFamily: fontFamilies.bodyBold,
                fontWeight: "700",
                letterSpacing: 0.3,
              }}
            >
              {children}
            </Text>
          )}
        </LinearGradient>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: variant === "secondary" ? palette.surfaceHi : "transparent",
            borderWidth: variant === "ghost" ? 1 : 0,
            borderColor: palette.border,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color={palette.text} />
          ) : (
            <Text
              style={{
                color: palette.text,
                fontSize: 15,
                fontFamily: fontFamilies.bodyMed,
              }}
            >
              {children}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}
