import { View, Text, StyleSheet } from "react-native";
import { FadeUp } from "@/components/nebula";
import { colors, fonts } from "@/constants/theme";

export function Section({ title, delay = 0, children }: { title: string; delay?: number; children: React.ReactNode }) {
  return (
    <FadeUp delay={delay} style={{ marginBottom: 18 }}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.wrap}>{children}</View>
    </FadeUp>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 10,
    color: colors.textMute,
    fontFamily: fonts.mono,
    letterSpacing: 2,
    marginBottom: 8,
    paddingLeft: 4,
  },
  wrap: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.12)",
    borderRadius: 18,
    overflow: "hidden",
  },
});
