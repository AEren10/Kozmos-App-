import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, StatusBar } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { NebulaBg, Orb, OrbitRings, Rotator, OrbitingDot } from "@/components/nebula";
import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/store";
import { setOnboardingSeen } from "@/store/slices/streakSlice";
import { colors, fonts } from "@/constants/theme";

const SLIDES = [
  {
    title: "Haritanı Keşfet",
    desc: "Güneş, Ay, Yükselen — Üç büyük ışık seni tanımlar. Hepsini tek bakışta gör.",
    accent: "#c4a4ff",
  },
  {
    title: "Günlük Rehberlik",
    desc: "Her sabah gökyüzü sana ne söylüyor? Transitler, retrogradlar, fırsatlar.",
    accent: "#ff9ad1",
  },
  {
    title: "Kozmik Uyum",
    desc: "Sevdiklerinle haritalarınızı karşılaştır. Uyumunuzu yıldızlar anlatsın.",
    accent: "#ffd77a",
  },
];

export default function OnboardingIntro() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 3200);
    return () => clearInterval(id);
  }, []);

  const s = SLIDES[slide];

  const next = () => {
    dispatch(setOnboardingSeen(true));
    router.replace("/(auth)/birth" as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" />
      <NebulaBg seed={3} />

      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 24, paddingTop: 66 }}>
          <Pressable onPress={next}>
            <Text style={{ color: colors.textMute, fontSize: 13, fontFamily: fonts.displayReg }}>atla →</Text>
          </Pressable>
        </View>

        <View style={styles.heroArea}>
          {slide === 0 ? <ExploreIllustration /> : null}
          {slide === 1 ? <DailyIllustration /> : null}
          {slide === 2 ? <CompatIllustration /> : null}
        </View>

        <View style={styles.cardWrap}>
          <View style={styles.iconBadgeWrap}>
            <LinearGradient colors={[s.accent, `${s.accent}88`] as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconBadge}>
              <Text style={{ fontSize: 22, color: "#1a0e3d" }}>✦</Text>
            </LinearGradient>
          </View>

          <View style={styles.bottomCard}>
            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.desc}>{s.desc}</Text>

            <View style={styles.dots}>
              {SLIDES.map((_, i) => (
                <Pressable
                  key={i}
                  onPress={() => setSlide(i)}
                  style={[
                    styles.dot,
                    {
                      width: i === slide ? 24 : 8,
                      backgroundColor: i === slide ? SLIDES[i].accent : "rgba(255,255,255,0.18)",
                    },
                  ]}
                />
              ))}
            </View>

            <Button onPress={next}>Başla →</Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function ExploreIllustration() {
  return (
    <View style={{ width: 230, height: 230, alignItems: "center", justifyContent: "center" }}>
      <View style={{ position: "absolute", opacity: 0.45 }}>
        <Rotator duration={34000}>
          <OrbitRings size={218} color="rgba(196,170,255,0.14)" count={3} />
        </Rotator>
      </View>
      <View style={{ position: "absolute" }}>
        <Rotator duration={16000} reverse>
          <OrbitRings size={162} color="rgba(196,170,255,0.2)" count={1} />
        </Rotator>
        <OrbitingDot radius={81} size={7} color="#ff9ad1" duration={11000} />
      </View>
      <View style={{ position: "absolute", top: 28 }}>
        <Orb size={72} floatAmplitude={8} colorsOverride={["#fffdfd", "#dcc8ff", "#9563f6"]} />
      </View>
      <View style={styles.centerOrbWrap}>
        <Orb size={48} floatAmplitude={5} floatDuration={4200} colorsOverride={["#f7eaff", "#bf92ff", "#8355ef"]} />
      </View>
    </View>
  );
}

function DailyIllustration() {
  const float = useSharedValue(0);

  useEffect(() => {
    float.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, [float]);

  const floatStyle = useAnimatedStyle(() => ({ transform: [{ translateY: float.value }] }));

  return (
    <Animated.View style={[styles.stackWrap, floatStyle]}>
      <View style={[styles.stackCard, { left: 68, top: 62, opacity: 0.35 }]} />
      <View style={[styles.stackCard, { left: 34, top: 50, opacity: 0.55, height: 116 }]} />
      <View style={[styles.stackCard, { left: 48, top: 42, width: 178, height: 122, opacity: 1 }]}>
        <Text style={{ color: "#fff", fontFamily: fonts.display, fontSize: 18 }}>☽ ✦ ☉</Text>
      </View>
    </Animated.View>
  );
}

function CompatIllustration() {
  return (
    <View style={{ width: 240, height: 210, alignItems: "center", justifyContent: "center" }}>
      <View style={{ position: "absolute", left: 54 }}>
        <Orb size={94} colorsOverride={["#efe0ff", "#c7a3ff", "#7c43d8"]} />
      </View>
      <View style={{ position: "absolute", right: 54, top: 54 }}>
        <Orb size={84} colorsOverride={["#ffeaf3", "#ff9ad1", "#9b3f67"]} />
      </View>
      <Text style={{ color: "#fff", fontSize: 20 }}>✦</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heroArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  cardWrap: {
    position: "relative",
    paddingHorizontal: 16,
    paddingBottom: 28,
    paddingTop: 24,
  },
  iconBadgeWrap: {
    position: "absolute",
    top: -2,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 4,
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  bottomCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.18)",
    borderRadius: 28,
    padding: 28,
    paddingTop: 38,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.text,
    textAlign: "center",
    marginBottom: 10,
  },
  desc: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textDim,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 22,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 18,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  centerOrbWrap: {
    position: "absolute",
    bottom: 26,
  },
  stackWrap: {
    width: 260,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  stackCard: {
    position: "absolute",
    width: 168,
    height: 110,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
});
