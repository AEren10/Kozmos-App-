import "../global.css";
import "@/lib/i18n";
import { useEffect } from "react";
import { View } from "react-native";
import { Stack, SplashScreen, useRouter, useSegments } from "expo-router";
import { useFonts } from "@/hooks/useFonts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";

import { store, persistor, useAppSelector } from "@/store";
import { useAuthBootstrap } from "@/hooks/useAuth";
import { usePushBootstrap } from "@/hooks/usePushToken";
import { ToastHost } from "@/components/ui/Toast";
import { setLanguage } from "@/lib/i18n";

SplashScreen.preventAutoHideAsync().catch(() => {});

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
});

function AuthGate() {
  const router = useRouter();
  const segments = useSegments();
  const first = (segments[0] as string | undefined) ?? "";
  const { isAuthenticated, isHydrated } = useAppSelector((s) => s.auth);
  const onboardingComplete = useAppSelector((s) => s.profile.onboardingComplete);
  const profileSynced = useAppSelector((s) => s.profile.remoteSynced);
  const onboardingSeen = useAppSelector((s) => s.streak.onboardingSeen);
  const paywallSeen = useAppSelector((s) => s.streak.paywallSeen);
  const lang = useAppSelector((s) => s.ui.lang);

  useEffect(() => {
    setLanguage(lang);
  }, [lang]);

  useEffect(() => {
    if (!isHydrated) return;
    // Oturum açık ise profil DB'den gelmeden yönlendirme yapma;
    // aksi halde persist cache'teki onboardingComplete yanlış yönlendirir.
    if (isAuthenticated && !profileSynced) return;
    SplashScreen.hideAsync().catch(() => {});

    const inAuth = first === "(auth)";
    const inIntro = first === "onboarding-intro";
    const inReveal = first === "reveal";
    const inPaywall = first === "paywall";
    const inInvite = first === "invite";

    // Target route hesapla, sonra sadece gerekiyorsa replace
    let target: string | null = null;

    if (inInvite) {
      target = null; // invite ekranı kendi başına
    } else if (!isAuthenticated) {
      if (!inAuth) target = "/(auth)/login";
    } else if (!onboardingComplete) {
      if (!onboardingSeen && !inIntro) target = "/onboarding-intro";
      else if (onboardingSeen && !inAuth) target = "/(auth)/birth";
    } else if (inReveal) {
      target = null;
    } else if (!paywallSeen) {
      if (!inPaywall) target = "/paywall";
    } else if (inAuth || inIntro || inPaywall) {
      target = "/(tabs)";
    }

    if (target) router.replace(target as any);
  }, [isAuthenticated, isHydrated, profileSynced, onboardingComplete, onboardingSeen, paywallSeen, first, router]);

  return null;
}

function AppShell() {
  useAuthBootstrap();
  usePushBootstrap();
  const [fontsLoaded] = useFonts();
  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: "#0d0820" }} />;
  return (
    <>
      <AuthGate />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#0B0B1A" } }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="onboarding-intro" />
        <Stack.Screen name="reveal" />
        <Stack.Screen name="paywall" options={{ presentation: "modal" }} />
        <Stack.Screen name="invite" options={{ presentation: "modal" }} />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="report/[id]" options={{ presentation: "modal" }} />
      </Stack>
      <ToastHost />
      <StatusBar style="light" />
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <AppShell />
            </SafeAreaProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
