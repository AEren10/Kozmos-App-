import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { NebulaBg, FadeUp } from "@/components/nebula";
import { colors, fonts } from "@/constants/theme";

const TOOLS = [
  { key: "numerology", sym: "7", label: "Numeroloji", desc: "yaşam yolu ve isim titreşimin", color: "#c4a4ff" },
  { key: "nameCompat", sym: "∞", label: "İsim Uyumu", desc: "iki ismin enerjisi uyuyor mu?", color: "#ff9ad1" },
  { key: "pastLife", sym: "◐", label: "Geçmiş Yaşam", desc: "güney ay düğümünden hikayen", color: "#b0dcff" },
  { key: "tarot", sym: "✦", label: "Tarot Çekimi", desc: "günün kartını çek", color: "#ffd77a", soon: true },
  { key: "dream", sym: "☁", label: "Rüya Tabiri", desc: "gördüğünü yaz, sembolleri aç", color: "#d0f0c0", soon: true },
  { key: "coffee", sym: "☕", label: "Kahve Falı", desc: "fincan fotoğrafını yükle", color: "#ff8f6b", soon: true },
];

export default function ToolsTab() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <NebulaBg seed={27} />
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <FadeUp delay={0} style={{ paddingHorizontal: 22, paddingTop: 14 }}>
            <Text style={{ fontSize: 10, color: colors.accent, fontFamily: fonts.mono, letterSpacing: 2 }}>
              KEŞFET
            </Text>
            <Text style={{ fontFamily: fonts.display, fontSize: 24, color: colors.text, marginTop: 4 }}>
              kozmosun{" "}
              <Text style={{ color: colors.accent }}>tüm araçları</Text>
            </Text>
          </FadeUp>

          <View style={{ padding: 18, flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
            {TOOLS.map((tool, i) => (
              <FadeUp key={tool.key} delay={100 + i * 60} style={{ width: "48%" }}>
                <Pressable
                  onPress={() =>
                    tool.soon
                      ? Alert.alert("Yakında", "Bu özellik yolda ✨")
                      : router.push(`/report/${tool.key}` as any)
                  }
                  style={({ pressed }) => [
                    styles.card,
                    { borderColor: `${tool.color}33`, opacity: tool.soon ? 0.6 : pressed ? 0.7 : 1 },
                  ]}
                >
                  <View style={[styles.gem, { backgroundColor: `${tool.color}22`, borderColor: `${tool.color}55` }]}>
                    <Text style={{ fontSize: 22, color: tool.color, fontFamily: fonts.displayBold }}>{tool.sym}</Text>
                  </View>
                  <Text style={{ fontFamily: fonts.displayReg, fontSize: 17, color: colors.text, marginTop: 12 }}>
                    {tool.label}
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.textMute, marginTop: 4, fontFamily: fonts.body, lineHeight: 18 }}>
                    {tool.desc}
                  </Text>
                  {tool.soon && (
                    <Text style={{ fontSize: 10, color: "#ffd77a", fontFamily: fonts.mono, letterSpacing: 1, marginTop: 6 }}>
                      YAKINDA
                    </Text>
                  )}
                </Pressable>
              </FadeUp>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    minHeight: 160,
  },
  gem: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
