import { View, Text, Pressable, StyleSheet, Linking } from "react-native";
import { useTranslation } from "react-i18next";
import { colors, fonts } from "@/constants/theme";

type Props = {
  onRestore: () => void;
  restoring: boolean;
  privacyUrl: string;
  termsUrl: string;
  trialNote: string;
  onClose: () => void;
};

export function PaywallFooter({ onRestore, restoring, privacyUrl, termsUrl, trialNote, onClose }: Props) {
  const { t } = useTranslation();
  const openUrl = (u: string) => void Linking.openURL(u);
  return (
    <>
      <Text style={styles.trialNote}>{trialNote}</Text>

      <Pressable onPress={onRestore} disabled={restoring} style={styles.restoreBtn}>
        <Text style={styles.restoreText}>
          {restoring ? t("common.loading") : t("paywall.restore")}
        </Text>
      </Pressable>

      <Text style={styles.autoRenew}>{t("paywall.autoRenewDisclaimer")}</Text>

      <View style={styles.legalRow}>
        <Pressable onPress={() => openUrl(termsUrl)} hitSlop={8}>
          <Text style={styles.legalLink}>{t("paywall.terms")}</Text>
        </Pressable>
        <Text style={styles.legalDot}>·</Text>
        <Pressable onPress={() => openUrl(privacyUrl)} hitSlop={8}>
          <Text style={styles.legalLink}>{t("paywall.privacy")}</Text>
        </Pressable>
      </View>

      <Pressable onPress={onClose} style={{ alignItems: "center", marginTop: 14 }}>
        <Text style={{ fontSize: 13, color: colors.textMute }}>şimdilik devam et →</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  trialNote: {
    textAlign: "center",
    fontSize: 11,
    color: colors.textMute,
    marginTop: 10,
    fontFamily: fonts.mono,
    letterSpacing: 0.5,
  },
  restoreBtn: {
    marginTop: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.25)",
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
  },
  restoreText: { fontSize: 13, color: colors.text, fontFamily: fonts.bodyMed },
  autoRenew: {
    marginTop: 14,
    fontSize: 10,
    lineHeight: 15,
    color: colors.textFaint,
    fontFamily: fonts.mono,
    letterSpacing: 0.3,
    textAlign: "center",
    paddingHorizontal: 4,
  },
  legalRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10, gap: 8 },
  legalLink: {
    fontSize: 11,
    color: colors.accent,
    fontFamily: fonts.mono,
    letterSpacing: 0.5,
    textDecorationLine: "underline",
  },
  legalDot: { fontSize: 11, color: colors.textFaint },
});
