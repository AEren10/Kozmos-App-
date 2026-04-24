import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { colors } from "@/constants/theme";

type Props = {
  onApple: () => void;
  onGoogle: () => void;
  appleLoading?: boolean;
};

export function SocialAuthRow({ onApple, onGoogle, appleLoading }: Props) {
  const { t } = useTranslation();
  const appleDisabled = appleLoading || Platform.OS !== "ios";

  return (
    <View style={styles.row}>
      <Pressable
        onPress={onApple}
        disabled={appleDisabled}
        style={({ pressed }) => [
          styles.btn,
          styles.appleBtn,
          Platform.OS !== "ios" ? { opacity: 0.5 } : null,
          pressed ? { opacity: 0.85 } : null,
        ]}
      >
        <Text style={styles.appleIcon}>⬡</Text>
        <Text style={styles.appleText}>{appleLoading ? t("common.loading") : "Apple ile gir"}</Text>
      </Pressable>

      <Pressable
        onPress={onGoogle}
        style={({ pressed }) => [
          styles.btn,
          styles.googleBtn,
          { opacity: pressed ? 0.72 : 1 },
        ]}
      >
        <Text style={styles.googleIcon}>◉</Text>
        <Text style={styles.googleText}>Google ile gir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
  },
  btn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.18)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  appleBtn: {
    backgroundColor: "rgba(255,255,255,0.96)",
  },
  googleBtn: {
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  appleIcon: {
    fontSize: 13,
    color: "#1a0e3d",
  },
  googleIcon: {
    fontSize: 13,
    color: colors.text,
  },
  appleText: {
    color: "#1a0e3d",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
  googleText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
});
