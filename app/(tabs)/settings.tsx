import { View, Text, ScrollView, Pressable, StyleSheet, Alert, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { NebulaBg, Rotator, FadeUp } from "@/components/nebula";
import { useAppDispatch, useAppSelector } from "@/store";
import { setLang, toast } from "@/store/slices/uiSlice";
import { setOnboardingSeen, setPaywallSeen } from "@/store/slices/streakSlice";
import { clearProfile } from "@/store/slices/profileSlice";
import { signOut } from "@/hooks/useAuth";
import { setLanguage as setI18nLang } from "@/lib/i18n";
import { scheduleDailyReminder, cancelReminders } from "@/lib/notifications";
import { ZODIAC } from "@/constants/zodiac";
import { colors, fonts } from "@/constants/theme";

function SectionRow({
  icon,
  label,
  value,
  onPress,
  right,
  accent,
}: {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
  right?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, { opacity: pressed ? 0.7 : 1 }]}>
      <View style={styles.rowIcon}>
        <Text style={{ fontSize: 14, color: colors.accent }}>{icon}</Text>
      </View>
      <Text style={{ flex: 1, fontSize: 15, color: colors.text }}>{label}</Text>
      {value && (
        <Text style={{ fontSize: 12, color: accent ? colors.accent : colors.textMute, fontFamily: fonts.mono }}>
          {value}
        </Text>
      )}
      {right}
      {onPress && <Text style={{ color: colors.textFaint, marginLeft: 8 }}>›</Text>}
    </Pressable>
  );
}

