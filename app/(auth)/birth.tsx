import { useState } from "react";
import { View, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Screen } from "@/components/ui/Screen";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DateField } from "@/components/forms/DateField";
import { CityAutocomplete } from "@/components/forms/CityAutocomplete";
import { ChipSelect } from "@/components/forms/ChipSelect";
import { H1, H3, Body, Caption } from "@/components/ui/Heading";
import { useAppDispatch, useAppSelector } from "@/store";
import { setProfile } from "@/store/slices/profileSlice";
import { toast } from "@/store/slices/uiSlice";
import { upsertProfile } from "@/lib/api/users";
import { sunSignFromDate } from "@/lib/astro/sunSign";
import {
  GENDERS,
  RELATIONSHIP_STATUSES,
  FOCUS_AREAS,
  EXPERIENCE_LEVELS,
  TONE_PREFS,
} from "@/constants/onboarding";
import { colors } from "@/constants/theme";

const TOTAL_STEPS = 9;

export default function BirthOnboarding() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language as "tr" | "en") ?? "tr";
  const auth = useAppSelector((s) => s.auth);

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthTime, setBirthTime] = useState<Date | null>(null);
  const [timeKnown, setTimeKnown] = useState(true);
  const [birthPlace, setBirthPlace] = useState<{ name: string; lat: number; lon: number } | null>(null);
  const [relationship, setRelationship] = useState<string>("");
  const [focus, setFocus] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [experience, setExperience] = useState<string>("");
  const [tone, setTone] = useState<string>("");
  const [notifyHour, setNotifyHour] = useState("08:00");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (step === 1 && !name.trim()) return "İsim gerekli";
    if (step === 3 && !birthDate) return "Doğum tarihi gerekli";
    if (step === 5 && !birthPlace) return "Şehir seç";
    return null;
  };

  const next = () => {
    const err = validate();
    if (err) return dispatch(toast({ text: err, type: "error" }));
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
    else onFinish();
  };
  const back = () => setStep((s) => Math.max(1, s - 1));
  const skip = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1));

  const onFinish = async () => {
    if (!auth.userId || !birthDate) return;
    setLoading(true);
    const sun = sunSignFromDate(birthDate);
    const profile = {
      id: auth.userId,
      email: auth.email,
      display_name: name,
      gender: gender || null,
      birth_date: birthDate.toISOString().split("T")[0],
      birth_time: timeKnown && birthTime ? birthTime.toTimeString().slice(0, 5) : null,
      birth_time_known: timeKnown && !!birthTime,
      birth_place: birthPlace?.name ?? null,
      birth_lat: birthPlace?.lat ?? null,
      birth_lon: birthPlace?.lon ?? null,
      sun_sign: sun,
      moon_sign: null,
      rising_sign: null,
      relationship_status: relationship || null,
      focus_areas: focus.length ? focus : null,
      current_question: currentQuestion.trim() || null,
      experience_level: (experience || null) as any,
      tone_preference: (tone || null) as any,
      notify_time: notifyHour,
      is_premium: false,
      created_at: new Date().toISOString(),
      onboarded_at: new Date().toISOString(),
    };
    try {
      await upsertProfile(profile);
    } catch (e) {
      setLoading(false);
      const msg = e instanceof Error && e.message ? e.message : t("errors.saveFailed");
      dispatch(toast({ text: msg, type: "error" }));
      return;
    }
    dispatch(setProfile(profile));
    setLoading(false);
    router.replace("/reveal" as any);
  };

  const toneOpts = TONE_PREFS.map((o) => ({ key: o.key, label: o[lang], emoji: o.emoji }));
  const focusOpts = FOCUS_AREAS.map((o) => ({ key: o.key, label: o[lang], emoji: o.emoji }));
  const genderOpts = GENDERS.map((o) => ({ key: o.key, label: o[lang] }));
  const relOpts = RELATIONSHIP_STATUSES.map((o) => ({ key: o.key, label: o[lang] }));
  const expOpts = EXPERIENCE_LEVELS.map((o) => ({ key: o.key, label: o[lang] }));

  const hours = ["06:00", "07:00", "08:00", "09:00", "10:00", "19:00", "21:00"];

  return (
    <Screen>
      <View style={{ flex: 1, paddingVertical: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <View style={{ flex: 1, height: 3, backgroundColor: colors.border, borderRadius: 2 }}>
            <View style={{ width: `${(step / TOTAL_STEPS) * 100}%`, height: 3, backgroundColor: colors.accent, borderRadius: 2 }} />
          </View>
          <Caption style={{ marginLeft: 12 }}>{step} / {TOTAL_STEPS}</Caption>
        </View>

        <H1 style={{ marginBottom: 24, marginTop: 4 }}>{t("onboarding.title")}</H1>

        {step === 1 && (
          <>
            <H3 style={{ marginBottom: 16 }}>{t("onboarding.nameTitle")}</H3>
            <Input label={t("onboarding.name")} value={name} onChangeText={setName} placeholder={t("onboarding.namePlaceholder")} />
          </>
        )}

        {step === 2 && (
          <>
            <H3 style={{ marginBottom: 8 }}>{t("onboarding.genderTitle")}</H3>
            <Caption style={{ marginBottom: 16 }}>{t("onboarding.genderHelp")}</Caption>
            <ChipSelect options={genderOpts} value={gender} onChange={(v) => setGender(v as string)} />
          </>
        )}

        {step === 3 && (
          <>
            <H3 style={{ marginBottom: 16 }}>{t("onboarding.birthDateTitle")}</H3>
            <DateField label={t("onboarding.birthDate")} mode="date" value={birthDate} onChange={setBirthDate} />
          </>
        )}

        {step === 4 && (
          <>
            <H3 style={{ marginBottom: 4 }}>{t("onboarding.birthTimeTitle")}</H3>
            <Caption style={{ marginBottom: 16 }}>{t("onboarding.birthTimeHelp")}</Caption>
            <Pressable
              onPress={() => setTimeKnown(!timeKnown)}
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
              <DateField label={t("onboarding.birthTime")} mode="time" value={birthTime} onChange={setBirthTime} />
            )}
          </>
        )}

        {step === 5 && (
          <>
            <H3 style={{ marginBottom: 4 }}>{t("onboarding.birthPlaceTitle")}</H3>
            <Caption style={{ marginBottom: 16 }}>{t("onboarding.birthPlaceHelp")}</Caption>
            <CityAutocomplete label={t("onboarding.birthPlace")} value={birthPlace?.name ?? ""} onSelect={setBirthPlace} />
          </>
        )}

        {step === 6 && (
          <>
            <H3 style={{ marginBottom: 8 }}>{t("onboarding.focusTitle")}</H3>
            <Caption style={{ marginBottom: 16 }}>{t("onboarding.focusHelp")}</Caption>
            <ChipSelect options={focusOpts} value={focus} onChange={(v) => setFocus(v as string[])} multi />
          </>
        )}

        {step === 7 && (
          <>
            <H3 style={{ marginBottom: 8 }}>{t("onboarding.questionTitle")}</H3>
            <Caption style={{ marginBottom: 16 }}>{t("onboarding.questionHelp")}</Caption>
            <Input
              label=""
              value={currentQuestion}
              onChangeText={setCurrentQuestion}
              placeholder={t("onboarding.questionPlaceholder")}
              multiline
              style={{ minHeight: 80, textAlignVertical: "top" }}
            />
          </>
        )}

        {step === 8 && (
          <>
            <H3 style={{ marginBottom: 8 }}>{t("onboarding.experienceTitle")}</H3>
            <View style={{ marginBottom: 24 }}>
              <ChipSelect options={expOpts} value={experience} onChange={(v) => setExperience(v as string)} />
            </View>
            <H3 style={{ marginBottom: 8 }}>{t("onboarding.toneTitle")}</H3>
            <Caption style={{ marginBottom: 12 }}>{t("onboarding.toneHelp")}</Caption>
            <ChipSelect options={toneOpts} value={tone} onChange={(v) => setTone(v as string)} />
          </>
        )}

        {step === 9 && (
          <>
            <H3 style={{ marginBottom: 8 }}>{t("onboarding.notifyTitle")}</H3>
            <Caption style={{ marginBottom: 16 }}>{t("onboarding.notifyHelp")}</Caption>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {hours.map((h) => (
                <Pressable
                  key={h}
                  onPress={() => setNotifyHour(h)}
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
        )}

        <View style={{ flex: 1 }} />

        <View style={{ flexDirection: "row", gap: 12 }}>
          {step > 1 && (
            <View style={{ flex: 1 }}>
              <Button variant="secondary" onPress={back}>{t("common.back")}</Button>
            </View>
          )}
          <View style={{ flex: 2 }}>
            {step === TOTAL_STEPS ? (
              <Button onPress={onFinish} loading={loading}>{t("onboarding.finish")}</Button>
            ) : (
              <Button onPress={next}>{t("common.continue")}</Button>
            )}
          </View>
        </View>

        {[2, 6, 7, 8].includes(step) && (
          <Pressable onPress={skip} style={{ alignItems: "center", marginTop: 12 }}>
            <Caption style={{ color: colors.textMute }}>{t("onboarding.skipStep")}</Caption>
          </Pressable>
        )}

        <Caption style={{ textAlign: "center", marginTop: 12, color: colors.textMute }}>{t("disclaimer")}</Caption>
      </View>
    </Screen>
  );
}
