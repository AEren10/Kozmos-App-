import { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Animated, Easing, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { NebulaBg, Orb, Rotator, OrbitRings, GlassCard, FadeUp } from "@/components/nebula";
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

function Meter({ label, value, color, delay = 0 }: { label: string; value: number; color: string; delay?: number }) {
  const width = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(width, { toValue: value, duration: 900, delay, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [delay, value, width]);

  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
        <Text style={{ fontSize: 12, color: colors.textDim }}>{label}</Text>
        <Text style={{ fontSize: 12, color, fontFamily: fonts.mono }}>{value}%</Text>
      </View>
      <View style={{ height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
        <Animated.View
          style={{
            height: "100%",
            borderRadius: 3,
            backgroundColor: color,
            width: width.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }),
          }}
        />
      </View>
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
              <Text style={{ fontFamily: fonts.display, fontSize: 26, color: colors.text }}>
                iyi günler,{" "}
                <Text style={{ color: colors.accent }}>{profile?.display_name ?? "Gezgin"}.</Text>
              </Text>
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
              <Meter label="Aşk" value={78} color="#ff9ad1" delay={100} />
              <Meter label="İş" value={55} color="#c4a4ff" delay={250} />
              <Meter label="Yaratıcılık" value={91} color="#ffd77a" delay={400} />
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
