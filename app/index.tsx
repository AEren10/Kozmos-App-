import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { colors } from "@/constants/theme";
import { useAppSelector } from "@/store";

export default function Index() {
  const { isAuthenticated, isHydrated } = useAppSelector((s) => s.auth);
  const onboardingComplete = useAppSelector((s) => s.profile.onboardingComplete);
  const profileSynced = useAppSelector((s) => s.profile.remoteSynced);
  const onboardingSeen = useAppSelector((s) => s.streak.onboardingSeen);
  const paywallSeen = useAppSelector((s) => s.streak.paywallSeen);

  if (!isHydrated || (isAuthenticated && !profileSynced)) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#C8A4FF" />
      </View>
    );
  }
  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;
  if (!onboardingComplete) {
    if (!onboardingSeen) return <Redirect href="/onboarding-intro" />;
    return <Redirect href="/(auth)/birth" />;
  }
  if (!paywallSeen) return <Redirect href="/paywall" />;
  return <Redirect href="/(tabs)" />;
}
