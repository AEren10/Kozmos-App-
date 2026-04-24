import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NebulaBg, Orb, Rotator, Starfield } from "@/components/nebula";
import { useAppSelector } from "@/store";
import { colors, fonts } from "@/constants/theme";

const METERS = [
  { label: "Aşk", value: 78, color: "#ff9ad1" },
  { label: "İş", value: 55, color: "#c4a4ff" },
  { label: "Yaratıcılık", value: 91, color: "#ffd77a" },
];

const TRANSITS = [
  { icon: "☽", title: "Balık → Koç", time: "bugün 22:14", color: "#b0dcff" },
  { icon: "☿", title: "Oğlak □ ♀ Koç", time: "3 gün kaldı", color: "#c4a4ff" },
  { icon: "♀", title: "Kova ✦ Satürn", time: "aktif", color: "#ff9ad1" },
];

export default function TodayTab() {
  const profile = useAppSelector((s) => s.profile.profile);
  const name = profile?.display_name ?? "Ela";

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <NebulaBg seed={17} />
      <Starfield seed={117} count={42} />

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View>
              <Text style={styles.kicker}>SALI · 22 NİSAN</Text>
              <Text style={styles.greeting}>
                iyi günler, <Text style={{ color: colors.accent }}>{name}.</Text>
              </Text>
            </View>
            <Rotator duration={20000}>
              <Orb size={56} floatAmplitude={8} colorsOverride={["#fff5ee", "#ffb580", "#e87040"]} />
            </Rotator>
          </View>

          <View style={styles.energyCard}>
            <Text style={styles.sectionLabel}>GÜNLÜK ENERJİ</Text>
            {METERS.map((meter) => (
              <View key={meter.label} style={{ marginBottom: 12 }}>
                <View style={styles.meterHead}>
                  <Text style={styles.meterLabel}>{meter.label}</Text>
                  <Text style={[styles.meterValue, { color: meter.color }]}>{meter.value}%</Text>
                </View>
                <View style={styles.meterTrack}>
                  <View style={[styles.meterFill, { width: `${meter.value}%`, backgroundColor: meter.color }]} />
                </View>
              </View>
            ))}

            <View style={styles.sunBadge}>
              <Text style={styles.sunBadgeText}>☉</Text>
            </View>
          </View>

          <View style={styles.messageCard}>
            <Text style={styles.sectionLabel}>BUGÜN SANA</Text>
            <Text style={styles.messageText}>
              "Balık Ayı seni rüya ve hayal dünyasına çekiyor. Bugün sezgin keskin — not defterini yanından ayırma. Venüs ile Satürn arasındaki gerilim ilişkilerde sınır koymayı hatırlatıyor."
            </Text>
            <View style={styles.moonBadge}>
              <Text style={{ fontSize: 14 }}>☽</Text>
            </View>
          </View>

          <Text style={[styles.sectionLabel, { marginTop: 4, marginBottom: 10, paddingLeft: 2 }]}>AKTİF TRANSİTLER</Text>
          {TRANSITS.map((transit) => (
            <View key={transit.title} style={styles.transitRow}>
              <View style={[styles.transitIcon, { backgroundColor: `${transit.color}22`, borderColor: `${transit.color}44` }]}>
                <Text style={{ color: transit.color, fontSize: 16 }}>{transit.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.transitTitle}>{transit.title}</Text>
                <Text style={styles.transitTime}>{transit.time}</Text>
              </View>
              <View style={[styles.transitDot, { backgroundColor: transit.color }]} />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 90,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
    marginBottom: 18,
  },
  kicker: {
    fontSize: 11,
    color: colors.accent,
    fontFamily: fonts.mono,
    letterSpacing: 2,
    marginBottom: 4,
  },
  greeting: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: colors.text,
  },
  energyCard: {
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.16)",
    marginBottom: 14,
    position: "relative",
  },
  sectionLabel: {
    fontSize: 10,
    color: "rgba(196,170,255,0.72)",
    fontFamily: fonts.mono,
    letterSpacing: 2,
    marginBottom: 10,
  },
  meterHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  meterLabel: {
    fontSize: 12,
    color: "rgba(240,235,255,0.72)",
  },
  meterValue: {
    fontSize: 12,
    fontFamily: fonts.mono,
  },
  meterTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  meterFill: {
    height: "100%",
    borderRadius: 999,
  },
  sunBadge: {
    position: "absolute",
    top: -12,
    right: 14,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ffd77a",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
  },
  sunBadgeText: {
    fontSize: 18,
    color: "#1a0e3d",
    fontFamily: fonts.displayBold,
  },
  messageCard: {
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.14)",
    marginBottom: 14,
    position: "relative",
  },
  messageText: {
    fontFamily: fonts.displayReg,
    fontSize: 18,
    color: colors.text,
    lineHeight: 30,
  },
  moonBadge: {
    position: "absolute",
    left: -8,
    top: "50%",
    marginTop: -16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#b0dcff",
    alignItems: "center",
    justifyContent: "center",
  },
  transitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.1)",
    marginBottom: 8,
  },
  transitIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  transitTitle: {
    fontSize: 13,
    color: colors.text,
    fontWeight: "500",
  },
  transitTime: {
    fontSize: 11,
    color: "rgba(240,235,255,0.5)",
    fontFamily: fonts.mono,
    marginTop: 2,
  },
  transitDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
