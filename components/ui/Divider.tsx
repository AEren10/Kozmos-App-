import { View, Text } from "react-native";
import { palette, fontFamilies } from "@/constants/designTokens";

export function Divider({ label, color = palette.borderSoft }: { label?: string; color?: string }) {
  if (!label) {
    return <View style={{ height: 1, backgroundColor: color, opacity: 0.6 }} />;
  }
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View style={{ flex: 1, height: 0.5, backgroundColor: color }} />
      <Text
        style={{
          fontSize: 11,
          color: palette.textMute,
          fontFamily: fontFamilies.mono,
          letterSpacing: 2,
        }}
      >
        {label}
      </Text>
      <View style={{ flex: 1, height: 0.5, backgroundColor: color }} />
    </View>
  );
}
