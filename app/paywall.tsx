import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, StatusBar, ScrollView } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { NebulaBg, OrbitRings, Rotator, FadeUp, Starfield } from "@/components/nebula";
import { Button } from "@/components/ui/Button";
import { PlanCard } from "@/components/paywall/PlanCard";
import { FeatureList, type Feature } from "@/components/paywall/FeatureList";
import { PaywallFooter } from "@/components/paywall/PaywallFooter";
import { purchasePlan, restorePurchases, isPurchasesConfigured } from "@/lib/purchases";
import { useAppDispatch } from "@/store";
import { setPaywallSeen } from "@/store/slices/streakSlice";
import { toast } from "@/store/slices/uiSlice";
import { colors, fonts } from "@/constants/theme";
import { gradients } from "@/constants/designTokens";

const FEATURES: Feature[] = [
  { icon: "♃", label: "Sınırsız soru", desc: "yıldızlara istediğin kadar sor" },
  { icon: "☿", label: "Retrograd uyarıları", desc: "günlük transit bildirimleri" },
  { icon: "♀", label: "Derin sinastri", desc: "birebir uyumluluk analizi" },
  { icon: "☽", label: "Rüya günlüğü", desc: "ay ile ilişkilendirilmiş notlar" },
];

const PRIVACY_URL = "https://kozmos.app/privacy";
const TERMS_URL = "https://kozmos.app/terms";

type Plan = "yearly" | "monthly";

export default function Paywall() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [plan, setPlan] = useState<Plan>("yearly");
  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const glow = useSharedValue(0.3);
  useEffect(() => {
    glow.value = withRepeat(
      withSequence(withTiming(0.7, { duration: 1500 }), withTiming(0.3, { duration: 1500 })),
      -1,
      false,
    );
  }, [glow]);
  const ctaGlowStyle = useAnimatedStyle(() => ({ shadowOpacity: glow.value }));

  const close = () => {
    dispatch(setPaywallSeen(true));
    router.replace("/(tabs)" as never);
  };

  const onPurchase = async () => {
    if (purchasing) return;
    if (!isPurchasesConfigured()) {
      dispatch(toast({ text: "Ödeme yakında (RevenueCat)", type: "info" }));
      close();
      return;
    }
    setPurchasing(true);
    try {
      await purchasePlan(plan);
      dispatch(toast({ text: t("paywall.purchaseSuccess"), type: "success" }));
      close();
    } catch (e) {
      const err = e as { userCancelled?: boolean; message?: string };
      if (err?.userCancelled) return;
      dispatch(toast({ text: err?.message ?? t("errors.networkError"), type: "error" }));
    } finally {
      setPurchasing(false);
    }
  };

  const onRestore = async () => {
    if (restoring) return;
    setRestoring(true);
    try {
      if (!isPurchasesConfigured()) {
        dispatch(toast({ text: t("paywall.restoreSoon"), type: "info" }));
        return;
      }
      await restorePurchases();
      dispatch(toast({ text: t("paywall.restoreSuccess"), type: "success" }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : t("errors.networkError");
      dispatch(toast({ text: msg, type: "error" }));
    } finally {
      setRestoring(false);
    }
  };

  const trialNote = `7 gün ücretsiz deneme · sonra ${plan === "yearly" ? "₺349/yıl" : "₺59/ay"}`;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" />
      <NebulaBg seed={11} />
      <LinearGradient
        colors={["#4a1570", "#1a0e3d", "#0d0820"] as any}
        locations={[0, 0.4, 0.8]}
        start={{ x: 0.5, y: -0.1 }}
        end={{ x: 0.5, y: 0.8 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <Starfield seed={77} count={60} />

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
            <LinearGradient
              colors={gradients.badge as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.badge}
            >
              <Text style={styles.badgeText}>✦  KOZMOS PRO</Text>
            </LinearGradient>
            <Text style={styles.hero}>
              yıldızlar seninle{"\n"}
              <Text style={{ color: colors.accent }}>her zaman konuşsun.</Text>
            </Text>
            <Text style={{ fontSize: 13, color: colors.textDim, textAlign: "center", marginTop: 10, lineHeight: 20 }}>
              tam deneyim için kozmos pro'ya geç.
            </Text>
          </FadeUp>

          <FeatureList features={FEATURES} />

          <View style={{ flexDirection: "row", gap: 10, marginTop: 24 }}>
            <PlanCard
              label="Yıllık"
              price="₺29/ay"
              badge="%50 indirim"
              selected={plan === "yearly"}
              onPress={() => setPlan("yearly")}
            />
            <PlanCard
              label="Aylık"
              price="₺59/ay"
              sub="aylık yenilenir"
              selected={plan === "monthly"}
              onPress={() => setPlan("monthly")}
            />
          </View>

          <View style={{ flex: 1 }} />

          <FadeUp delay={350} style={{ marginTop: 24 }}>
            <Animated.View
              style={[
                {
                  borderRadius: 27,
                  shadowColor: "#c4a4ff",
                  shadowRadius: 24,
                  shadowOffset: { width: 0, height: 0 },
                },
                ctaGlowStyle,
              ]}
            >
              <Button onPress={onPurchase} loading={purchasing}>7 Gün Ücretsiz Dene ✦</Button>
            </Animated.View>

            <PaywallFooter
              onRestore={onRestore}
              restoring={restoring}
              privacyUrl={PRIVACY_URL}
              termsUrl={TERMS_URL}
              trialNote={trialNote}
              onClose={close}
            />
          </FadeUp>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  close: { position: "absolute", top: 8, right: 12, width: 36, height: 36, alignItems: "center", justifyContent: "center", zIndex: 10 },
  badge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 99, marginBottom: 18 },
  badgeText: { fontSize: 11, fontFamily: fonts.mono, color: "#1a0e3d", fontWeight: "700", letterSpacing: 2 },
  hero: { fontFamily: fonts.display, fontSize: 32, color: "#fff", textAlign: "center", lineHeight: 38 },
});
