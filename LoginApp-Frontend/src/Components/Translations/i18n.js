import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import cnTranslation from './locales/cn.json';
import mlTranslation from './locales/ml.json';
import tlTranslation from './locales/tl.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
  cn: {
    translation: cnTranslation,
  },
  ml: {
    translation: mlTranslation,
  },
  tl: {
    translation: tlTranslation,
  }
};

const storedLanguage = localStorage.getItem('Lang') || 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: storedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
