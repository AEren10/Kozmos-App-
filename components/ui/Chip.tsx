import { Pressable, Text, type StyleProp, type ViewStyle } from "react-native";
import { palette, radii, fontFamilies } from "@/constants/designTokens";

export function Chip({
  label,
  selected,
  onPress,
  icon,
  style,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: radii.md,
          backgroundColor: selected ? "rgba(196,170,255,0.18)" : palette.surface,
          borderWidth: 1,
          borderColor: selected ? palette.accent : palette.borderSoft,
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
        },
        style,
      ]}
    >
      {icon ? <Text style={{ color: palette.accent, fontSize: 14 }}>{icon}</Text> : null}
      <Text
        style={{
          color: selected ? palette.text : palette.textDim,
          fontSize: 13,
          fontFamily: fontFamilies.body,
          fontWeight: selected ? "600" : "400",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
