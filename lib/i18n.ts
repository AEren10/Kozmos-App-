import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import tr from "@/locales/tr.json";
import en from "@/locales/en.json";

const deviceLang = Localization.getLocales()[0]?.languageCode ?? "en";
const defaultLang = deviceLang === "tr" ? "tr" : "en";

i18n.use(initReactI18next).init({
  resources: { tr: { translation: tr }, en: { translation: en } },
  lng: defaultLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  compatibilityJSON: "v4",
});

export default i18n;
export const setLanguage = (lng: "tr" | "en") => i18n.changeLanguage(lng);
