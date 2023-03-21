import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./assets/locales/en/translation.json";
import translationFR from "./assets/locales/fr/translation.json";
import translationDE from "./assets/locales/de/translation.json";
import translationES from "./assets/locales/es/translation.json";
import translationIT from "./assets/locales/it/translation.json";
import translationPL from "./assets/locales/pl/translation.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: translationEN,
      },
      fr: {
        translation: translationFR,
      },
      de: {
        translation: translationDE,
      },
      pl: {
        translation: translationPL,
      },
      it: {
        translation: translationIT,
      },
      es: {
        translation: translationES,
      },
    },
    lng: localStorage.getItem("lang") || "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
