import { View, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/Input";
import { DateField } from "@/components/forms/DateField";
import { CityAutocomplete } from "@/components/forms/CityAutocomplete";
import { ChipSelect } from "@/components/forms/ChipSelect";
import { BirthCalendarStep } from "@/components/onboarding/BirthCalendarStep";
import { H3, Caption } from "@/components/ui/Heading";
import { colors, fonts } from "@/constants/theme";
import {
  GENDERS,
  RELATIONSHIP_STATUSES,
  FOCUS_AREAS,
  EXPERIENCE_LEVELS,
  TONE_PREFS,
} from "@/constants/onboarding";

export const TOTAL_STEPS = 9;
export const HOURS = ["06:00", "07:00", "08:00", "09:00", "10:00", "19:00", "21:00"];

export type BirthState = {
  step: number;
  name: string;
  gender: string;
  birthDate: Date | null;
  birthTime: Date | null;
  timeKnown: boolean;
  birthPlace: { name: string; lat: number; lon: number } | null;
  focus: string[];
  currentQuestion: string;
  experience: string;
  tone: string;
  notifyHour: string;
};

export type BirthHandlers = {
  setName: (v: string) => void;
  setGender: (v: string) => void;
  setBirthDate: (v: Date | null) => void;
  setBirthTime: (v: Date | null) => void;
  setTimeKnown: (v: boolean) => void;
  setBirthPlace: (v: { name: string; lat: number; lon: number } | null) => void;
  setFocus: (v: string[]) => void;
  setCurrentQuestion: (v: string) => void;
  setExperience: (v: string) => void;
  setTone: (v: string) => void;
  setNotifyHour: (v: string) => void;
};

export function BirthStepView({
  state,
  handlers,
  lang,
}: {
  state: BirthState;
  handlers: BirthHandlers;
  lang: "tr" | "en";
}) {
  const { t } = useTranslation();
  const {
    step, name, gender, birthDate, birthTime, timeKnown,
    birthPlace, focus, currentQuestion, experience, tone, notifyHour,
  } = state;

  const toneOpts = TONE_PREFS.map((o) => ({ key: o.key, label: o[lang], emoji: o.emoji }));
  const focusOpts = FOCUS_AREAS.map((o) => ({ key: o.key, label: o[lang], emoji: o.emoji }));
  const genderOpts = GENDERS.map((o) => ({ key: o.key, label: o[lang] }));
  const expOpts = EXPERIENCE_LEVELS.map((o) => ({ key: o.key, label: o[lang] }));
  // keep list referenced to avoid tree-shake; used for relationship in future
  void RELATIONSHIP_STATUSES;

  if (step === 1) {
    return (
      <>
        <H3 style={{ marginBottom: 16 }}>{t("onboarding.nameTitle")}</H3>
        <Input
          label={t("onboarding.name")}
          value={name}
          onChangeText={handlers.setName}
          placeholder={t("onboarding.namePlaceholder")}
        />
      </>
    );
  }
  if (step === 2) {
    return (
      <>
        <H3 style={{ marginBottom: 8 }}>{t("onboarding.genderTitle")}</H3>
        <Caption style={{ marginBottom: 16 }}>{t("onboarding.genderHelp")}</Caption>
        <ChipSelect options={genderOpts} value={gender} onChange={(v) => handlers.setGender(v as string)} />
      </>
    );
  }
  if (step === 3) {
    return (
      <>
        <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.text, lineHeight: 36, marginBottom: 18 }}>
          doğum <Text style={{ color: colors.accent }}>tarihin</Text>{"\n"}nedir?
        </Text>
        <BirthCalendarStep value={birthDate} onChange={handlers.setBirthDate} />
      </>
    );
  }
  if (step === 4) {
    return (
      <>
        <H3 style={{ marginBottom: 4 }}>{t("onboarding.birthTimeTitle")}</H3>
        <Caption style={{ marginBottom: 16 }}>{t("onboarding.birthTimeHelp")}</Caption>
        <Pressable
          onPress={() => handlers.setTimeKnown(!timeKnown)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            padding: 12,
            backgroundColor: !timeKnown ? colors.accentSoft : colors.bgCard,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: !timeKnown ? colors.accent : colors.border,
          }}
        >
          <Text style={{ color: colors.text, fontSize: 16 }}>
            {!timeKnown ? "✓" : "○"} {t("onboarding.birthTimeUnknown")}
          </Text>
        </Pressable>
        {timeKnown && (
          <DateField label={t("onboarding.birthTime")} mode="time" value={birthTime} onChange={handlers.setBirthTime} />
        )}
      </>
    );
  }
  if (step === 5) {
    return (
      <>
        <H3 style={{ marginBottom: 4 }}>{t("onboarding.birthPlaceTitle")}</H3>
        <Caption style={{ marginBottom: 16 }}>{t("onboarding.birthPlaceHelp")}</Caption>
        <CityAutocomplete label={t("onboarding.birthPlace")} value={birthPlace?.name ?? ""} onSelect={handlers.setBirthPlace} />
      </>
    );
  }
  if (step === 6) {
    return (
      <>
        <H3 style={{ marginBottom: 8 }}>{t("onboarding.focusTitle")}</H3>
        <Caption style={{ marginBottom: 16 }}>{t("onboarding.focusHelp")}</Caption>
        <ChipSelect options={focusOpts} value={focus} onChange={(v) => handlers.setFocus(v as string[])} multi />
      </>
    );
  }
  if (step === 7) {
    return (
      <>
        <H3 style={{ marginBottom: 8 }}>{t("onboarding.questionTitle")}</H3>
        <Caption style={{ marginBottom: 16 }}>{t("onboarding.questionHelp")}</Caption>
        <Input
          label=""
          value={currentQuestion}
          onChangeText={handlers.setCurrentQuestion}
          placeholder={t("onboarding.questionPlaceholder")}
          multiline
          style={{ minHeight: 80, textAlignVertical: "top" }}
        />
      </>
    );
  }
  if (step === 8) {
    return (
      <>
        <H3 style={{ marginBottom: 8 }}>{t("onboarding.experienceTitle")}</H3>
        <View style={{ marginBottom: 24 }}>
          <ChipSelect options={expOpts} value={experience} onChange={(v) => handlers.setExperience(v as string)} />
        </View>
        <H3 style={{ marginBottom: 8 }}>{t("onboarding.toneTitle")}</H3>
        <Caption style={{ marginBottom: 12 }}>{t("onboarding.toneHelp")}</Caption>
        <ChipSelect options={toneOpts} value={tone} onChange={(v) => handlers.setTone(v as string)} />
      </>
    );
  }
  if (step === 9) {
    return (
      <>
        <H3 style={{ marginBottom: 8 }}>{t("onboarding.notifyTitle")}</H3>
        <Caption style={{ marginBottom: 16 }}>{t("onboarding.notifyHelp")}</Caption>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {HOURS.map((h) => (
            <Pressable
              key={h}
              onPress={() => handlers.setNotifyHour(h)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 999,
                backgroundColor: notifyHour === h ? colors.accentSoft : colors.bgCard,
                borderWidth: 1,
                borderColor: notifyHour === h ? colors.accent : colors.border,
              }}
            >
              <Text style={{ color: notifyHour === h ? colors.text : colors.textSoft, fontSize: 14, fontWeight: notifyHour === h ? "600" : "400" }}>{h}</Text>
            </Pressable>
          ))}
        </View>
      </>
    );
  }
  return null;
}
