import { Text, View, type StyleProp, type ViewStyle } from "react-native";
import { palette, fontFamilies } from "@/constants/designTokens";

export function SectionHeader({
  label,
  color = palette.textMute,
  style,
}: {
  label: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[{ paddingLeft: 4, marginBottom: 8 }, style]}>
      <Text
        style={{
          fontSize: 10,
          color,
          fontFamily: fontFamilies.mono,
          letterSpacing: 2,
        }}
      >
        {label.toUpperCase()}
      </Text>
    </View>
  );
}
