import { useState } from "react";
import { View, Pressable, Text, StyleSheet, Modal } from "react-native";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { H3, Body, Caption } from "@/components/ui/Heading";
import { MOOD_OPTIONS } from "@/constants/onboarding";
import { colors } from "@/constants/theme";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (mood: number, energy: number, top: string) => void;
};

export function CheckinSheet({ open, onClose, onSave }: Props) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "tr" | "en";
  const [mood, setMood] = useState<number>(3);
  const [energy, setEnergy] = useState<number>(3);
  const [top, setTop] = useState("");

  const submit = () => {
    onSave(mood, energy, top);
    setTop("");
  };

  return (
    <Modal visible={open} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <H3 style={{ marginBottom: 6 }}>{t("checkin.title")}</H3>
          <Caption style={{ marginBottom: 20 }}>{t("checkin.moodTitle")}</Caption>

          <View style={styles.moodRow}>
            {MOOD_OPTIONS.map((m) => (
              <Pressable
                key={m.key}
                onPress={() => setMood(m.key)}
                style={[styles.mood, mood === m.key && styles.moodActive]}
              >
                <Text style={{ fontSize: 28 }}>{m.emoji}</Text>
                <Caption style={{ fontSize: 10, marginTop: 4, color: mood === m.key ? colors.text : colors.textMute }}>
                  {m[lang]}
                </Caption>
              </Pressable>
            ))}
          </View>

          <Caption style={{ marginBottom: 10, marginTop: 8 }}>{t("checkin.energyTitle")}</Caption>
          <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Pressable
                key={i}
                onPress={() => setEnergy(i)}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 8,
                  backgroundColor: i <= energy ? colors.accent : colors.bgCard,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              />
            ))}
          </View>

          <Input
            label={t("checkin.topTitle")}
            value={top}
            onChangeText={setTop}
            placeholder={t("checkin.topPlaceholder")}
          />

          <Button onPress={submit}>{t("checkin.save")}</Button>
          <Pressable onPress={onClose} style={{ alignItems: "center", marginTop: 12 }}>
            <Caption style={{ color: colors.textMute }}>{t("checkin.skip")}</Caption>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" },
  sheet: {
    backgroundColor: colors.bgSoft,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
  },
  moodRow: { flexDirection: "row", justifyContent: "space-between" },
  mood: {
    flex: 1,
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
    marginHorizontal: 2,
  },
  moodActive: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.accent },
});
