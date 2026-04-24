import { useState } from "react";
import { View, Text, Pressable, StyleSheet, StatusBar, ScrollView, Platform, Alert } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { NebulaBg, FadeUp } from "@/components/nebula";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AuthOrbit } from "@/components/auth/AuthOrbit";
import { SocialAuthRow } from "@/components/auth/SocialAuthRow";
import { AppleAuthentication } from "@/components/auth/appleAuth";
import { signInWithEmail, resetPassword } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useAppDispatch } from "@/store";
import { toast } from "@/store/slices/uiSlice";
import { colors, fonts } from "@/constants/theme";

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const onSubmit = async () => {
    if (loading) return;
    if (!email || !password) {
      dispatch(toast({ text: "E-posta ve şifre gerekli", type: "error" }));
      return;
    }
    setLoading(true);
    try {
      await signInWithEmail(email, password);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Giriş hatası";
      dispatch(toast({ text: msg, type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  const onApple = async () => {
    if (Platform.OS !== "ios") {
      dispatch(toast({ text: t("auth.appleIosOnly"), type: "info" }));
      return;
    }
    if (!AppleAuthentication) {
      dispatch(toast({ text: t("auth.appleUnavailable"), type: "error" }));
      return;
    }
    if (appleLoading) return;
    setAppleLoading(true);
    try {
      const available = await AppleAuthentication.isAvailableAsync();
      if (!available) {
        dispatch(toast({ text: t("auth.appleUnavailable"), type: "error" }));
        return;
      }
      const cred = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });
      if (!cred.identityToken) {
        dispatch(toast({ text: t("auth.appleFailed"), type: "error" }));
        return;
      }
      const { error } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token: cred.identityToken,
      });
      if (error) throw error;
    } catch (e) {
      if (e && typeof e === "object" && "code" in e && (e as { code?: string }).code === "ERR_REQUEST_CANCELED") {
        return;
      }
      const msg = e instanceof Error ? e.message : t("auth.appleFailed");
      dispatch(toast({ text: msg, type: "error" }));
    } finally {
      setAppleLoading(false);
    }
  };

  const onGoogle = () => {
    dispatch(toast({ text: t("auth.googleSoon"), type: "info" }));
  };

  const runReset = async (mail: string) => {
    const target = (mail ?? "").trim();
    if (!target) {
      dispatch(toast({ text: t("auth.forgotEmailMissing"), type: "error" }));
      return;
    }
    if (forgotLoading) return;
    setForgotLoading(true);
    try {
      await resetPassword(target);
      dispatch(toast({ text: t("auth.forgotSent"), type: "success" }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : t("auth.forgotFailed");
      dispatch(toast({ text: msg, type: "error" }));
    } finally {
      setForgotLoading(false);
    }
  };

  const onForgot = () => {
    if (email.trim()) {
      void runReset(email);
      return;
    }
    if (Platform.OS === "ios") {
      Alert.prompt(
        t("auth.forgotPassword"),
        t("auth.forgotPrompt"),
        [
          { text: t("common.cancel"), style: "cancel" },
          { text: t("common.continue"), onPress: (v?: string) => void runReset(v ?? "") },
        ],
        "plain-text",
        "",
        "email-address",
      );
    } else {
      dispatch(toast({ text: t("auth.forgotEmailMissing"), type: "info" }));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" />
      <NebulaBg seed={1} />

      <View style={styles.orbWrap}>
        <AuthOrbit />
      </View>

      <FadeUp delay={100} style={styles.logoWrap}>
        <Text style={styles.logo}>kozmos</Text>
        <Text style={styles.tagline}>YILDIZLARIN REHBERLİĞİNDE</Text>
      </FadeUp>

      <LinearGradient
        colors={["transparent", "rgba(13,8,32,0.95)"]}
        locations={[0, 0.2]}
        style={styles.sheetBg}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
        keyboardShouldPersistTaps="handled"
      >
        <FadeUp delay={200} style={styles.sheet}>
          <SocialAuthRow onApple={onApple} onGoogle={onGoogle} appleLoading={appleLoading} />

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <View style={{ flex: 1, height: 0.5, backgroundColor: "rgba(196,170,255,0.2)" }} />
            <Text style={{ fontSize: 11, color: colors.textMute, fontFamily: fonts.mono, letterSpacing: 2 }}>veya</Text>
            <View style={{ flex: 1, height: 0.5, backgroundColor: "rgba(196,170,255,0.2)" }} />
          </View>

          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholder="e-posta"
            icon="✉"
          />
          <Input secureTextEntry value={password} onChangeText={setPassword} placeholder="şifre" icon="✦" />

          <Pressable
            onPress={onForgot}
            disabled={forgotLoading}
            style={{ alignSelf: "flex-end", marginBottom: 16, marginTop: -6, opacity: forgotLoading ? 0.5 : 1 }}
          >
            <Text style={{ color: colors.accent, fontSize: 12, fontFamily: fonts.displayReg }}>
              {forgotLoading ? t("common.loading") : t("auth.forgotPassword")}
            </Text>
          </Pressable>

          <Button onPress={onSubmit} loading={loading}>Giriş Yap</Button>

          <View style={{ alignItems: "center", marginTop: 18 }}>
            <Link href="/(auth)/register" asChild>
              <Pressable>
                <Text style={{ color: colors.textMute, fontSize: 13 }}>
                  hesabın yok mu?{" "}
                  <Text style={{ color: colors.accent, fontFamily: fonts.displayReg }}>kaydol →</Text>
                </Text>
              </Pressable>
            </Link>
          </View>
        </FadeUp>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  orbWrap: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    zIndex: 2,
  },
  logoWrap: {
    position: "absolute",
    top: 198,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 4,
  },
  logo: {
    fontFamily: fonts.display,
    fontSize: 42,
    color: "#fff",
    letterSpacing: -0.5,
    textShadowColor: "rgba(196,170,255,0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  tagline: {
    fontSize: 11,
    fontFamily: fonts.mono,
    color: "rgba(240,235,255,0.5)",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 30,
    letterSpacing: 3,
  },
  sheetBg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 460,
  },
  sheet: {
    padding: 24,
    paddingTop: 32,
    paddingBottom: 44,
  },
});
