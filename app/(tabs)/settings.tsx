import { View, Text, ScrollView, Pressable, StyleSheet, Alert, Switch, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import * as Application from "expo-application";
import { NebulaBg } from "@/components/nebula";
import { SectionRow, Divider } from "@/components/settings/SectionRow";
import { Section } from "@/components/settings/Section";
import { ProfileHeader } from "@/components/settings/ProfileHeader";
import { useAppDispatch, useAppSelector } from "@/store";
import { setLang, toast } from "@/store/slices/uiSlice";
import { setOnboardingSeen, setPaywallSeen } from "@/store/slices/streakSlice";
import { clearProfile } from "@/store/slices/profileSlice";
import { signOut } from "@/hooks/useAuth";
import { setLanguage as setI18nLang } from "@/lib/i18n";
import { scheduleDailyReminder, cancelReminders } from "@/lib/notifications";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { isPurchasesConfigured, restorePurchases } from "@/lib/purchases";
import type { ZodiacSign } from "@/constants/zodiac";
import { colors, fonts } from "@/constants/theme";

const PRIVACY_URL = "https://kozmos.app/privacy";
const TERMS_URL = "https://kozmos.app/terms";

export default function SettingsTab() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const lang = useAppSelector((s) => s.ui.lang);
  const profile = useAppSelector((s) => s.profile.profile);
  const email = useAppSelector((s) => s.auth.email);
  const [dailyNotif, setDailyNotif] = useState(true);
  const [restoring, setRestoring] = useState(false);

  const toggleLang = () => {
    const next = lang === "tr" ? "en" : "tr";
    dispatch(setLang(next));
    setI18nLang(next);
    dispatch(toast({ text: next === "tr" ? "Dil: Türkçe" : "Language: English", type: "success" }));
  };

  const toggleDaily = async (on: boolean) => {
    setDailyNotif(on);
    try {
      if (on) await scheduleDailyReminder(parseInt(profile?.notify_time?.split(":")[0] ?? "8", 10), 0);
      else await cancelReminders();
    } catch (e) {
      setDailyNotif(!on);
      const msg = e instanceof Error ? e.message : t("errors.networkError");
      dispatch(toast({ text: msg, type: "error" }));
    }
  };

  const resetOnboarding = () => {
    Alert.alert(t("settings.resetOnboarding"), lang === "tr" ? "Emin misin?" : "Are you sure?", [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.continue"),
        onPress: () => {
          dispatch(setOnboardingSeen(false));
          dispatch(setPaywallSeen(false));
          router.replace("/onboarding-intro" as never);
        },
      },
    ]);
  };

  const onSignOut = () => {
    Alert.alert(t("auth.logout"), lang === "tr" ? "Emin misin?" : "Are you sure?", [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("auth.logout"),
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
          } catch (e) {
            const msg = e instanceof Error ? e.message : t("errors.networkError");
            dispatch(toast({ text: msg, type: "error" }));
          } finally {
            dispatch(clearProfile());
          }
        },
      },
    ]);
  };

  const onRestore = async () => {
    if (restoring) return;
    setRestoring(true);
    try {
      if (!isPurchasesConfigured()) {
        dispatch(toast({ text: t("paywall.restoreSoon"), type: "info" }));
        return;
      }
      await restorePurchases();
      dispatch(toast({ text: t("paywall.restoreSuccess"), type: "success" }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : t("errors.networkError");
      dispatch(toast({ text: msg, type: "error" }));
    } finally {
      setRestoring(false);
    }
  };

  const onDeleteAccount = () => {
    Alert.alert(
      t("settings.deleteAccount"),
      t("settings.deleteAccountConfirm"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("settings.deleteAccount"),
          style: "destructive",
          onPress: async () => {
            try {
              if (!isSupabaseConfigured()) {
                dispatch(toast({ text: t("errors.networkError"), type: "error" }));
                return;
              }
              const { error } = await supabase.functions.invoke("delete-account", { method: "POST" });
              if (error) throw error;
              await signOut();
              dispatch(clearProfile());
              dispatch(toast({ text: t("settings.deleteAccountDone"), type: "success" }));
            } catch (e) {
              const msg = e instanceof Error ? e.message : t("errors.networkError");
              dispatch(toast({ text: msg, type: "error" }));
            }
          },
        },
      ],
    );
  };

  const openUrl = (url: string) => void Linking.openURL(url);

  const appVersion = Application.nativeApplicationVersion ?? "1.0.0";
  const buildVersion = Application.nativeBuildVersion ?? "";

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <NebulaBg seed={29} />
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
          <ProfileHeader
            displayName={profile?.display_name ?? null}
            sunSign={profile?.sun_sign as ZodiacSign | undefined}
            moonSign={profile?.moon_sign as ZodiacSign | undefined}
            risingSign={profile?.rising_sign as ZodiacSign | undefined}
            lang={lang}
          />

          <View style={{ paddingHorizontal: 18 }}>
            <Section title={lang === "tr" ? "HESAP" : "ACCOUNT"} delay={100}>
              <SectionRow icon="✉" label={t("auth.email")} value={email ?? "—"} />
              <Divider />
              <SectionRow
                icon="✦"
                label={t("settings.upgradeToPlus")}
                value={profile?.is_premium ? (lang === "tr" ? "Aktif ✓" : "Active ✓") : (lang === "tr" ? "Geç" : "Upgrade")}
                accent
                onPress={() => router.push("/paywall" as never)}
              />
              <Divider />
              <SectionRow
                icon="⟲"
                label={t("settings.restorePurchases")}
                value={restoring ? t("common.loading") : undefined}
                onPress={onRestore}
              />
            </Section>

            <Section title={lang === "tr" ? "TERCİHLER" : "PREFERENCES"} delay={200}>
              <SectionRow
                icon="☾"
                label={t("settings.dailyHoroscope")}
                right={
                  <Switch
                    value={dailyNotif}
                    onValueChange={toggleDaily}
                    trackColor={{ true: colors.accent, false: colors.border }}
                  />
                }
              />
              <Divider />
              <SectionRow
                icon="🌐"
                label={t("settings.language")}
                value={lang === "tr" ? "Türkçe" : "English"}
                onPress={toggleLang}
              />
              <Divider />
              <SectionRow
                icon="◑"
                label={t("settings.theme")}
                value={t("settings.themeOptions.dark")}
                right={
                  <Text style={{ fontSize: 10, color: colors.textFaint, fontFamily: fonts.mono, letterSpacing: 1 }}>
                    {t("common.comingSoon").toUpperCase()}
                  </Text>
                }
                onPress={() => dispatch(toast({ text: t("common.comingSoon"), type: "info" }))}
              />
            </Section>

            <Section title={lang === "tr" ? "DOĞUM BİLGİLERİ" : "BIRTH DETAILS"} delay={300}>
              <SectionRow icon="📍" label={lang === "tr" ? "Yer" : "Place"} value={profile?.birth_place ?? "—"} />
              <Divider />
              <SectionRow icon="⌚" label={lang === "tr" ? "Saat" : "Time"} value={profile?.birth_time ?? "—"} />
              <Divider />
              <SectionRow icon="📅" label={lang === "tr" ? "Tarih" : "Date"} value={profile?.birth_date ?? "—"} />
            </Section>

            <Section title={lang === "tr" ? "YASAL" : "LEGAL"} delay={350}>
              <SectionRow icon="§" label={t("settings.privacyPolicy")} onPress={() => openUrl(PRIVACY_URL)} />
              <Divider />
              <SectionRow icon="§" label={t("settings.termsOfService")} onPress={() => openUrl(TERMS_URL)} />
              <Divider />
              <SectionRow
                icon="ℹ"
                label={t("settings.version")}
                value={buildVersion ? `${appVersion} (${buildVersion})` : appVersion}
              />
            </Section>

            <Section title={lang === "tr" ? "DAHA" : "MORE"} delay={400}>
              <SectionRow icon="↺" label={t("settings.resetOnboarding")} onPress={resetOnboarding} />
              <Divider />
              <SectionRow icon="⌫" label={t("settings.deleteAccount")} onPress={onDeleteAccount} destructive />
            </Section>

            <Pressable onPress={onSignOut} style={styles.signOut}>
              <Text style={{ color: "rgba(255,120,120,0.85)", fontSize: 14 }}>{t("auth.logout")}</Text>
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

const styles = StyleSheet.create({
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
