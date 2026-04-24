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

  const tintColors = [`${s.accent}22`, "transparent"] as const;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" />
      <NebulaBg seed={3} />
      <LinearGradient
        colors={tintColors as any}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 24, paddingTop: 66 }}>
            <Pressable onPress={next}>
              <Text style={{ color: colors.textMute, fontSize: 13, fontFamily: fonts.displayReg }}>
                atla →
              </Text>
            </Pressable>
          </View>

          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            {slide === 0 && <ExploreIllustration />}
            {slide === 1 && <DailyIllustration />}
            {slide === 2 && <CompatIllustration />}
          </View>

          <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
            <View style={styles.cardWrap}>
              <View style={[styles.iconBadgeWrap]}>
                <LinearGradient
                  colors={[s.accent, `${s.accent}88`] as any}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconBadge}
                >
                  <Text style={{ fontSize: 22, color: "#1a0e3d" }}>✦</Text>
                </LinearGradient>
              </View>

              <View style={styles.bottomCard}>
                <Text style={[styles.title, { marginBottom: 10 }]} key={`t-${slide}`}>
                  {s.title}
                </Text>
                <Text style={styles.desc} key={`d-${slide}`}>
                  {s.desc}
                </Text>

                <View style={styles.dots}>
                  {SLIDES.map((_, i) => (
                    <Pressable
                      key={i}
                      onPress={() => setSlide(i)}
                      style={[
                        styles.dot,
                        {
                          width: i === slide ? 24 : 8,
                          backgroundColor: i === slide ? SLIDES[i].accent : "rgba(255,255,255,0.2)",
                        },
                        i === slide
                          ? {
                              shadowColor: SLIDES[i].accent,
                              shadowOpacity: 1,
                              shadowRadius: 10,
                              shadowOffset: { width: 0, height: 0 },
                            }
                          : null,
                      ]}
                    />
                  ))}
                </View>

                <Button onPress={next}>Başla →</Button>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function ExploreIllustration() {
  return (
    <View style={{ width: 220, height: 220, alignItems: "center", justifyContent: "center" }}>
      <View style={{ position: "absolute" }}>
        <Rotator duration={30000}>
          <OrbitRings size={200} color="rgba(196,170,255,0.25)" count={2} />
        </Rotator>
      </View>
      <View style={{ position: "absolute" }}>
        <Rotator duration={14000} reverse>
          <OrbitRings size={160} color="rgba(255,154,209,0.2)" count={1} />
        </Rotator>
      </View>
      <OrbitingDot radius={88} size={4} color="#ff9ad1" duration={10000} />
      <Orb size={70} />
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
    <Animated.View style={[{ width: 260, height: 220, alignItems: "center", justifyContent: "center" }, floatStyle]}>
      {/* Stacked 3 card-tiles with rotateX perspective simulation (via scaleY) */}
      <View
        style={{
          position: "absolute",
          width: 160,
          height: 110,
          borderRadius: 18,
          backgroundColor: "rgba(255,154,209,0.2)",
          borderWidth: 1,
          borderColor: "rgba(255,154,209,0.35)",
          opacity: 0.35,
          left: 70,
          top: 60,
          transform: [{ scaleY: 0.96 }],
        }}
      />
      <View
        style={{
          position: "absolute",
          width: 170,
          height: 115,
          borderRadius: 20,
          backgroundColor: "rgba(196,170,255,0.2)",
          borderWidth: 1,
          borderColor: "rgba(196,170,255,0.35)",
          opacity: 0.55,
          left: 20,
          top: 55,
          transform: [{ scaleY: 0.97 }],
        }}
      />
      <View
        style={{
          position: "absolute",
          width: 180,
          height: 120,
          borderRadius: 22,
          backgroundColor: "rgba(255,255,255,0.08)",
          borderWidth: 1,
          borderColor: "rgba(196,170,255,0.45)",
          opacity: 1,
          left: 45,
          top: 50,
          transform: [{ scaleY: 0.98 }],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontFamily: fonts.display, fontSize: 20 }}>☽ ✦ ☉</Text>
      </View>
    </Animated.View>
  );
}

function CompatIllustration() {
  return (
    <View style={{ width: 260, height: 220, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: -24 }}>
      <Orb size={100} />
      <Orb size={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrap: { position: "relative", paddingTop: 26 },
  iconBadgeWrap: {
    position: "absolute",
    top: -26,
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
  },
  bottomCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.25)",
    borderRadius: 28,
    padding: 28,
    paddingTop: 38,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.text,
    textAlign: "center",
  },
  desc: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textDim,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  dots: { flexDirection: "row", justifyContent: "center", gap: 8, marginBottom: 20 },
  dot: { height: 8, borderRadius: 4 },
});
