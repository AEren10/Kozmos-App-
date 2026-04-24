import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/constants/theme";
import { gradients } from "@/constants/designTokens";

type Props = {
  label: string;
  price: string;
  sub?: string;
  badge?: string;
  selected: boolean;
  onPress: () => void;
};

export function PlanCard({ label, price, sub, badge, selected, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.wrap}>
      {selected && (
        <LinearGradient
          colors={["rgba(196,170,255,0.18)", "rgba(139,92,246,0.14)"] as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: 18 }]}
        />
      )}
      <View
        style={[
          styles.card,
          {
            borderColor: selected ? "#c4a4ff" : "rgba(196,170,255,0.15)",
            backgroundColor: selected ? "transparent" : "rgba(255,255,255,0.04)",
          },
        ]}
      >
        {badge && (
          <LinearGradient
            colors={gradients.badge as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.badge}
          >
            <Text style={styles.badgeText}>{badge}</Text>
          </LinearGradient>
        )}
        <Text style={{ fontSize: 12, color: colors.textDim, marginBottom: 4 }}>{label}</Text>
        <Text style={{ fontSize: 18, fontWeight: "700", color: selected ? colors.text : colors.textDim }}>{price}</Text>
        {sub && (
          <Text style={{ fontSize: 10, color: colors.textMute, marginTop: 4, fontFamily: fonts.mono, letterSpacing: 0.5 }}>
            {sub}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, borderRadius: 18, position: "relative", overflow: "hidden" },
  card: { padding: 14, borderRadius: 18, borderWidth: 1.5, alignItems: "center", position: "relative" },
  badge: { position: "absolute", top: -10, borderRadius: 99, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { fontSize: 9, fontFamily: fonts.mono, color: "#1a0e3d", fontWeight: "700", letterSpacing: 1 },
});
