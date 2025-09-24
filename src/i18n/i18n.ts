import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

import enCommon from './en/common.json';
import enAuth from './en/auth.json';

import csCommon from './cs/common.json';
import csAuth from './cs/auth.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    defaultNS: 'common',
    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
      },
      cs: {
        common: csCommon,
        auth: csAuth,
      },
    },
    debug: false,
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      useSuspense: true,
    },
  })
  .catch((ex) => {
    throw new Error(ex);
  });

export default i18n;
