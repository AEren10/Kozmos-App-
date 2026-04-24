import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NebulaBg, NatalChart, Starfield, ZodiacGlyph } from "@/components/nebula";
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

export default function NatalTab() {
  const profile = useAppSelector((s) => s.profile.profile);
  const displayName = profile?.display_name ?? "Ela Demir";
  const displayDate = profile?.birth_date ?? "14 Ocak 1996";

  const placements = [
    { label: "AY", sign: ((profile?.moon_sign as ZodiacSign) ?? "pisces"), color: "#b0dcff", deg: "4°" },
    { label: "GÜNEŞ", sign: ((profile?.sun_sign as ZodiacSign) ?? "leo"), color: "#ffd77a", deg: "12°" },
    { label: "VENÜS", sign: "aquarius" as ZodiacSign, color: "#ff9ad1", deg: "2°" },
    { label: "YÜKSELEN", sign: ((profile?.rising_sign as ZodiacSign) ?? "scorpio"), color: "#c4a4ff", deg: "28°" },
    { label: "MERKÜR", sign: "capricorn" as ZodiacSign, color: "#d0f0c0", deg: "14°" },
  ];

  const topBadges = placements.slice(0, 2);
  const lowerBadges = placements.slice(2);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <NebulaBg seed={21} />
      <Starfield seed={55} count={38} />

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.kicker}>DOĞUM HARİTASI</Text>
          <Text style={styles.title}>
            {displayName} <Text style={{ color: colors.accent }}>· {displayDate}</Text>
          </Text>

          <View style={styles.chartWrap}>
            <View style={styles.overlayTopRow}>
              {topBadges.map((item) => (
                <PlacementBadge key={item.label} {...item} />
              ))}
            </View>

            <NatalChart size={240} palette={PALETTE} />

            <View style={styles.overlayBottomCol}>
              {lowerBadges.map((item) => (
                <PlacementBadge key={item.label} {...item} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function PlacementBadge({
  label,
  sign,
  color,
  deg,
}: {
  label: string;
  sign: ZodiacSign;
  color: string;
  deg: string;
}) {
  return (
    <View style={[styles.badge, { borderColor: `${color}40` }]}>
      <View style={[styles.badgeOrb, { backgroundColor: color }]}>
        <ZodiacGlyph sign={sign} size={16} color="#1a0e3d" stroke={1.6} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.badgeLabel, { color }]}>{label}</Text>
        <Text style={styles.badgeValue}>
          {ZODIAC[sign].nameTr} <Text style={styles.badgeDeg}>{deg}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 90,
  },
  kicker: {
    fontSize: 10,
    color: colors.accent,
    fontFamily: fonts.mono,
    letterSpacing: 2,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: colors.text,
    paddingHorizontal: 4,
  },
  chartWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    position: "relative",
    minHeight: 420,
  },
  overlayTopRow: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 2,
  },
  overlayBottomCol: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    gap: 8,
    zIndex: 2,
  },
  badge: {
    minWidth: 140,
    maxWidth: 168,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: "rgba(13,8,32,0.76)",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badgeOrb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeLabel: {
    fontSize: 9,
    fontFamily: fonts.mono,
    letterSpacing: 1,
  },
  badgeValue: {
    fontFamily: fonts.displayReg,
    fontSize: 13,
    color: colors.text,
  },
  badgeDeg: {
    fontSize: 10,
    color: "rgba(240,235,255,0.45)",
    fontFamily: fonts.mono,
  },
});
