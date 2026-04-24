import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, StatusBar, Animated, Easing, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { NebulaBg, Orb, OrbitRings, Rotator, FadeUp } from "@/components/nebula";
import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/store";
import { setOnboardingSeen } from "@/store/slices/streakSlice";
import { colors, fonts } from "@/constants/theme";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    icon: "☉",
    titleKey: "intro.slide1.title",
    descKey: "intro.slide1.desc",
    accent: "#c4a4ff",
  },
  {
    icon: "☽",
    titleKey: "intro.slide2.title",
    descKey: "intro.slide2.desc",
    accent: "#b0dcff",
  },
  {
    icon: "♀",
    titleKey: "intro.slide3.title",
    descKey: "intro.slide3.desc",
    accent: "#ff9ad1",
  },
];

export default function OnboardingIntro() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 3500);
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
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 20 }}>
            <Pressable onPress={next}>
              <Text style={{ color: colors.textMute, fontSize: 13, fontFamily: fonts.displayReg }}>
                atla →
              </Text>
            </Pressable>
          </View>

          {/* Illustration slot */}
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            {slide === 0 && (
              <View style={{ width: 220, height: 220, alignItems: "center", justifyContent: "center" }}>
                <View style={{ position: "absolute" }}>
                  <Rotator duration={30000}>
                    <OrbitRings size={200} color="rgba(196,170,255,0.3)" count={3} />
                  </Rotator>
                </View>
                <Orb size={70} />
              </View>
            )}
            {slide === 1 && <CardsIllustration />}
            {slide === 2 && <SynastryIllustration />}
          </View>

          {/* Bottom card */}
          <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
            <View style={styles.bottomCard}>
              <View style={styles.iconBadge}>
                <Text style={{ fontSize: 22, color: "#fff" }}>{s.icon}</Text>
              </View>
              <Text style={[styles.title, { marginBottom: 10 }]} key={`t-${slide}`}>
                {t(s.titleKey)}
              </Text>
              <Text style={styles.desc} key={`d-${slide}`}>
                {t(s.descKey)}
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
                        backgroundColor: i === slide ? s.accent : "rgba(255,255,255,0.2)",
                      },
                    ]}
                  />
                ))}
              </View>

              <Button onPress={next}>{`${t("intro.getStarted")} →`}</Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function CardsIllustration() {
  return (
    <View style={{ width: 220, height: 180, position: "relative" }}>
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={{
            position: "absolute",
            left: 20 + i * 46,
            top: i % 2 === 0 ? 20 : 50,
            width: 88,
            height: 120,
            borderRadius: 20,
            backgroundColor: `rgba(176,220,255,${0.12 - i * 0.03})`,
            borderWidth: 1,
            borderColor: `rgba(196,170,255,${0.3 - i * 0.08})`,
            padding: 10,
            justifyContent: "flex-end",
          }}
        >
          <View style={{ width: "60%", height: 6, borderRadius: 3, backgroundColor: "rgba(196,170,255,0.4)", marginBottom: 5 }} />
          <View style={{ width: "80%", height: 4, borderRadius: 2, backgroundColor: "rgba(196,170,255,0.2)" }} />
        </View>
      ))}
    </View>
  );
}

function SynastryIllustration() {
  const float = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: -6, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
  }, [float]);
  return (
    <View style={{ width: 220, height: 180, alignItems: "center", justifyContent: "center" }}>
      <Animated.View style={{ position: "absolute", left: 30, top: 40, transform: [{ translateY: float }] }}>
        <Orb size={90} />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          right: 30,
          top: 50,
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: "#ff9ad1",
          transform: [{ translateY: float }],
          shadowColor: "#ff9ad1",
          shadowOpacity: 0.6,
          shadowRadius: 20,
        }}
      />
      <Text style={{ position: "absolute", top: 78, fontSize: 24, color: "#fff" }}>✦</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.2)",
    borderRadius: 28,
    padding: 28,
    paddingTop: 36,
  },
  iconBadge: {
    position: "absolute",
    top: -24,
    alignSelf: "center",
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#8b5cf6",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#c4a4ff",
    shadowOpacity: 0.7,
    shadowRadius: 20,
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
