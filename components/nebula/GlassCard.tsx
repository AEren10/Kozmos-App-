import { View, type ViewProps } from "react-native";
import { colors, radii } from "@/constants/theme";

export function GlassCard({ style, children, ...rest }: ViewProps) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surfaceGlass,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radii.xl,
          padding: 18,
        },
        style as any,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
