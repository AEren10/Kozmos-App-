import { Pressable, ActivityIndicator, Text, View, type PressableProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radii, gradients } from "@/constants/theme";

type Variant = "primary" | "secondary" | "ghost";

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
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={loading || disabled ? undefined : onPress}
      style={({ pressed }) => [
        {
          height: 54,
          borderRadius: radii.xxl,
          overflow: "hidden",
          opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
          shadowColor: "#8b5cf6",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: isPrimary ? 0.5 : 0,
          shadowRadius: 30,
          elevation: isPrimary ? 10 : 0,
        },
        style as any,
      ]}
      {...rest}
    >
      {isPrimary ? (
        <LinearGradient
          colors={["#c4a4ff", "#8b5cf6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {loading ? (
            <ActivityIndicator color={colors.bgDeep} />
          ) : (
            <Text style={{ color: colors.bgDeep, fontSize: 16, fontWeight: "700", letterSpacing: 0.3 }}>{children}</Text>
          )}
        </LinearGradient>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: variant === "secondary" ? colors.surfaceHi : "transparent",
            borderWidth: variant === "ghost" ? 1 : 0,
            borderColor: colors.border,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color={colors.text} />
          ) : (
            <Text style={{ color: colors.text, fontSize: 15, fontWeight: "500" }}>{children}</Text>
          )}
        </View>
      )}
    </Pressable>
  );
}
