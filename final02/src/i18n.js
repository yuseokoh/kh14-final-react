// i18n 설정 파일 (src/i18n.js)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const savedLanguage = localStorage.getItem('preferredLanguage') || 'ko';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ko', // 기본 언어를 설정
    supportedLngs: ['en', 'ko'],
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    debug: true, // 디버깅 활성화 (optional)
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
