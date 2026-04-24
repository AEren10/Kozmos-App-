import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NebulaBg, Starfield } from "@/components/nebula";
import { useAppSelector } from "@/store";
import { ZODIAC, type ZodiacSign } from "@/constants/zodiac";
import { colors, fonts } from "@/constants/theme";

export default function SettingsTab() {
  const profile = useAppSelector((s) => s.profile.profile);
  const name = profile?.display_name ?? "Ela Demir";
  const sun = ((profile?.sun_sign as ZodiacSign) ?? "leo");
  const moon = ((profile?.moon_sign as ZodiacSign) ?? "pisces");
  const rising = ((profile?.rising_sign as ZodiacSign) ?? "scorpio");

  const sections = [
    {
      title: "HESAP",
      rows: [
        { icon: "✉", label: "E-posta", value: profile?.email ?? "ela@kozmos.app" },
        { icon: "🔑", label: "Şifre", value: "Değiştir" },
        { icon: "✦", label: "Kozmos Pro", value: "Aktif ✓", accent: true },
      ],
    },
    {
      title: "TERCİHLER",
      rows: [
        { icon: "☾", label: "Günlük bildirim", value: profile?.notify_time ?? "09:00" },
        { icon: "◎", label: "Ev sistemi", value: "Placidus" },
        { icon: "🌐", label: "Dil", value: "Türkçe" },
        { icon: "◑", label: "Tema", value: "Nebula" },
      ],
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <NebulaBg seed={29} />
      <Starfield seed={66} count={34} />

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarLetter}>{name.charAt(0)}</Text>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.big3}>
                ☉ {ZODIAC[sun].nameTr.toUpperCase()} · ☽ {ZODIAC[moon].nameTr.toUpperCase()} · ↑ {ZODIAC[rising].nameTr.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.signRow}>
            <SignPill icon="☉" label={ZODIAC[sun].nameTr} color="#ffd77a" />
            <SignPill icon="☽" label={ZODIAC[moon].nameTr} color="#b0dcff" />
            <SignPill icon="↑" label={ZODIAC[rising].nameTr} color="#c4a4ff" />
          </View>

          {sections.map((section) => (
            <View key={section.title} style={{ marginBottom: 18 }}>
              <Text style={styles.sectionLabel}>{section.title}</Text>
              <View style={styles.sectionCard}>
                {section.rows.map((row, index) => (
                  <View key={row.label}>
                    {index > 0 ? <View style={styles.divider} /> : null}
                    <View style={styles.row}>
                      <View style={styles.rowIcon}>
                        <Text style={{ fontSize: 14 }}>{row.icon}</Text>
                      </View>
                      <Text style={styles.rowLabel}>{row.label}</Text>
                      <Text style={[styles.rowValue, row.accent ? { color: colors.accent } : null]}>{row.value}</Text>
                      <Text style={styles.chevron}>›</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}

          <View style={styles.signOut}>
            <Text style={styles.signOutText}>Çıkış Yap</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function SignPill({ icon, label, color }: { icon: string; label: string; color: string }) {
  return (
    <View style={[styles.signPill, { backgroundColor: `${color}14`, borderColor: `${color}40` }]}>
      <Text style={[styles.signIcon, { color }]}>{icon}</Text>
      <Text style={styles.signText}>{label}</Text>
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
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  avatarWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#e4c8ff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    fontFamily: fonts.displayReg,
    fontSize: 26,
    color: "#1a0e3d",
  },
  name: {
    fontFamily: fonts.displayReg,
    fontSize: 22,
    color: colors.text,
  },
  big3: {
    fontSize: 11,
    color: "rgba(240,235,255,0.55)",
    fontFamily: fonts.mono,
    letterSpacing: 1,
    marginTop: 3,
  },
  signRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },
  signPill: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  signIcon: {
    fontSize: 14,
    marginBottom: 2,
  },
  signText: {
    fontFamily: fonts.displayReg,
    fontSize: 13,
    color: colors.text,
  },
  sectionLabel: {
    fontSize: 10,
    color: "rgba(196,170,255,0.62)",
    fontFamily: fonts.mono,
    letterSpacing: 2,
    marginBottom: 8,
    paddingLeft: 4,
  },
  sectionCard: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.12)",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(196,170,255,0.12)",
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  rowValue: {
    fontSize: 12,
    color: "rgba(240,235,255,0.45)",
    fontFamily: fonts.mono,
  },
  chevron: {
    fontSize: 18,
    color: "rgba(240,235,255,0.25)",
    marginTop: -2,
  },
  signOut: {
    borderRadius: 14,
    backgroundColor: "rgba(255,100,100,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,100,100,0.15)",
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 2,
  },
  signOutText: {
    fontSize: 14,
    color: "rgba(255,120,120,0.82)",
  },
});
