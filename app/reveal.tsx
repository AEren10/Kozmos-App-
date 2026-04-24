import { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { NebulaBg, OrbitRings, Rotator, ZodiacGlyph, Starfield } from "@/components/nebula";
import { Button } from "@/components/ui/Button";
import { useAppSelector } from "@/store";
import { ZODIAC } from "@/constants/zodiac";
import { colors, fonts } from "@/constants/theme";

type RevealItem = { labelKey: string; sym: string; accent: string; sub: string };

const REVEAL_ITEMS: RevealItem[] = [
  { labelKey: "GÜNEŞ", sym: "☉", accent: "#ffd77a", sub: "yaratıcısı, sahne ve liderlik içinde" },
  { labelKey: "AY", sym: "☽", accent: "#b0dcff", sub: "rüyalar ve his dünyasında ev yapar" },
  { labelKey: "YÜKSELEN", sym: "↑", accent: "#c4a4ff", sub: "yoğun, dönüştürücü bir yüzey" },
];

function RevealCard({
  item,
  index,
  active,
  signKey,
}: {
  item: RevealItem;
  index: number;
  active: boolean;
  signKey: string;
}) {
  const y = useSharedValue(20);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);
  const float = useSharedValue(0);

  useEffect(() => {
    if (!active) return;
    const delay = 100 + index * 220;
    y.value = withDelay(delay, withTiming(0, { duration: 700, easing: Easing.out(Easing.cubic) }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 700 }));
    scale.value = withDelay(delay, withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) }));

    const floatDur = [4000, 5000, 6000][index] ?? 4000;
    float.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: floatDur, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: floatDur, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, [active, index, y, opacity, scale, float]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: y.value }, { scale: scale.value }],
  }));

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }],
  }));

  const z = ZODIAC[signKey as keyof typeof ZODIAC];

  return (
    <Animated.View
      style={[
        styles.card,
        { borderColor: `${item.accent}44` },
        cardStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            width: 54,
            height: 54,
            borderRadius: 27,
            backgroundColor: `${item.accent}88`,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: item.accent,
            shadowOpacity: 0.7,
            shadowRadius: 20,
          },
          floatStyle,
        ]}
      >
        <LinearGradient
          colors={["#ffffff", item.accent] as any}
          start={{ x: 0.3, y: 0.3 }}
          end={{ x: 1, y: 1 }}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.9 }}
        />
        {z && <ZodiacGlyph sign={signKey} size={28} color="#1a0e3d" stroke={1.8} />}
      </Animated.View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={{ fontSize: 10, fontFamily: fonts.mono, color: item.accent, letterSpacing: 2 }}>
          {item.labelKey}
        </Text>
        <Text style={{ fontFamily: fonts.displayReg, fontSize: 22, color: "#fff", marginTop: 2 }}>
          {z ? z.nameTr : "—"}
        </Text>
        <Text style={{ fontFamily: fonts.displayReg, fontSize: 11, color: "rgba(240,235,255,0.55)", marginTop: 4, lineHeight: 16 }}>
          {item.sub}
        </Text>
      </View>
      <Text style={{ position: "absolute", top: 10, right: 14, fontSize: 22, color: item.accent, opacity: 0.35 }}>
        {item.sym}
      </Text>
    </Animated.View>
  );
}

export default function Reveal() {
  const router = useRouter();
  useTranslation();
  const profile = useAppSelector((s) => s.profile.profile);
  const [phase, setPhase] = useState<"loading" | "reveal" | "final">("loading");
  const ctaOpacity = useSharedValue(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 600);
    const t2 = setTimeout(() => {
      setPhase("final");
      ctaOpacity.value = withTiming(1, { duration: 600 });
    }, 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [ctaOpacity]);

  const ctaStyle = useAnimatedStyle(() => ({ opacity: ctaOpacity.value }));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" />
      <NebulaBg seed={9} />
      {phase !== "loading" && <Starfield seed={42} count={40} />}
      {phase !== "loading" && <Starfield seed={99} count={20} color="#ffd77a" />}

      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={{ position: "absolute", top: 80, left: 0, right: 0, alignItems: "center" }}>
          <Rotator duration={40000}>
            <OrbitRings size={320} color="rgba(196,170,255,0.2)" count={2} />
          </Rotator>
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 80, flex: 1 }}>
          <View style={{ alignItems: "center", marginBottom: 36 }}>
            <Text style={{ fontSize: 10, color: colors.accent, fontFamily: fonts.mono, letterSpacing: 4, marginBottom: 14 }}>
              ✦   HARİTANIZ HAZIR   ✦
            </Text>
            <Text style={{ fontFamily: fonts.display, fontSize: 36, color: "#fff", textAlign: "center", lineHeight: 40 }}>
              işte senin{"\n"}
              <Text style={{ color: colors.accent }}>kozmik imzan.</Text>
            </Text>
          </View>

          <View style={{ gap: 14 }}>
            <RevealCard item={REVEAL_ITEMS[0]} index={0} active={phase !== "loading"} signKey={profile?.sun_sign ?? "leo"} />
            <RevealCard item={REVEAL_ITEMS[1]} index={1} active={phase !== "loading"} signKey={profile?.moon_sign ?? ""} />
            <RevealCard item={REVEAL_ITEMS[2]} index={2} active={phase !== "loading"} signKey={profile?.rising_sign ?? ""} />
          </View>

          <View style={{ flex: 1 }} />

          {phase === "final" && (
            <Animated.View style={ctaStyle}>
              <Button onPress={() => router.replace("/paywall" as any)}>Haritamı Görüntüle ✦</Button>
            </Animated.View>
          )}
          <View style={{ height: 24 }} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderRadius: 22,
    paddingLeft: 14,
    paddingRight: 18,
    paddingVertical: 18,
  },
});
