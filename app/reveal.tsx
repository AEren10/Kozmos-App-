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
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { NebulaBg, OrbitRings, Rotator, ZodiacGlyph, Starfield } from "@/components/nebula";
import { Button } from "@/components/ui/Button";
import { useAppSelector } from "@/store";
import { ZODIAC } from "@/constants/zodiac";
import { colors, fonts } from "@/constants/theme";

type RevealItem = {
  label: string;
  accent: string;
  signKey: keyof typeof ZODIAC | "";
  description: string;
};

function RevealCard({ item, index, active }: { item: RevealItem; index: number; active: boolean }) {
  const y = useSharedValue(26);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.96);
  const orbFloat = useSharedValue(0);
  const sign = item.signKey ? ZODIAC[item.signKey] : null;

  useEffect(() => {
    if (!active) return;
    const delay = 120 + index * 180;
    y.value = withDelay(delay, withTiming(0, { duration: 640, easing: Easing.out(Easing.cubic) }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 520 }));
    scale.value = withDelay(delay, withTiming(1, { duration: 640, easing: Easing.out(Easing.cubic) }));
    orbFloat.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: 2200 + index * 400, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 2200 + index * 400, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, [active, index, opacity, orbFloat, scale, y]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: y.value }, { scale: scale.value }],
  }));

  const orbStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: orbFloat.value }],
  }));

  return (
    <Animated.View style={[styles.card, { borderColor: `${item.accent}40` }, cardStyle]}>
      <Animated.View style={[styles.cardOrb, { shadowColor: item.accent }, orbStyle]}>
        <View style={[styles.cardOrbFill, { backgroundColor: item.accent }]}>
          {sign ? <ZodiacGlyph sign={item.signKey} size={24} color="#1a0e3d" stroke={1.8} /> : null}
        </View>
      </Animated.View>

      <View style={{ flex: 1, marginLeft: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
          <Text style={[styles.label, { color: item.accent }]}>{item.label}</Text>
          <Text style={styles.signName}>{sign?.nameTr ?? "—"}</Text>
        </View>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </Animated.View>
  );
}

export default function Reveal() {
  const router = useRouter();
  const profile = useAppSelector((s) => s.profile.profile);
  const [active, setActive] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const ctaOpacity = useSharedValue(0);

  useEffect(() => {
    const t1 = setTimeout(() => setActive(true), 350);
    const t2 = setTimeout(() => {
      setShowCta(true);
      ctaOpacity.value = withTiming(1, { duration: 520 });
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [ctaOpacity]);

  const ctaStyle = useAnimatedStyle(() => ({ opacity: ctaOpacity.value }));

  const items: RevealItem[] = [
    {
      label: "GÜNEŞ",
      accent: "#ffd77a",
      signKey: (profile?.sun_sign as keyof typeof ZODIAC) ?? "leo",
      description: "parasalda, adına ne istiyorsan elde etmek için",
    },
    {
      label: "AY",
      accent: "#b0dcff",
      signKey: (profile?.moon_sign as keyof typeof ZODIAC) ?? "pisces",
      description: "rüyalar ve iç dünyasında ne yapar",
    },
    {
      label: "YÜKSELEN",
      accent: "#c4a4ff",
      signKey: (profile?.rising_sign as keyof typeof ZODIAC) ?? "scorpio",
      description: "yoğun, dönüştürücü bir yılan",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" />
      <NebulaBg seed={9} />
      {active ? <Starfield seed={42} count={40} /> : null}
      {active ? <Starfield seed={99} count={18} color="#ffd77a" /> : null}

      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.ringsWrap}>
          <Rotator duration={40000}>
            <OrbitRings size={320} color="rgba(196,170,255,0.16)" count={2} />
          </Rotator>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.kicker}>✦ HARİTANIZ HAZIR ✦</Text>
            <Text style={styles.title}>
              işte senin{"\n"}
              <Text style={{ color: colors.accent }}>kozmik imzan.</Text>
            </Text>
          </View>

          <View style={{ gap: 14 }}>
            {items.map((item, index) => (
              <RevealCard key={item.label} item={item} index={index} active={active} />
            ))}
          </View>

          <View style={{ flex: 1 }} />

          {showCta ? (
            <Animated.View style={ctaStyle}>
              <Button onPress={() => router.replace("/paywall" as any)}>Haritamı Görüntüle ✦</Button>
            </Animated.View>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  ringsWrap: {
    position: "absolute",
    top: 88,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 34,
  },
  kicker: {
    fontSize: 10,
    color: colors.accent,
    fontFamily: fonts.mono,
    letterSpacing: 3,
    marginBottom: 14,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 34,
    color: "#fff",
    textAlign: "center",
    lineHeight: 38,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderRadius: 24,
    paddingLeft: 14,
    paddingRight: 18,
    paddingVertical: 18,
  },
  cardOrb: {
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowOpacity: 0.42,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
  },
  cardOrbFill: {
    flex: 1,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  label: {
    fontSize: 10,
    fontFamily: fonts.mono,
    letterSpacing: 2,
  },
  signName: {
    fontFamily: fonts.displayReg,
    fontSize: 24,
    color: "#fff",
  },
  cardDescription: {
    fontFamily: fonts.displayReg,
    fontSize: 12,
    color: "rgba(240,235,255,0.58)",
    lineHeight: 18,
  },
});
