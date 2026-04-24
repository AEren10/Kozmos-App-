// Birebir port: kozmosgenel/src/screens-main.jsx — ScreenCompat
import { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from "react-native-svg";
import { useTranslation } from "react-i18next";
import { NebulaBg, GlassCard, FadeUp } from "@/components/nebula";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DateField } from "@/components/forms/DateField";
import { FeedbackBar } from "@/components/ui/FeedbackBar";
import { useAppDispatch, useAppSelector } from "@/store";
import { toast } from "@/store/slices/uiSlice";
import { computeSynastry } from "@/lib/api/synastry";
import { createPartnerInviteLink, sharePartnerInvite } from "@/lib/share";
import { sunSignFromISO } from "@/lib/astro/sunSign";
import { ZODIAC } from "@/constants/zodiac";
import type { SynastryResult } from "@/types";
import { colors, fonts } from "@/constants/theme";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const CIRC = 2 * Math.PI * 46;

function ScoreRing({ score }: { score: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(score, { duration: 1400, easing: Easing.out(Easing.cubic) });
  }, [progress, score]);

  const circleProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRC - (CIRC * progress.value) / 100,
  }));

  return (
    <View style={{ position: "relative", width: 104, height: 104 }}>
      <Svg width={104} height={104} viewBox="0 0 104 104">
        <Defs>
          <SvgLinearGradient id="compat-grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#c4a4ff" />
            <Stop offset="1" stopColor="#ff9ad1" />
          </SvgLinearGradient>
        </Defs>
        <Circle cx={52} cy={52} r={46} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={4} />
        <AnimatedCircle
          cx={52}
          cy={52}
          r={46}
          fill="none"
          stroke="url(#compat-grad)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          transform="rotate(-90 52 52)"
          animatedProps={circleProps}
        />
      </Svg>
      <View style={StyleSheet.absoluteFillObject}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontFamily: fonts.mono, fontSize: 16, fontWeight: "700", color: colors.accent }}>{score}%</Text>
        </View>
      </View>
    </View>
  );
}

function PersonCard({ letter, name, sign, color, side }: { letter: string; name: string; sign: string; color: string; side: "left" | "right" }) {
  return (
    <View
      style={[
        styles.person,
        side === "left"
          ? { borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0 }
          : { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0 },
        { borderColor: `${color}44`, backgroundColor: `${color}14` },
      ]}
    >
      <View style={[styles.avatar, { backgroundColor: color }]}>
        <Text style={{ fontFamily: fonts.displayReg, fontSize: 18, color: "#1a0e3d" }}>{letter}</Text>
      </View>
      <Text style={{ fontSize: 13, fontWeight: "500", color: colors.text, marginTop: 2 }}>{name}</Text>
      <Text style={{ fontSize: 10, color, fontFamily: fonts.mono, letterSpacing: 1, marginTop: 3 }}>{sign}</Text>
    </View>
  );
}

function AspectRow({
  label,
  score,
  color,
  desc,
  delay,
}: {
  label: string;
  score: number;
  color: string;
  desc: string;
  delay: number;
}) {
  const w = useSharedValue(0);
  useEffect(() => {
    w.value = withDelay(delay, withTiming(score, { duration: 800, easing: Easing.out(Easing.cubic) }));
  }, [delay, score, w]);
  const fillStyle = useAnimatedStyle(() => ({ width: `${w.value}%` }));
  return (
    <View style={styles.aspectRow}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 13, fontWeight: "500", color: colors.text, marginBottom: 2 }}>{label}</Text>
        <Text style={{ fontSize: 11, color: colors.textMute, fontFamily: fonts.displayReg }}>{desc}</Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ fontSize: 15, fontWeight: "700", color, fontFamily: fonts.mono }}>{score}</Text>
        <View style={{ width: 50, height: 4, borderRadius: 2, marginTop: 5, backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <Animated.View style={[{ height: "100%", backgroundColor: color }, fillStyle]} />
        </View>
      </View>
    </View>
  );
}

