import { useEffect } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Screen } from "@/components/ui/Screen";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { H1, H3, Body, Caption } from "@/components/ui/Heading";
import { useAppSelector } from "@/store";
import { colors } from "@/constants/theme";

export default function Invite() {
  const router = useRouter();
  const { t } = useTranslation();
  const { d, n } = useLocalSearchParams<{ d?: string; n?: string }>();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  useEffect(() => {
    // Partner bilgisini geçici state'e yaz, compat ekranına gönder
  }, []);

  const onContinue = () => {
    const qs = new URLSearchParams();
    if (d) qs.set("d", d);
    if (n) qs.set("n", n);
    if (isAuthenticated) {
      router.replace(`/(tabs)/compat?${qs.toString()}` as any);
    } else {
      router.replace(`/(auth)/register?${qs.toString()}` as any);
    }
  };

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <H1 style={{ marginBottom: 6 }}>{t("invite.title")}</H1>
        <Body style={{ marginBottom: 24 }}>{t("invite.subtitle", { name: n || "Biri" })}</Body>

        <Card style={{ marginBottom: 24 }}>
          <Caption>{t("invite.partner")}</Caption>
          <H3 style={{ marginTop: 4 }}>{n || "—"}</H3>
          {d && <Caption style={{ marginTop: 4 }}>{d}</Caption>}
        </Card>

        <Button onPress={onContinue}>
          {isAuthenticated ? t("invite.cta") : t("invite.signup")}
        </Button>
      </View>
    </Screen>
  );
}
