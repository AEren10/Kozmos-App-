import { useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { NebulaBg, NatalChart, ZodiacGlyph, FadeUp, Starfield } from "@/components/nebula";
import { useAppSelector } from "@/store";
import { ZODIAC, type ZodiacSign } from "@/constants/zodiac";
import { colors, fonts } from "@/constants/theme";

const PALETTE = {
  ringBg: "#1a0e3d",
  ringStroke: "rgba(196,170,255,0.35)",
  houseStroke: "rgba(196,170,255,0.18)",
  planet: "#f0ebff",
  glyph: "#c4a4ff",
  accent: "#ff9ad1",
};

type Placement = {
  sym: string;
  labelKey: string;
  sign: ZodiacSign | null;
  deg: string;
  color: string;
};

export default function NatalTab() {
  const { t } = useTranslation();
  const profile = useAppSelector((s) => s.profile.profile);
  const lang = useAppSelector((s) => s.ui.lang);

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const rot = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 900, delay: 400, useNativeDriver: true }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        delay: 400,
        easing: Easing.bezier(0.2, 0.8, 0.3, 1),
        useNativeDriver: true,
      }),
      Animated.timing(rot, {
        toValue: 0,
        duration: 1000,
        delay: 400,
        easing: Easing.bezier(0.2, 0.8, 0.3, 1),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale, rot]);

  const sun = (profile?.sun_sign as ZodiacSign | undefined) ?? "leo";
  const moon = (profile?.moon_sign as ZodiacSign | undefined) ?? "pisces";
  const rising = (profile?.rising_sign as ZodiacSign | undefined) ?? "scorpio";

  const placements: Placement[] = [
    { sym: "☉", labelKey: "natal.sun", sign: sun, deg: "12°", color: "#ffd77a" },
    { sym: "☽", labelKey: "natal.moon", sign: moon, deg: "4°", color: "#b0dcff" },
    { sym: "↑", labelKey: "natal.rising", sign: rising, deg: "28°", color: "#c4a4ff" },
    { sym: "☿", labelKey: "natal.mercury", sign: "capricorn", deg: "14°", color: "#d0f0c0" },
    { sym: "♀", labelKey: "natal.venus", sign: "aquarius", deg: "2°", color: "#ff9ad1" },
    { sym: "♂", labelKey: "natal.mars", sign: "leo", deg: "21° ℞", color: "#ff8f6b" },
  ];

  const rotInterpolate = rot.interpolate({ inputRange: [-10, 0], outputRange: ["-10deg", "0deg"] });

  const signName = (s: ZodiacSign | null): string => {
    if (!s) return "—";
    const z = ZODIAC[s];
    return lang === "tr" ? z.nameTr : z.name;
  };

  const badgeOverlays: Array<{ pos: Record<string, number>; item: Placement }> = [
    { pos: { top: 10, right: 16 }, item: placements[0] },
    { pos: { top: 10, left: 16 }, item: placements[1] },
    { pos: { bottom: 10, left: 16 }, item: placements[4] },
  ];

  const displayDate = profile?.birth_date ?? "";
  const displayName = profile?.display_name ?? "—";

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <NebulaBg seed={21} />
      <Starfield count={40} />
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          <FadeUp delay={0} style={{ paddingHorizontal: 22, paddingTop: 12 }}>
            <Text style={styles.eyebrow}>{t("natal.title").toUpperCase()}</Text>
            <Text style={styles.headline}>
              {displayName}
              {displayDate ? (
                <Text style={{ color: colors.accent }}> · {displayDate}</Text>
              ) : null}
            </Text>
          </FadeUp>

          {/* Chart + overlay badges */}
          <View style={{ position: "relative", alignItems: "center", paddingVertical: 16 }}>
            <Animated.View
              style={{
                opacity,
                transform: [{ scale }, { rotate: rotInterpolate }],
              }}
            >
              <NatalChart size={240} palette={PALETTE} />
            </Animated.View>

            {badgeOverlays.map((b, i) => (
              <FadeUp
                key={i}
                delay={600 + i * 150}
                style={[styles.overlayBadge, b.pos, { borderColor: `${b.item.color}55` }]}
              >
                <View
                  style={[
                    styles.overlayGem,
                    { backgroundColor: b.item.color },
                  ]}
                >
                  {b.item.sign && (
                    <ZodiacGlyph sign={b.item.sign} size={14} color="#1a0e3d" stroke={1.6} />
                  )}
                </View>
                <View>
                  <Text style={[styles.overlayLabel, { color: b.item.color }]}>
                    {t(b.item.labelKey).toUpperCase()}
                  </Text>
                  <Text style={styles.overlaySign}>{signName(b.item.sign)}</Text>
                </View>
              </FadeUp>
            ))}
          </View>

          {/* Grid */}
          <View style={{ paddingHorizontal: 18 }}>
            <View style={styles.grid}>
              {placements.map((p, i) => (
                <FadeUp
                  key={i}
                  delay={200 + i * 80}
                  style={[styles.placementCard, { borderColor: `${p.color}33` }]}
                >
                  <View style={[styles.gem, { backgroundColor: p.color, shadowColor: p.color }]}>
                    {p.sign && <ZodiacGlyph sign={p.sign} size={18} color="#1a0e3d" stroke={1.6} />}
                  </View>
                  <View style={{ flex: 1, marginLeft: 10, minWidth: 0 }}>
                    <Text style={[styles.cardLabel, { color: p.color }]}>
                      {t(p.labelKey).toUpperCase()}
                    </Text>
                    <Text style={styles.cardSign} numberOfLines={1}>
                      {signName(p.sign)}
                      <Text style={styles.cardDeg}>  {p.deg}</Text>
                    </Text>
                  </View>
                </FadeUp>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    fontSize: 10,
    color: colors.accent,
    fontFamily: fonts.mono,
    letterSpacing: 2,
    marginBottom: 4,
  },
  headline: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: colors.text,
  },
  overlayBadge: {
    position: "absolute",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "rgba(13,8,32,0.75)",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  overlayGem: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayLabel: {
    fontSize: 9,
    fontFamily: fonts.mono,
    letterSpacing: 1,
  },
  overlaySign: {
    fontSize: 12,
    fontFamily: fonts.displayReg,
    color: colors.text,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  placementCard: {
    width: "48.5%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    paddingHorizontal: 12,
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
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  cardLabel: {
    fontSize: 9,
    fontFamily: fonts.mono,
    letterSpacing: 1,
  },
  cardSign: {
    fontFamily: fonts.displayReg,
    fontSize: 14,
    color: colors.text,
    marginTop: 2,
  },
  cardDeg: {
    fontSize: 10,
    color: colors.textMute,
    fontFamily: fonts.mono,
  },
});
