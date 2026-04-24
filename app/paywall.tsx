import { useState } from "react";
import { View, Text, Pressable, StyleSheet, StatusBar, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { NebulaBg, OrbitRings, Rotator, FadeUp } from "@/components/nebula";
import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/store";
import { setPaywallSeen } from "@/store/slices/streakSlice";
import { toast } from "@/store/slices/uiSlice";
import { colors, fonts } from "@/constants/theme";

const FEATURES = [
  { icon: "♃", label: "Sınırsız soru", desc: "yıldızlara istediğin kadar sor" },
  { icon: "☿", label: "Retrograd uyarıları", desc: "günlük transit bildirimleri" },
  { icon: "♀", label: "Derin sinastri", desc: "birebir uyumluluk analizi" },
  { icon: "☽", label: "Rüya günlüğü", desc: "ay ile ilişkilendirilmiş notlar" },
];

type Plan = "yearly" | "monthly";

export default function Paywall() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [plan, setPlan] = useState<Plan>("yearly");

  const close = () => {
    dispatch(setPaywallSeen(true));
    router.replace("/(tabs)" as any);
  };

  const purchase = () => {
    dispatch(toast({ text: "Ödeme yakında (RevenueCat)", type: "info" }));
    close();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" />
      <NebulaBg seed={11} />

      <View style={{ position: "absolute", top: 80, left: 0, right: 0, alignItems: "center" }}>
        <Rotator duration={25000}>
          <OrbitRings size={320} color="rgba(196,170,255,0.18)" count={3} />
        </Rotator>
      </View>

      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20 }}>
          <Pressable onPress={close} style={styles.close}>
            <Text style={{ color: colors.textDim, fontSize: 24 }}>×</Text>
          </Pressable>

          <FadeUp delay={50} style={{ alignItems: "center" }}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>✦  KOZMOS PRO</Text>
            </View>
            <Text style={styles.hero}>
              yıldızlar seninle{"\n"}
              <Text style={{ color: colors.accent }}>her zaman konuşsun.</Text>
            </Text>
            <Text style={{ fontSize: 13, color: colors.textDim, textAlign: "center", marginTop: 10, lineHeight: 20 }}>
              tam deneyim için kozmos pro'ya geç.
            </Text>
          </FadeUp>

          <View style={{ marginTop: 24 }}>
            {FEATURES.map((f, i) => (
              <FadeUp key={i} delay={i * 90}>
                <View style={styles.feature}>
                  <View style={styles.featIcon}>
                    <Text style={{ fontSize: 18, color: colors.accent }}>{f.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: "500", color: colors.text }}>{f.label}</Text>
                    <Text style={{ fontSize: 12, color: colors.textMute, marginTop: 2 }}>{f.desc}</Text>
                  </View>
                  <Text style={{ color: colors.accent, fontSize: 14 }}>✓</Text>
                </View>
              </FadeUp>
            ))}
          </View>

          <View style={{ flexDirection: "row", gap: 10, marginTop: 24 }}>
            <PlanOption id="yearly" label="Yıllık" price="₺29/ay" badge="%50 indirim" selected={plan === "yearly"} onPress={() => setPlan("yearly")} />
            <PlanOption id="monthly" label="Aylık" price="₺59/ay" selected={plan === "monthly"} onPress={() => setPlan("monthly")} />
          </View>

          <View style={{ flex: 1 }} />

          <FadeUp delay={350} style={{ marginTop: 24 }}>
            <Button onPress={purchase}>7 Gün Ücretsiz Dene ✦</Button>
            <Text style={{ textAlign: "center", fontSize: 11, color: colors.textMute, marginTop: 10, fontFamily: fonts.mono }}>
              istediğin zaman iptal edebilirsin
            </Text>
            <Pressable onPress={close} style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={{ fontSize: 13, color: colors.textMute }}>şimdilik devam et →</Text>
            </Pressable>
          </FadeUp>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function PlanOption({ label, price, badge, selected, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.plan,
        {
          borderColor: selected ? colors.accent : "rgba(196,170,255,0.15)",
          backgroundColor: selected ? "rgba(196,170,255,0.12)" : "rgba(255,255,255,0.04)",
        },
      ]}
    >
      {badge && (
        <View style={styles.planBadge}>
          <Text style={styles.planBadgeText}>{badge}</Text>
        </View>
      )}
      <Text style={{ fontSize: 12, color: colors.textDim, marginBottom: 4 }}>{label}</Text>
      <Text style={{ fontSize: 18, fontWeight: "700", color: selected ? colors.text : colors.textDim }}>{price}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  close: { position: "absolute", top: 8, right: 12, width: 36, height: 36, alignItems: "center", justifyContent: "center", zIndex: 10 },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: "#c4a4ff",
    marginBottom: 18,
  },
  badgeText: { fontSize: 11, fontFamily: fonts.mono, color: "#1a0e3d", fontWeight: "700", letterSpacing: 2 },
  hero: {
    fontFamily: fonts.display,
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
    lineHeight: 36,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(196,170,255,0.08)",
  },
  featIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(196,170,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  plan: {
    flex: 1,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: "center",
    position: "relative",
  },
  planBadge: {
    position: "absolute",
    top: -10,
    backgroundColor: "#ff9ad1",
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  planBadgeText: { fontSize: 9, fontFamily: fonts.mono, color: "#1a0e3d", fontWeight: "700", letterSpacing: 1 },
});
