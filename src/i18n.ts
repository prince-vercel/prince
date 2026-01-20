import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import arMedicalTranslations from './locales/medical/ar.json'
import enMedicalTranslations from './locales/medical/en.json'
import esMedicalTranslations from './locales/medical/es.json'
import frMedicalTranslations from './locales/medical/fr.json'
import ruMedicalTranslations from './locales/medical/ru.json'
import trMedicalTranslations from './locales/medical/tr.json'
import arTravelTranslations from './locales/travel/ar.json'
import enTravelTranslations from './locales/travel/en.json'
import esTravelTranslations from './locales/travel/es.json'
import frTravelTranslations from './locales/travel/fr.json'
import ruTravelTranslations from './locales/travel/ru.json'
import trTravelTranslations from './locales/travel/tr.json'
import arVisaTranslations from './locales/visa/ar.json'
import enVisaTranslations from './locales/visa/en.json'
import esVisaTranslations from './locales/visa/es.json'
import frVisaTranslations from './locales/visa/fr.json'
import ruVisaTranslations from './locales/visa/ru.json'
import trVisaTranslations from './locales/visa/tr.json'

// SSR-safe language detection
const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    // Server-side: always use fallback
    return 'tr'
  }

  // Client-side: check localStorage first, then navigator
  try {
    const storedLang = localStorage.getItem('i18nextLng')
    if (storedLang === 'en' || storedLang === 'tr' || storedLang === 'es' || storedLang === 'fr' || storedLang === 'ru' || storedLang === 'ar') {
      return storedLang
    }
  } catch (e) {
    // localStorage not available
  }

  // Fallback to navigator language
  if (typeof navigator !== 'undefined' && navigator.language) {
    const navLang = navigator.language.toLowerCase()
    if (navLang.startsWith('en')) return 'en'
    if (navLang.startsWith('es')) return 'es'
    if (navLang.startsWith('fr')) return 'fr'
    if (navLang.startsWith('ru')) return 'ru'
    if (navLang.startsWith('ar')) return 'ar'
    return 'tr'
  }

  return 'tr'
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: {
        translation: {
          ...trVisaTranslations,
          ...trTravelTranslations,
          ...trMedicalTranslations,
        },
      },
      en: {
        translation: {
          ...enVisaTranslations,
          ...enTravelTranslations,
          ...enMedicalTranslations,
        },
      },
      es: {
        translation: {
          ...esVisaTranslations,
          ...esTravelTranslations,
          ...esMedicalTranslations,
        },
      },
      fr: {
        translation: {
          ...frVisaTranslations,
          ...frTravelTranslations,
          ...frMedicalTranslations,
        },
      },
      ru: {
        translation: {
          ...ruVisaTranslations,
          ...ruTravelTranslations,
          ...ruMedicalTranslations,
        },
      },
      ar: {
        translation: {
          ...arVisaTranslations,
          ...arTravelTranslations,
          ...arMedicalTranslations,
        },
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'tr',
    debug: false,
    returnEmptyString: false,
    returnNull: false,
    returnObjects: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  })

export default i18n