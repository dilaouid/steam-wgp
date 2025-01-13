import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { MODE } from '@core/environment';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: MODE === 'development',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: [
      "global/navbar",
      "global/footer",
      'global/toast',

      'pages/steamders',
      'pages/steamder',
      'pages/homepage',
      "page/login",
      "page/library",
    ],
  });

export default i18n;