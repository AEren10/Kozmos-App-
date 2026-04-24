import { useState } from "react";
import { View, Pressable, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useAppSelector, useAppDispatch } from "@/store";
import { toast } from "@/store/slices/uiSlice";
import { Caption } from "@/components/ui/Heading";
import { colors } from "@/constants/theme";

export function FeedbackBar({ contentHash, feature }: { contentHash: string; feature: string }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((s) => s.auth.userId);
  const [given, setGiven] = useState<number | null>(null);

  const submit = async (rating: 1 | -1) => {
    setGiven(rating);
    if (isSupabaseConfigured() && userId) {
      await supabase.from("feedback").insert({ user_id: userId, content_hash: contentHash, rating, feature });
    }
    dispatch(toast({ text: rating === 1 ? "Teşekkürler ✨" : "Not aldık, daha iyisini yazacağız", type: "success" }));
  };

  if (given !== null) {
    return (
      <Caption style={{ textAlign: "center", marginTop: 12, color: colors.textMute }}>
        {given === 1 ? "✨" : "🙏"}
      </Caption>
    );
  }

  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 16 }}>
      <Caption style={{ color: colors.textMute }}>{t("daily.feedback")}</Caption>
      <Pressable onPress={() => submit(1)} style={({ pressed }) => ({ padding: 8, opacity: pressed ? 0.6 : 1 })}>
        <Text style={{ fontSize: 20 }}>👍</Text>
      </Pressable>
      <Pressable onPress={() => submit(-1)} style={({ pressed }) => ({ padding: 8, opacity: pressed ? 0.6 : 1 })}>
        <Text style={{ fontSize: 20 }}>👎</Text>
      </Pressable>
    </View>
  );
}
