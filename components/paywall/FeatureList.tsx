import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FadeUp } from "@/components/nebula";
import { colors } from "@/constants/theme";

export type Feature = { icon: string; label: string; desc: string };

export function FeatureList({ features }: { features: Feature[] }) {
  return (
    <View style={{ marginTop: 24 }}>
      {features.map((f, i) => (
        <FadeUp key={i} delay={i * 90}>
          <View style={[styles.row, i === features.length - 1 ? { borderBottomWidth: 0 } : null]}>
            <LinearGradient
              colors={["rgba(196,170,255,0.2)", "rgba(255,154,209,0.1)"] as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.icon}
            >
              <Text style={{ fontSize: 18, color: colors.accent }}>{f.icon}</Text>
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: colors.text }}>{f.label}</Text>
              <Text style={{ fontSize: 12, color: colors.textMute, marginTop: 2 }}>{f.desc}</Text>
            </View>
            <Text style={{ color: colors.accent, fontSize: 14 }}>✓</Text>
          </View>
        </FadeUp>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(196,170,255,0.08)",
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
});