export default function SettingsTab() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const lang = useAppSelector((s) => s.ui.lang);
  const profile = useAppSelector((s) => s.profile.profile);
  const email = useAppSelector((s) => s.auth.email);
  const [dailyNotif, setDailyNotif] = useState(true);

  const toggleLang = () => {
    const next = lang === "tr" ? "en" : "tr";
    dispatch(setLang(next));
    setI18nLang(next);
    dispatch(toast({ text: next === "tr" ? "Dil: Türkçe" : "Language: English", type: "success" }));
  };

  const toggleDaily = async (on: boolean) => {
    setDailyNotif(on);
    if (on) await scheduleDailyReminder(parseInt(profile?.notify_time?.split(":")[0] ?? "8"), 0);
    else await cancelReminders();
  };

  const resetOnboarding = () => {
    Alert.alert(t("settings.resetOnboarding"), "Emin misin?", [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.continue"),
        onPress: () => {
          dispatch(setOnboardingSeen(false));
          dispatch(setPaywallSeen(false));
          router.replace("/onboarding-intro" as any);
        },
      },
    ]);
  };

  const onSignOut = () => {
    Alert.alert(t("auth.logout"), "Emin misin?", [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("auth.logout"),
        style: "destructive",
        onPress: async () => {
          await signOut();
          dispatch(clearProfile());
        },
      },
    ]);
  };

  const sunZ = profile?.sun_sign ? ZODIAC[profile.sun_sign] : null;
  const moonZ = profile?.moon_sign ? ZODIAC[profile.moon_sign] : null;
  const risingZ = profile?.rising_sign ? ZODIAC[profile.rising_sign] : null;
  const big3 = [
    { sym: "☉", sign: sunZ?.nameTr ?? "—", color: "#ffd77a" },
    { sym: "☽", sign: moonZ?.nameTr ?? "—", color: "#b0dcff" },
    { sym: "↑", sign: risingZ?.nameTr ?? "—", color: "#c4a4ff" },
  ];

  const initial = (profile?.display_name ?? "?").charAt(0).toUpperCase();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <NebulaBg seed={29} />
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          {/* Profile header */}
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
                <View style={{ position: "absolute", inset: 0 } as any}>
                  <Rotator duration={30000}>
                    <View style={styles.avatarRing} />
                  </Rotator>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.displayReg, fontSize: 22, color: colors.text }}>
                  {profile?.display_name ?? "—"}
                </Text>
                <Text style={{ fontSize: 11, color: colors.textMute, fontFamily: fonts.mono, letterSpacing: 1, marginTop: 3 }}>
                  ☉ {(sunZ?.nameTr ?? "—").toUpperCase()} · ☽ {(moonZ?.nameTr ?? "—").toUpperCase()} · ↑ {(risingZ?.nameTr ?? "—").toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Big-3 badges */}
            <View style={{ flexDirection: "row", gap: 8, marginTop: 14 }}>
              {big3.map((b, i) => (
                <View
                  key={i}
                  style={[
                    styles.big3Badge,
                    { backgroundColor: `${b.color}14`, borderColor: `${b.color}44` },
                  ]}
                >
                  <Text style={{ fontSize: 14, color: b.color, marginBottom: 2 }}>{b.sym}</Text>
                  <Text style={{ fontFamily: fonts.displayReg, fontSize: 13, color: colors.text }}>{b.sign}</Text>
                </View>
              ))}
            </View>
          </FadeUp>

          <View style={{ paddingHorizontal: 18 }}>
            <Section title="HESAP" delay={100}>
              <SectionRow icon="✉" label="E-posta" value={email ?? "—"} />
              <Divider />
              <SectionRow
                icon="✦"
                label={t("settings.upgradeToPlus")}
                value={profile?.is_premium ? "Aktif ✓" : "Geç"}
                accent
                onPress={() => router.push("/paywall" as any)}
              />
            </Section>

            <Section title="TERCİHLER" delay={200}>
              <SectionRow
                icon="☾"
                label={t("settings.dailyHoroscope")}
                right={<Switch value={dailyNotif} onValueChange={toggleDaily} trackColor={{ true: colors.accent, false: colors.border }} />}
              />
              <Divider />
              <SectionRow icon="🌐" label={t("settings.language")} value={lang === "tr" ? "Türkçe" : "English"} onPress={toggleLang} />
              <Divider />
              <SectionRow icon="◑" label={t("settings.theme")} value="Nebula" />
            </Section>

            <Section title="DOĞUM BİLGİLERİ" delay={300}>
              <SectionRow icon="📍" label="Yer" value={profile?.birth_place ?? "—"} />
              <Divider />
              <SectionRow icon="⌚" label="Saat" value={profile?.birth_time ?? "—"} />
              <Divider />
              <SectionRow icon="📅" label="Tarih" value={profile?.birth_date ?? "—"} />
            </Section>

            <Section title="DAHA" delay={400}>
              <SectionRow icon="↺" label={t("settings.resetOnboarding")} onPress={resetOnboarding} />
            </Section>

            <Pressable onPress={onSignOut} style={styles.signOut}>
              <Text style={{ color: "rgba(255,120,120,0.8)", fontSize: 14 }}>Çıkış Yap</Text>
            </Pressable>

            <Text style={{ textAlign: "center", color: colors.textFaint, fontSize: 11, marginTop: 20, fontFamily: fonts.mono }}>
              {t("settings.disclaimer")}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function Section({ title, delay = 0, children }: any) {
  return (
    <FadeUp delay={delay} style={{ marginBottom: 18 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionWrap}>{children}</View>
    </FadeUp>
  );
}

const Divider = () => <View style={{ height: 1, backgroundColor: "rgba(255,255,255,0.05)", marginLeft: 54 }} />;

const styles = StyleSheet.create({
  avatarWrap: { position: "relative", width: 72, height: 72, alignItems: "center", justifyContent: "center" },
  avatar: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center" },
  avatarText: { fontFamily: fonts.displayReg, fontSize: 26, color: "#1a0e3d" },
  avatarRing: { width: 72, height: 72, borderRadius: 36, borderWidth: 0.8, borderColor: "rgba(196,170,255,0.3)", borderStyle: "dashed" },
  big3Badge: {
    flex: 1,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 10,
    color: colors.textMute,
    fontFamily: fonts.mono,
    letterSpacing: 2,
    marginBottom: 8,
    paddingLeft: 4,
  },
  sectionWrap: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.12)",
    borderRadius: 18,
    overflow: "hidden",
  },
  row: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(196,170,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  signOut: {
    marginTop: 8,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "rgba(255,100,100,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,100,100,0.15)",
    alignItems: "center",
  },
});
