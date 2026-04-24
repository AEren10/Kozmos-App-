import { View, Text } from "react-native";
import { fontFamilies, palette } from "@/constants/designTokens";

type Props = {
  count?: number;
  active?: number; // 0-based
  label?: string;
  activeColor?: string;
};

// Bottom-of-screen dots + uppercase mono label ("01 GİRİŞ").
export function MicroIndicator({ count = 10, active = 0, label, activeColor = "#FF8FB5" }: Props) {
  return (
    <View style={{ alignItems: "center", gap: 6 }}>
      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        {Array.from({ length: count }).map((_, i) => (
          <View
            key={i}
            style={{
              width: i === active ? 14 : 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: i === active ? activeColor : "rgba(196,170,255,0.25)",
            }}
          />
        ))}
      </View>
      {label && (
        <Text style={{ fontSize: 10, fontFamily: fontFamilies.mono, color: palette.textMute, letterSpacing: 2 }}>
          {label}
        </Text>
      )}
    </View>
  );
}
