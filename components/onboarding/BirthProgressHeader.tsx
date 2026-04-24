// Design-handoff port: birth onboarding progress header with step pills
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/constants/theme";
import { gradients } from "@/constants/designTokens";

type Props = {
  step: number; // 1-indexed
  total: number;
  stepLabel?: string;
};

export function BirthProgressHeader({ step, total, stepLabel }: Props) {
  const pct = (step / total) * 100;
  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <Text style={styles.count}>
          {step} / {total}
        </Text>
        {stepLabel ? <Text style={styles.label}>{stepLabel}</Text> : null}
      </View>
      <View style={styles.bar}>
        <View
          style={[
            styles.barFill,
            {
              width: `${pct}%`,
              shadowColor: colors.accent,
              shadowOpacity: 0.6,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 0 },
            },
          ]}
        />
      </View>
      <View style={styles.pills}>
        {Array.from({ length: total }).map((_, i) => {
          const idx = i + 1;
          const past = idx < step;
          const active = idx === step;
          const filled = past || active;
          return filled ? (
            <LinearGradient
              key={i}
              colors={gradients.strength as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.pill,
                {
                  width: 20,
                  height: 8,
                  shadowColor: active ? colors.accent2 : "transparent",
                  shadowOpacity: active ? 0.8 : 0,
                  shadowRadius: active ? 6 : 0,
                },
              ]}
            />
          ) : (
            <View
              key={i}
              style={[
                styles.pill,
                {
                  width: 20,
                  height: 8,
                  backgroundColor: "rgba(255,255,255,0.12)",
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 4 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  count: {
    fontSize: 12,
    color: colors.textMute,
    fontFamily: fonts.mono,
    letterSpacing: 1,
  },
  label: {
    fontFamily: fonts.displayReg,
    fontSize: 13,
    color: colors.accent,
  },
  bar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  pills: {
    flexDirection: "row",
    gap: 4,
    marginTop: 8,
  },
  pill: {
    height: 8,
    borderRadius: 4,
  },
});
