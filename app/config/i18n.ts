import i18n from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import en from "locale/en.json";
import zh from "locale/zh.json";
i18n
      .use(I18nextBrowserLanguageDetector)
      .use(initReactI18next)
      .init({     
            fallbackLng:"en",
            debug: true,
            resources: {
            en: {
                  translation: en
            },
            zh:{
                  translation:zh
            }
            }
      });
export default i18n;