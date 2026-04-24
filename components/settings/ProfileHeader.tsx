import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FadeUp, Rotator } from "@/components/nebula";
import { ZODIAC, type ZodiacSign } from "@/constants/zodiac";
import { colors, fonts } from "@/constants/theme";

type Props = {
  displayName: string | null;
  sunSign?: ZodiacSign;
  moonSign?: ZodiacSign;
  risingSign?: ZodiacSign;
  lang: "tr" | "en";
};

export function ProfileHeader({ displayName, sunSign, moonSign, risingSign, lang }: Props) {
  const sunZ = sunSign ? ZODIAC[sunSign] : null;
  const moonZ = moonSign ? ZODIAC[moonSign] : null;
  const risingZ = risingSign ? ZODIAC[risingSign] : null;
  const zName = (z: typeof sunZ): string => (z ? (lang === "tr" ? z.nameTr : z.name) : "—");
  const big3 = [
    { sym: "☉", sign: zName(sunZ), color: "#ffd77a" },
    { sym: "☽", sign: zName(moonZ), color: "#b0dcff" },
    { sym: "↑", sign: zName(risingZ), color: "#c4a4ff" },
  ];
  const initial = (displayName ?? "?").charAt(0).toUpperCase();

  return (
    <FadeUp delay={0} style={{ padding: 22, paddingBottom: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <View style={styles.avatarWrap}>
          <LinearGradient
            colors={["#ff9ad1", "#c4a4ff", "#8b5cf6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{initial}</Text>
          </LinearGradient>
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Rotator duration={30000}>
              <View style={styles.avatarRing} />
            </Rotator>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonts.displayReg, fontSize: 22, color: colors.text }}>
            {displayName ?? "—"}
          </Text>
          <Text style={{ fontSize: 11, color: colors.textMute, fontFamily: fonts.mono, letterSpacing: 1, marginTop: 3 }}>
            ☉ {zName(sunZ).toUpperCase()} · ☽ {zName(moonZ).toUpperCase()} · ↑ {zName(risingZ).toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 8, marginTop: 14 }}>
        {big3.map((b, i) => (
          <View
            key={i}
            style={[styles.big3, { backgroundColor: `${b.color}14`, borderColor: `${b.color}44` }]}
          >
            <Text style={{ fontSize: 14, color: b.color, marginBottom: 2 }}>{b.sym}</Text>
            <Text style={{ fontFamily: fonts.displayReg, fontSize: 13, color: colors.text }}>{b.sign}</Text>
          </View>
        ))}
      </View>
    </FadeUp>
  );
}

const styles = StyleSheet.create({
  avatarWrap: { position: "relative", width: 72, height: 72, alignItems: "center", justifyContent: "center" },
  avatar: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center" },
  avatarText: { fontFamily: fonts.displayReg, fontSize: 26, color: "#1a0e3d" },
  avatarRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 0.8,
    borderColor: "rgba(196,170,255,0.3)",
    borderStyle: "dashed",
  },
  big3: {
    flex: 1,
    height: 56,
    padding: 8,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
