import { useState } from "react";
import { View, Text, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { NebulaBg, FadeUp } from "@/components/nebula";
import { BirthProgressHeader } from "@/components/onboarding/BirthProgressHeader";
import { BirthStepView, TOTAL_STEPS } from "@/components/birth/BirthSteps";
import { BirthNav } from "@/components/birth/BirthNav";
import { Caption } from "@/components/ui/Heading";
import { colors, fonts } from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/store";
import { setProfile } from "@/store/slices/profileSlice";
import { toast } from "@/store/slices/uiSlice";
import { upsertProfile } from "@/lib/api/users";
import { sunSignFromDate } from "@/lib/astro/sunSign";

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

  const onFinish = async () => {
    if (loading) return;
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
      relationship_status: null,
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

  const next = () => {
    const err = validate();
    if (err) return dispatch(toast({ text: err, type: "error" }));
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
    else onFinish();
  };
  const back = () => setStep((s) => Math.max(1, s - 1));
  const skip = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1));

  const stepTitles: Record<number, string> = {
    1: t("onboarding.nameTitle"),
    2: t("onboarding.genderTitle"),
    3: t("onboarding.birthDateTitle"),
    4: t("onboarding.birthTimeTitle"),
    5: t("onboarding.birthPlaceTitle"),
    6: t("onboarding.focusTitle"),
    7: t("onboarding.questionTitle"),
    8: t("onboarding.experienceTitle"),
    9: t("onboarding.notifyTitle"),
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" />
      <NebulaBg seed={5} />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 14, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          <FadeUp delay={0}>
            <BirthProgressHeader step={step} total={TOTAL_STEPS} stepLabel={stepTitles[step]} />
          </FadeUp>

          <FadeUp delay={100} style={{ marginTop: 24, marginBottom: 20 }}>
            <Text style={{ fontFamily: fonts.display, fontSize: 30, color: colors.text, lineHeight: 36 }}>
              {t("onboarding.title")}
            </Text>
          </FadeUp>

          <BirthStepView
            state={{ step, name, gender, birthDate, birthTime, timeKnown, birthPlace, focus, currentQuestion, experience, tone, notifyHour }}
            handlers={{
              setName, setGender, setBirthDate, setBirthTime, setTimeKnown,
              setBirthPlace, setFocus, setCurrentQuestion, setExperience, setTone, setNotifyHour,
            }}
            lang={lang}
          />

          <View style={{ flex: 1 }} />

          <BirthNav
            step={step}
            total={TOTAL_STEPS}
            loading={loading}
            onBack={back}
            onNext={next}
            onFinish={onFinish}
            onSkip={skip}
            skippable={[2, 6, 7, 8].includes(step)}
          />

          <Caption style={{ textAlign: "center", marginTop: 12, color: colors.textMute }}>{t("disclaimer")}</Caption>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
