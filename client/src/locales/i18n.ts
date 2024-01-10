import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './en/translation.json';
import translationFR from './fr/translation.json';

// Les ressources de traduction
const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  }
};

i18n
  .use(LanguageDetector) // détecte la langue du navigateur
  .use(initReactI18next) // passe i18n au react-i18next
  .init({
    resources,
    fallbackLng: 'en', // langue par défaut
    interpolation: {
      escapeValue: false // réagit déjà à l'échappement
    }
  });

export default i18n;