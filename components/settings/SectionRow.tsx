import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors, fonts } from "@/constants/theme";

export type RowProps = {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
  right?: React.ReactNode;
  accent?: boolean;
  destructive?: boolean;
};

export function SectionRow({ icon, label, value, onPress, right, accent, destructive }: RowProps) {
  const labelColor = destructive ? colors.danger : colors.text;
  const valueColor = destructive ? colors.danger : accent ? colors.accent : colors.textMute;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, { opacity: pressed ? 0.7 : 1 }]}>
      <View style={[styles.rowIcon, destructive ? { backgroundColor: "rgba(248,113,113,0.12)" } : null]}>
        <Text style={{ fontSize: 14, color: destructive ? colors.danger : colors.accent }}>{icon}</Text>
      </View>
      <Text style={{ flex: 1, fontSize: 15, color: labelColor }}>{label}</Text>
      {value && (
        <Text style={{ fontSize: 12, color: valueColor, fontFamily: fonts.mono }}>{value}</Text>
      )}
      {right}
      {onPress && !right && !destructive && <Text style={{ color: colors.textFaint, marginLeft: 8 }}>›</Text>}
    </Pressable>
  );
}

export const Divider = () => (
  <View style={{ height: 1, backgroundColor: "rgba(255,255,255,0.05)", marginLeft: 54 }} />
);

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", height: 60, paddingHorizontal: 14, gap: 12 },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(196,170,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
});
