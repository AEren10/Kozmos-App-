import { View, type ViewProps } from "react-native";
import { palette, radii } from "@/constants/designTokens";

export function Card({ style, ...rest }: ViewProps) {
  return (
    <View
      style={[
        {
          backgroundColor: palette.surfaceGlass,
          borderRadius: radii.lg,
          padding: 16,
          borderWidth: 1,
          borderColor: palette.border,
        },
        style as any,
      ]}
      {...rest}
    />
  );
}
