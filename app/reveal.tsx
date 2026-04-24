import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, StatusBar, Animated, Easing } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { NebulaBg, OrbitRings, Rotator, ZodiacGlyph, Starfield } from "@/components/nebula";
import { Button } from "@/components/ui/Button";
import { useAppSelector } from "@/store";
import { ZODIAC } from "@/constants/zodiac";
import { colors, fonts } from "@/constants/theme";

const REVEAL_ITEMS = [
  { labelKey: "natal.sun", sym: "☉", accent: "#ffd77a", descKey: "Güneş ışığı seninle." },
  { labelKey: "natal.moon", sym: "☽", accent: "#b0dcff", descKey: "Duygusal derinlik." },
  { labelKey: "natal.rising", sym: "↑", accent: "#c4a4ff", descKey: "Dünyaya açılan yüzün." },
];

function RevealCard({ item, index, active, signKey }: any) {
  const y = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) return;
    Animated.parallel([
      Animated.timing(y, { toValue: 0, duration: 700, delay: 100 + index * 220, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 700, delay: 100 + index * 220, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 700, delay: 100 + index * 220, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: -4, duration: 2000 + index * 300, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 2000 + index * 300, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
  }, [active, index]);

  const z = ZODIAC[signKey as keyof typeof ZODIAC];

  return (
    <Animated.View
      style={[
        styles.card,
        { borderColor: `${item.accent}44`, opacity, transform: [{ translateY: y }, { scale }] },
      ]}
    >
      <Animated.View
        style={{
          width: 54,
          height: 54,
          borderRadius: 27,
          backgroundColor: item.accent,
          alignItems: "center",
          justifyContent: "center",
          transform: [{ translateY: float }],
          shadowColor: item.accent,
          shadowOpacity: 0.7,
          shadowRadius: 20,
        }}
      >
        {z && <ZodiacGlyph sign={signKey} size={28} color="#1a0e3d" stroke={1.8} />}
      </Animated.View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={{ fontSize: 10, fontFamily: fonts.mono, color: item.accent, letterSpacing: 2 }}>
          {item.labelKey.toUpperCase()}
        </Text>
        <Text style={{ fontFamily: fonts.displayReg, fontSize: 22, color: "#fff", marginTop: 2 }}>
          {z ? z.nameTr : "—"}
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
  const { t } = useTranslation();
  const profile = useAppSelector((s) => s.profile.profile);
  const [phase, setPhase] = useState<"loading" | "reveal">("loading");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 600);
    return () => clearTimeout(t1);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" />
      <NebulaBg seed={9} />
      {phase === "reveal" && <Starfield seed={42} count={40} />}

      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={{ position: "absolute", top: 80, left: 0, right: 0, alignItems: "center" }}>
          <Rotator duration={40000}>
            <OrbitRings size={320} color="rgba(196,170,255,0.2)" count={2} />
          </Rotator>
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 80, flex: 1 }}>
          <View style={{ alignItems: "center", marginBottom: 36 }}>
            <Text style={{ fontSize: 10, color: colors.accent, fontFamily: fonts.mono, letterSpacing: 4, marginBottom: 14 }}>
              ✦   HARİTAN HAZIR   ✦
            </Text>
            <Text style={{ fontFamily: fonts.display, fontSize: 32, color: "#fff", textAlign: "center", lineHeight: 38 }}>
              işte senin{"\n"}
              <Text style={{ color: colors.accent }}>kozmik imzan.</Text>
            </Text>
          </View>

          <View style={{ gap: 14 }}>
            <RevealCard item={REVEAL_ITEMS[0]} index={0} active={phase === "reveal"} signKey={profile?.sun_sign ?? "leo"} />
            <RevealCard
              item={REVEAL_ITEMS[1]}
              index={1}
              active={phase === "reveal"}
              signKey={profile?.moon_sign ?? ""}
            />
            <RevealCard
              item={REVEAL_ITEMS[2]}
              index={2}
              active={phase === "reveal"}
              signKey={profile?.rising_sign ?? ""}
            />
          </View>

          <View style={{ flex: 1 }} />

          <Button onPress={() => router.replace("/paywall" as any)}>Haritamı Görüntüle ✦</Button>
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
    padding: 18,
  },
});
