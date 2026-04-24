import { useState, useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "@/components/ui/Screen";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { H1, H3, Body, Caption } from "@/components/ui/Heading";
import { useAppSelector } from "@/store";
import { numerology } from "@/lib/api/numerology";
import { nameCompatibility } from "@/lib/api/nameCompat";
import { pastLifeReading } from "@/lib/api/pastLife";
import { shareText } from "@/lib/share";
import { colors } from "@/constants/theme";

export default function ReportScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const profile = useAppSelector((s) => s.profile.profile);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!profile?.birth_date) {
      Alert.alert("Eksik", "Önce profilini tamamla.", [{ text: "Tamam", onPress: () => router.back() }]);
      return;
    }
    (async () => {
      setLoading(true);
      try {
        if (id === "numerology") {
          const n = numerology(profile.display_name ?? "Gezgin", profile.birth_date!);
          setTitle("Numeroloji");
          setContent(`Yaşam yolu: ${n.lifePath}\nİfade sayısı: ${n.expression}\nKişilik sayısı: ${n.personality}\n\n${n.summary}`);
        } else if (id === "pastLife") {
          setTitle("Geçmiş Yaşam");
          setContent(await pastLifeReading({ birth_date: profile.birth_date! }, "tr"));
        } else if (id === "nameCompat") {
          setTitle("İsim Uyumu");
          const r = await nameCompatibility(profile.display_name ?? "Sen", "Deneme", "tr");
          setContent(`Skor: ${r.score}\n\n${r.text}\n\n(Partnerinin ismini compat sekmesinde gir.)`);
        }
      } catch (e: any) {
        Alert.alert("Hata", e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, profile, router]);

  return (
    <Screen>
      <H1 style={{ marginBottom: 16 }}>{title}</H1>
      {loading && <ActivityIndicator color={colors.accent} />}
      {content && (
        <Card>
          <Body style={{ lineHeight: 24 }}>{content}</Body>
        </Card>
      )}
      {content && (
        <Button
          variant="secondary"
          onPress={() => void shareText(`✨ ${title}\n\n${content}`)}
          style={{ marginTop: 16 }}
        >
          Paylaş ↗
        </Button>
      )}
      <Button variant="ghost" onPress={() => router.back()} style={{ marginTop: 12 }}>
        Kapat
      </Button>
      <Caption style={{ textAlign: "center", marginTop: 12, color: colors.textMute }}>
        Eğlence amaçlıdır.
      </Caption>
    </Screen>
  );
}
