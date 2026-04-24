import { useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { NebulaBg, NatalChart, ZodiacGlyph, FadeUp } from "@/components/nebula";
import { useAppSelector } from "@/store";
import { ZODIAC } from "@/constants/zodiac";
import { colors, fonts } from "@/constants/theme";

const PALETTE = {
  ringBg: "#1a0e3d",
  ringStroke: "rgba(196,170,255,0.35)",
  houseStroke: "rgba(196,170,255,0.18)",
  planet: "#f0ebff",
  glyph: "#c4a4ff",
  accent: "#ff9ad1",
};

export default function NatalTab() {
  const { t } = useTranslation();
  const profile = useAppSelector((s) => s.profile.profile);

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 900, delay: 200, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 1000, delay: 200, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, [opacity, scale]);

  const sun = profile?.sun_sign ?? "leo";
  const moon = profile?.moon_sign ?? null;
  const rising = profile?.rising_sign ?? null;

  const placements = [
    { sym: "☉", labelKey: "natal.sun", sign: sun, color: "#ffd77a" },
    { sym: "☽", labelKey: "natal.moon", sign: moon, color: "#b0dcff" },
    { sym: "↑", labelKey: "natal.rising", sign: rising, color: "#c4a4ff" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <NebulaBg seed={21} />
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <FadeUp delay={0} style={{ paddingHorizontal: 22, paddingTop: 14 }}>
            <Text style={{ fontSize: 10, color: colors.accent, fontFamily: fonts.mono, letterSpacing: 2 }}>
              DOĞUM HARİTASI
            </Text>
            <Text style={{ fontFamily: fonts.display, fontSize: 24, color: colors.text, marginTop: 4 }}>
              {profile?.display_name ?? "—"} ·{" "}
              <Text style={{ color: colors.accent }}>{profile?.birth_date ?? ""}</Text>
            </Text>
          </FadeUp>

          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Animated.View style={{ opacity, transform: [{ scale }] }}>
              <NatalChart size={260} palette={PALETTE} />
            </Animated.View>
          </View>

          <FadeUp delay={400} style={{ paddingHorizontal: 18, marginTop: 24 }}>
            <Text style={{ fontSize: 10, color: colors.accent, fontFamily: fonts.mono, letterSpacing: 2, marginBottom: 10, paddingLeft: 4 }}>
              ÜÇ IŞIK
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {placements.map((p, i) => {
                const z = p.sign ? ZODIAC[p.sign] : null;
                return (
                  <View
                    key={i}
                    style={[
                      styles.placementCard,
                      { borderColor: `${p.color}44` },
                    ]}
                  >
                    <View style={[styles.gem, { backgroundColor: p.color }]}>
                      {z && <ZodiacGlyph sign={p.sign!} size={18} color="#1a0e3d" stroke={1.6} />}
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={{ fontSize: 9, fontFamily: fonts.mono, color: p.color, letterSpacing: 1 }}>
                        {t(p.labelKey).toUpperCase()}
                      </Text>
                      <Text style={{ fontFamily: fonts.displayReg, fontSize: 15, color: colors.text, marginTop: 2 }}>
                        {z ? z.nameTr : "—"}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </FadeUp>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  placementCard: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
  },
  gem: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
