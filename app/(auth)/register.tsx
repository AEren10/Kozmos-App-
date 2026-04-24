import { useState } from "react";
import { View, Text, Pressable, ScrollView, StatusBar, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { NebulaBg, FadeUp } from "@/components/nebula";
import { gradients } from "@/constants/designTokens";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { signUpWithEmail } from "@/hooks/useAuth";
import { useAppDispatch } from "@/store";
import { toast } from "@/store/slices/uiSlice";
import { colors, fonts } from "@/constants/theme";

function strength(pw: string): { pct: number; label: string } {
  if (pw.length < 6) return { pct: 20, label: "zayıf" };
  if (pw.length < 10) return { pct: 65, label: "orta güçlü" };
  return { pct: 95, label: "güçlü" };
}

export default function Register() {
  useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);

  const s = strength(password);

  const onSubmit = async () => {
    if (!email || password.length < 6) {
      return dispatch(toast({ text: "Geçerli e-posta + en az 6 karakter şifre", type: "error" }));
    }
    if (!agree) return dispatch(toast({ text: "Şartları kabul et", type: "error" }));

    setLoading(true);
    try {
      await signUpWithEmail(email, password);
    } catch (e: any) {
      dispatch(toast({ text: e.message ?? "Kayıt hatası", type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" />
      <NebulaBg seed={7} />

      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <FadeUp delay={0}>
            <Pressable onPress={() => router.back()} style={{ marginBottom: 28 }}>
              <Text style={{ color: colors.accent, fontSize: 13, fontFamily: fonts.displayReg }}>← geri</Text>
            </Pressable>
          </FadeUp>

          <FadeUp delay={50}>
            <Text style={styles.hero}>
              kozmosa <Text style={{ color: colors.accent }}>hoş geldin.</Text>
            </Text>
            <Text style={styles.sub}>
              haritanı çıkarmak için önce seni tanıyalım.
            </Text>
          </FadeUp>

          <FadeUp delay={150}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Input value={name} onChangeText={setName} placeholder="adın" />
              </View>
              <View style={{ flex: 1 }}>
                <Input value={surname} onChangeText={setSurname} placeholder="soyadın" />
              </View>
            </View>
          </FadeUp>

          <FadeUp delay={220}>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="e-posta adresi"
              autoCapitalize="none"
              keyboardType="email-address"
              icon="✉"
            />
          </FadeUp>

          <FadeUp delay={280}>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="şifre"
              secureTextEntry
              icon="✦"
            />
          </FadeUp>

          <FadeUp delay={340} style={{ position: "relative", marginBottom: 20 }}>
            <View style={{ height: 3, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <LinearGradient
                colors={gradients.strength as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: `${s.pct}%`,
                  height: "100%",
                  shadowColor: colors.accent,
                  shadowOpacity: 0.6,
                  shadowRadius: 8,
                }}
              />
            </View>
            <Text style={styles.strength}>{s.label}</Text>
          </FadeUp>

          <FadeUp delay={400}>
            <Pressable onPress={() => setAgree(!agree)} style={styles.termsRow}>
              <View style={styles.checkbox}>
                {agree && (
                  <LinearGradient
                    colors={gradients.cta as any}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                  />
                )}
                {agree ? <Text style={styles.checkboxText}>✓</Text> : null}
              </View>
              <Text style={styles.termsText}>
                <Text style={{ color: colors.accent }}>kullanım şartlarını</Text> ve{" "}
                <Text style={{ color: colors.accent }}>gizlilik politikasını</Text> kabul ediyorum
              </Text>
            </Pressable>
          </FadeUp>

          <View style={{ flex: 1 }} />

          <FadeUp delay={450}>
            <Button onPress={onSubmit} loading={loading}>Haritamı Oluştur →</Button>
          </FadeUp>

          <FadeUp delay={520} style={{ marginTop: 14 }}>
            <View style={styles.footerHint}>
              <Text style={{ fontSize: 18 }}>☽</Text>
              <Text style={{ color: colors.textDim, fontSize: 12, fontFamily: fonts.displayReg }}>
                sonraki adım: doğum bilgilerin →
              </Text>
            </View>
          </FadeUp>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 28,
    paddingBottom: 34,
  },
  hero: {
    fontFamily: fonts.display,
    fontSize: 33,
    color: colors.text,
    lineHeight: 39,
    marginBottom: 10,
    maxWidth: 230,
  },
  sub: {
    color: colors.textDim,
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 26,
    maxWidth: 220,
  },
  strength: {
    position: "absolute",
    right: 0,
    top: -18,
    fontSize: 10,
    fontFamily: fonts.mono,
    color: colors.accent,
    letterSpacing: 1,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  checkboxText: {
    color: colors.bgDeep,
    fontSize: 11,
    fontWeight: "700",
  },
  termsText: {
    flex: 1,
    color: colors.textMute,
    fontSize: 12,
    lineHeight: 18,
  },
  footerHint: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "rgba(196,170,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.12)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
