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
    <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
      <Pressable
        onPress={onApple}
        disabled={appleDisabled}
        style={({ pressed }) => [
          styles.btn,
          { backgroundColor: "rgba(255,255,255,0.96)" },
          Platform.OS !== "ios" ? { opacity: 0.5 } : null,
          pressed ? { opacity: 0.85 } : null,
        ]}
      >
        <Text style={{ fontSize: 15 }}></Text>
        <Text style={{ color: "#1a0e3d", fontSize: 13, fontWeight: "600", marginLeft: 6 }}>
          {appleLoading ? t("common.loading") : "Apple ile gir"}
        </Text>
      </Pressable>
      <Pressable
        onPress={onGoogle}
        style={({ pressed }) => [
          styles.btn,
          { backgroundColor: "rgba(255,255,255,0.08)", opacity: pressed ? 0.7 : 0.5 },
        ]}
      >
        <Text style={{ fontSize: 15, color: colors.text }}>◉</Text>
        <Text style={{ color: colors.text, fontSize: 13, fontWeight: "600", marginLeft: 6 }}>Google</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.25)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
