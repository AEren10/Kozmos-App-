// Birebir port: kozmosgenel/src/screens-onboarding.jsx — ScreenLogin
import { useState } from "react";
import { View, Text, Pressable, StyleSheet, StatusBar, ScrollView } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { NebulaBg, Orb, OrbitRings, Rotator, OrbitingDot, FadeUp } from "@/components/nebula";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { signInWithEmail } from "@/hooks/useAuth";
import { useAppDispatch } from "@/store";
import { toast } from "@/store/slices/uiSlice";
import { colors, fonts } from "@/constants/theme";

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email || !password) return dispatch(toast({ text: "E-posta ve şifre gerekli", type: "error" }));
    setLoading(true);
    try {
      await signInWithEmail(email, password);
    } catch (e: any) {
      dispatch(toast({ text: e.message ?? "Giriş hatası", type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" />
      <NebulaBg seed={1} />

      {/* Floating orb — top 60, 160x160 */}
      <View style={styles.orbWrap}>
        {/* dashed orbit ring 200x200, rotate 18s */}
        <View style={{ position: "absolute", width: 200, height: 200, alignItems: "center", justifyContent: "center" }}>
          <Rotator duration={18000}>
            <OrbitRings size={200} color="rgba(196,170,255,0.25)" count={1} />
          </Rotator>
          <OrbitingDot radius={95} size={6} color="#ff9ad1" duration={18000} />
        </View>
        {/* reverse ring 180x180, rotate 12s reverse */}
        <View style={{ position: "absolute", width: 180, height: 180, alignItems: "center", justifyContent: "center" }}>
          <Rotator duration={12000} reverse>
            <OrbitRings size={180} color="rgba(255,154,209,0.2)" count={1} />
          </Rotator>
          <OrbitingDot radius={85} size={5} color="#c4a4ff" duration={12000} reverse />
        </View>
        <Orb size={160} />
      </View>

      {/* Logo */}
      <FadeUp delay={100} style={styles.logoWrap}>
        <Text style={styles.logo}>kozmos</Text>
        <Text style={styles.tagline}>YILDIZLARIN REHBERLİĞİNDE</Text>
      </FadeUp>

      {/* Bottom sheet */}
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
          {/* Social auth */}
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
            <Pressable style={[styles.socialBtn, { backgroundColor: "rgba(255,255,255,0.96)" }]}>
              <Text style={{ fontSize: 15 }}>⬡</Text>
              <Text style={{ color: "#1a0e3d", fontSize: 13, fontWeight: "600", marginLeft: 6 }}>Apple ile gir</Text>
            </Pressable>
            <Pressable style={[styles.socialBtn, { backgroundColor: "rgba(255,255,255,0.08)" }]}>
              <Text style={{ fontSize: 15, color: colors.text }}>◉</Text>
              <Text style={{ color: colors.text, fontSize: 13, fontWeight: "600", marginLeft: 6 }}>Google ile gir</Text>
            </Pressable>
          </View>

          {/* Divider */}
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

          <Pressable style={{ alignSelf: "flex-end", marginBottom: 16, marginTop: -6 }}>
            <Text style={{ color: colors.accent, fontSize: 12, fontFamily: fonts.displayReg }}>şifremi unuttum →</Text>
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
    top: 70,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    zIndex: 2,
  },
  logoWrap: {
    position: "absolute",
    top: 236,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 4,
  },
  logo: {
    fontFamily: fonts.display,
    fontSize: 42,
    color: "#fff",
    letterSpacing: -1,
    textShadowColor: "rgba(196,170,255,0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  tagline: {
    fontSize: 11,
    fontFamily: fonts.mono,
    color: "rgba(196,170,255,0.8)",
    letterSpacing: 3,
    marginTop: 6,
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
  socialBtn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.25)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
