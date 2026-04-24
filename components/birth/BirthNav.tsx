import { View, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Heading";
import { colors } from "@/constants/theme";

type Props = {
  step: number;
  total: number;
  loading: boolean;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
  onSkip: () => void;
  skippable: boolean;
};

export function BirthNav({ step, total, loading, onBack, onNext, onFinish, onSkip, skippable }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <View style={{ flexDirection: "row", gap: 12 }}>
        {step > 1 && (
          <View style={{ flex: 1 }}>
            <Button variant="secondary" onPress={onBack}>{t("common.back")}</Button>
          </View>
        )}
        <View style={{ flex: 2 }}>
          {step === total ? (
            <Button onPress={onFinish} loading={loading}>{t("onboarding.finish")}</Button>
          ) : (
            <Button onPress={onNext}>{t("common.continue")}</Button>
          )}
        </View>
      </View>
      {skippable && (
        <Pressable onPress={onSkip} style={{ alignItems: "center", marginTop: 12 }}>
          <Caption style={{ color: colors.textMute }}>{t("onboarding.skipStep")}</Caption>
        </Pressable>
      )}
    </>
  );
}
