import { View, type ViewProps } from "react-native";
import { colors, radii } from "@/constants/theme";

export function Card({ style, ...rest }: ViewProps) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.bgCard,
          borderRadius: radii.lg,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style as any,
      ]}
      {...rest}
    />
  );
}
