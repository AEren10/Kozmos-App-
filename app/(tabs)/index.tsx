import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { NebulaBg, Orb, Rotator, GlassCard, FadeUp, ShimmerText } from "@/components/nebula";
import { GradientBar } from "@/components/ui/GradientBar";
import { FeedbackBar } from "@/components/ui/FeedbackBar";
import { CheckinSheet } from "@/components/features/CheckinSheet";
import { useAppDispatch, useAppSelector } from "@/store";
import { markVisit } from "@/store/slices/streakSlice";
import { toast } from "@/store/slices/uiSlice";
import { getDailyHoroscope } from "@/lib/api/horoscope";
import { saveCheckin, getTodayCheckin } from "@/lib/api/checkin";
import { shareHoroscope } from "@/lib/share";
import { ZODIAC } from "@/constants/zodiac";
import { colors, fonts } from "@/constants/theme";

function Meter({
  label, value, gradient, delay = 0, swatch,
}: { label: string; value: number; gradient: readonly [string, string]; delay?: number; swatch: string }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
        <Text style={{ fontSize: 12, color: colors.textDim }}>{label}</Text>
        <Text style={{ fontSize: 12, color: swatch, fontFamily: fonts.mono }}>{value}%</Text>
      </View>
      <GradientBar value={value} colors={gradient} delay={delay} height={8} />
    </View>
  );
}

export default function DailyTab() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((s) => s.profile.profile);
  const userId = useAppSelector((s) => s.auth.userId);
  const streak = useAppSelector((s) => s.streak.current);
  const { t, i18n } = useTranslation();
  const sign = profile?.sun_sign ?? "leo";
  const today = format(new Date(), "yyyy-MM-dd");
  const [checkinOpen, setCheckinOpen] = useState(false);

  useEffect(() => {
    dispatch(markVisit(today));
    (async () => {
      if (!userId) return;
      const existing = await getTodayCheckin(userId, today);
      if (!existing) setCheckinOpen(true);
    })();
  }, [today, dispatch, userId]);

  const onCheckinSave = async (mood: number, energy: number, top: string) => {
    if (!userId) return;
    await saveCheckin(userId, { date: today, mood, energy, top_of_mind: top || undefined });
    setCheckinOpen(false);
    dispatch(toast({ text: "✨", type: "success" }));
  };

  const { data } = useQuery({
    queryKey: ["daily", sign, today, i18n.language],
    queryFn: () =>
      getDailyHoroscope(sign, today, i18n.language as "tr" | "en", {
        moon: profile?.moon_sign ?? null,
        rising: profile?.rising_sign ?? null,
      }),
  });

  const z = ZODIAC[sign];
  const dateStr = format(new Date(), "EEE · d MMM").toUpperCase();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <NebulaBg seed={17} />
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.header}>
            <View>
              <Text style={{ fontSize: 12, color: colors.accent, fontFamily: fonts.mono, letterSpacing: 2, marginBottom: 3 }}>
                {dateStr}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: fonts.display, fontSize: 26, color: colors.text }}>iyi günler, </Text>
                <ShimmerText
                  style={{ fontFamily: fonts.display, fontSize: 26 }}
                  width={160}
                >{`${profile?.display_name ?? "Gezgin"}.`}</ShimmerText>
              </View>
            </View>
            <Rotator duration={20000}>
              <Orb size={44} />
            </Rotator>
          </View>

          <FadeUp delay={120}>
            <GlassCard style={{ marginHorizontal: 18, marginBottom: 14 }}>
              <Text style={{ fontSize: 10, color: colors.accent, fontFamily: fonts.mono, letterSpacing: 2, marginBottom: 12 }}>
                GÜNLÜK ENERJİ
              </Text>
              <Meter label="Aşk" value={78} gradient={["#ff6b9d", "#ff9ad1"]} swatch="#ff9ad1" delay={100} />
              <Meter label="İş" value={55} gradient={["#8b5cf6", "#c4a4ff"]} swatch="#c4a4ff" delay={250} />
              <Meter label="Yaratıcılık" value={91} gradient={["#ffb347", "#ffd77a"]} swatch="#ffd77a" delay={400} />
            </GlassCard>
          </FadeUp>

          <FadeUp delay={200}>
            <GlassCard style={{ marginHorizontal: 18, marginBottom: 14 }}>
              <Text style={{ fontSize: 10, color: colors.accent, fontFamily: fonts.mono, letterSpacing: 2, marginBottom: 8 }}>
                BUGÜN SANA
              </Text>
              {data ? (
                <>
                  <Text style={{ fontFamily: fonts.displayReg, fontSize: 17, color: colors.text, lineHeight: 26 }}>
                    "{data.content}"
                  </Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12, alignItems: "center" }}>
                    <Pressable onPress={() => shareHoroscope(z.nameTr, data.content)}>
                      <Text style={{ color: colors.accent, fontSize: 12, fontFamily: fonts.displayReg }}>↗ paylaş</Text>
                    </Pressable>
                    {streak > 0 && (
                      <Text style={{ color: colors.accentGold, fontSize: 13, fontFamily: fonts.mono }}>🔥 {streak}</Text>
                    )}
                  </View>
                </>
              ) : (
                <ActivityIndicator color={colors.accent} />
              )}
            </GlassCard>
          </FadeUp>

          {data && (
            <View style={{ paddingHorizontal: 20 }}>
              <FeedbackBar contentHash={`daily:${today}:${sign}`} feature="daily" />
            </View>
          )}

          <View style={{ paddingHorizontal: 18, marginTop: 6 }}>
            <Text style={{ fontSize: 10, color: colors.accent, fontFamily: fonts.mono, letterSpacing: 2, marginBottom: 10, paddingLeft: 2 }}>
              AKTİF TRANSİTLER
            </Text>
            <View style={{
              flexDirection: "row", alignItems: "center", gap: 12,
              padding: 14, borderRadius: 18,
              backgroundColor: "rgba(255,255,255,0.04)",
              borderWidth: 1, borderColor: "rgba(196,170,255,0.15)",
            }}>
              <View style={{
                width: 36, height: 36, borderRadius: 18,
                backgroundColor: "#b0dcff",
                alignItems: "center", justifyContent: "center",
              }}>
                <Text style={{ fontSize: 18, color: "#1a0e3d" }}>☾</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.displayReg, fontSize: 15, color: colors.text }}>
                  Balık → Koç
                </Text>
                <Text style={{ fontSize: 11, color: colors.textMute, fontFamily: fonts.mono, letterSpacing: 1, marginTop: 2 }}>
                  bugün 22:14
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <CheckinSheet open={checkinOpen} onClose={() => setCheckinOpen(false)} onSave={onCheckinSave} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