export default function CompatTab() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((s) => s.profile.profile);
  const [partnerName, setPartnerName] = useState("");
  const [partnerDate, setPartnerDate] = useState<Date | null>(null);
  const [result, setResult] = useState<SynastryResult | null>(null);
  const [loading, setLoading] = useState(false);

  const onAnalyze = async () => {
    if (!profile?.birth_date) return dispatch(toast({ text: "Önce profilini tamamla", type: "error" }));
    if (!partnerDate) return dispatch(toast({ text: "Partner tarihi gerekli", type: "error" }));
    setLoading(true);
    try {
      const r = await computeSynastry(
        { birth_date: profile.birth_date, birth_time: profile.birth_time ?? undefined, name: profile.display_name ?? "Sen" },
        { birth_date: partnerDate.toISOString().split("T")[0], name: partnerName || "Partner" },
        i18n.language as "tr" | "en",
      );
      setResult(r);
    } catch (e: any) {
      dispatch(toast({ text: e.message ?? "Hata", type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  const onInvite = () => {
    if (!profile?.birth_date) return;
    const link = createPartnerInviteLink(profile.birth_date, profile.display_name ?? undefined);
    sharePartnerInvite(link);
  };

  const mySign = profile?.sun_sign ? ZODIAC[profile.sun_sign] : null;
  const partnerSign = partnerDate ? ZODIAC[sunSignFromISO(partnerDate.toISOString().split("T")[0])] : null;

  const myInitial = (profile?.display_name ?? "?").charAt(0).toUpperCase();
  const partnerInitial = (partnerName || "?").charAt(0).toUpperCase();

  const aspects = result
    ? [
        { label: "Güneş ☌ Ay", score: 92, color: "#ffd77a", desc: "derin duygusal bağ" },
        { label: "Venüs △ Jüpiter", score: 88, color: "#ff9ad1", desc: "şanslı, neşeli ilişki" },
        { label: "Mars □ Satürn", score: 42, color: "#c4a4ff", desc: "sürtüşme, sabır gerek" },
        { label: "Ay △ Venüs", score: 95, color: "#b0dcff", desc: "şiirsel uyum" },
      ]
    : [];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <NebulaBg seed={23} />

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <FadeUp delay={0} style={{ paddingHorizontal: 22, paddingTop: 14 }}>
            <Text style={{ fontSize: 10, color: colors.accent, fontFamily: fonts.mono, letterSpacing: 2 }}>SİNASTRİ</Text>
            <Text style={{ fontFamily: fonts.display, fontSize: 24, color: colors.text, marginTop: 4 }}>
              kozmik <Text style={{ color: "#ff9ad1" }}>uyum haritası</Text>
            </Text>
          </FadeUp>

          {/* Partner form */}
          {!result && (
            <FadeUp delay={100} style={{ paddingHorizontal: 18, marginTop: 20 }}>
              <GlassCard>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <Text style={{ fontSize: 10, color: colors.accent, fontFamily: fonts.mono, letterSpacing: 2 }}>
                    PARTNER
                  </Text>
                  <Pressable onPress={onInvite}>
                    <Text style={{ color: colors.accent, fontSize: 12, fontFamily: fonts.displayReg }}>↗ davet gönder</Text>
                  </Pressable>
                </View>
                <Input placeholder="İsim" value={partnerName} onChangeText={setPartnerName} />
                <DateField label="Doğum tarihi" mode="date" value={partnerDate} onChange={setPartnerDate} />
                <Button onPress={onAnalyze} loading={loading}>Uyumu Hesapla ✦</Button>
              </GlassCard>
            </FadeUp>
          )}

          {loading && <ActivityIndicator color={colors.accent} style={{ marginTop: 20 }} />}

          {result && (
            <>
              {/* Two person cards + score */}
              <FadeUp delay={100} style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <PersonCard
                    letter={myInitial}
                    name={profile?.display_name ?? "Sen"}
                    sign={`☉ ${(mySign?.nameTr ?? "—").toUpperCase()}`}
                    color="#c4a4ff"
                    side="left"
                  />
                  <View style={{ zIndex: 5, alignItems: "center", width: 80 }}>
                    <ScoreRing score={result.score} />
                    <Text style={{ fontSize: 10, color: colors.textMute, fontFamily: fonts.mono, marginTop: 4, letterSpacing: 1 }}>UYUM</Text>
                  </View>
                  <PersonCard
                    letter={partnerInitial}
                    name={partnerName || "Partner"}
                    sign={`☉ ${(partnerSign?.nameTr ?? "—").toUpperCase()}`}
                    color="#ff9ad1"
                    side="right"
                  />
                </View>
              </FadeUp>

              {/* Summary */}
              <FadeUp delay={180} style={{ paddingHorizontal: 20, marginTop: 16 }}>
                <GlassCard>
                  <Text style={{ fontFamily: fonts.displayReg, fontSize: 15, color: colors.text, lineHeight: 24 }}>
                    "{result.summary}"
                  </Text>
                </GlassCard>
              </FadeUp>

              {/* Aspects */}
              <View style={{ paddingHorizontal: 18, marginTop: 20 }}>
                <Text style={{ fontSize: 10, color: colors.accent, fontFamily: fonts.mono, letterSpacing: 2, marginBottom: 10, paddingLeft: 2 }}>
                  ANA ASPEKTLER
                </Text>
                {aspects.map((a, i) => (
                  <AspectRow key={i} {...a} delay={i * 120} />
                ))}
              </View>

              <View style={{ paddingHorizontal: 20, marginTop: 12 }}>
                <FeedbackBar contentHash={`synastry:${result.fingerprint}`} feature="synastry" />
              </View>

              <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
                <Button variant="secondary" onPress={() => setResult(null)}>Başka Biriyle Dene</Button>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  person: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  aspectRow: {
    marginBottom: 10,
    height: 56,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.15)",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
