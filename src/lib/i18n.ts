import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/translations/en.json";
import hi from "@/translations/hi.json";
import te from "@/translations/te.json";

const savedLang = localStorage.getItem("agrisync-language") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    te: { translation: te },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
