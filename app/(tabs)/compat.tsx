import { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { NebulaBg } from "@/components/nebula";
import { colors, fonts } from "@/constants/theme";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const CIRC = 2 * Math.PI * 30;

const ASPECTS = [
  { label: "Güneş ☌ Ay", desc: "derin duygusal bağ", score: 92, color: "#ffd77a" },
  { label: "Venüs △ Jüpiter", desc: "şanslı, neşeli ilişki", score: 88, color: "#ff9ad1" },
];

function ScoreRing({ score }: { score: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(score, { duration: 1300, easing: Easing.out(Easing.cubic) });
  }, [progress, score]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRC - (CIRC * progress.value) / 100,
  }));

  return (
    <View style={{ width: 72, height: 72 }}>
      <Svg width={72} height={72} viewBox="0 0 72 72">
        <Defs>
          <SvgLinearGradient id="compat-grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#c4a4ff" />
            <Stop offset="1" stopColor="#ff9ad1" />
          </SvgLinearGradient>
        </Defs>
        <Circle cx={36} cy={36} r={30} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={4} />
        <AnimatedCircle
          cx={36}
          cy={36}
          r={30}
          fill="none"
          stroke="url(#compat-grad)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          transform="rotate(-90 36 36)"
          animatedProps={animatedProps}
        />
      </Svg>
      <View style={StyleSheet.absoluteFillObject}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.scoreText}>{score}%</Text>
        </View>
      </View>
    </View>
  );
}

export default function CompatTab() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <NebulaBg seed={23} />

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.kicker}>SİNASTRİ</Text>
          <Text style={styles.title}>
            kozmik <Text style={{ color: "#ff9ad1" }}>uyum haritası</Text>
          </Text>

          <View style={styles.heroCard}>
            <PersonCard letter="E" name="Ela" sign="ASLAN" color="#c4a4ff" side="left" />
            <View style={styles.scoreWrap}>
              <ScoreRing score={87} />
              <Text style={styles.scoreLabel}>UYUM</Text>
            </View>
            <PersonCard letter="K" name="Kaan" sign="BOĞA" color="#ff9ad1" side="right" />
          </View>

          <View style={styles.quoteCard}>
            <Text style={styles.quoteText}>
              "Güneş-Ay birleşimi derin bir ruhsal bağa işaret ediyor. Farklı Mars enerjileri ise büyümeye alan açıyor."
            </Text>
          </View>

          <Text style={[styles.kicker, { marginTop: 18, marginBottom: 10, paddingHorizontal: 2 }]}>ANA ASPEKTLER</Text>
          {ASPECTS.map((item) => (
            <View key={item.label} style={styles.aspectRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.aspectTitle}>{item.label}</Text>
                <Text style={styles.aspectDesc}>{item.desc}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={[styles.aspectScore, { color: item.color }]}>{item.score}</Text>
                <View style={styles.aspectTrack}>
                  <View style={[styles.aspectFill, { width: `${item.score}%`, backgroundColor: item.color }]} />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function PersonCard({
  letter,
  name,
  sign,
  color,
  side,
}: {
  letter: string;
  name: string;
  sign: string;
  color: string;
  side: "left" | "right";
}) {
  return (
    <View
      style={[
        styles.personCard,
        side === "left"
          ? { borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0 }
          : { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0 },
        { borderColor: `${color}44`, backgroundColor: `${color}12` },
      ]}
    >
      <View style={[styles.personAvatar, { backgroundColor: color }]}>
        <Text style={styles.personLetter}>{letter}</Text>
      </View>
      <Text style={styles.personName}>{name}</Text>
      <Text style={[styles.personSign, { color }]}>{`☉ ${sign}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 90,
  },
  kicker: {
    fontSize: 10,
    color: colors.accent,
    fontFamily: fonts.mono,
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: colors.text,
  },
  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  scoreWrap: {
    width: 82,
    alignItems: "center",
    zIndex: 5,
  },
  scoreText: {
    fontFamily: fonts.mono,
    fontSize: 16,
    color: colors.accent,
    fontWeight: "700",
  },
  scoreLabel: {
    fontSize: 10,
    color: "rgba(240,235,255,0.5)",
    fontFamily: fonts.mono,
    letterSpacing: 1,
    marginTop: 4,
  },
  personCard: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
  },
  personAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  personLetter: {
    fontFamily: fonts.displayReg,
    fontSize: 18,
    color: "#1a0e3d",
  },
  personName: {
    fontSize: 13,
    color: colors.text,
    fontWeight: "500",
  },
  personSign: {
    fontSize: 10,
    fontFamily: fonts.mono,
    letterSpacing: 1,
    marginTop: 3,
  },
  quoteCard: {
    marginTop: 16,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.14)",
  },
  quoteText: {
    fontFamily: fonts.displayReg,
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
  },
  aspectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.14)",
    marginBottom: 10,
  },
  aspectTitle: {
    fontSize: 13,
    color: colors.text,
    fontWeight: "500",
    marginBottom: 2,
  },
  aspectDesc: {
    fontSize: 11,
    color: "rgba(240,235,255,0.5)",
    fontFamily: fonts.displayReg,
  },
  aspectScore: {
    fontSize: 15,
    fontFamily: fonts.mono,
    fontWeight: "700",
  },
  aspectTrack: {
    width: 50,
    height: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    marginTop: 5,
  },
  aspectFill: {
    height: "100%",
    borderRadius: 999,
  },
});
