import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import enMedicalTranslations from './locales/medical/en.json'
import trMedicalTranslations from './locales/medical/tr.json'
import enTravelTranslations from './locales/travel/en.json'
import trTravelTranslations from './locales/travel/tr.json'
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
    if (storedLang === 'en' || storedLang === 'tr' || storedLang === 'es' || storedLang === 'fr' || storedLang === 'ru') {
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
          ...trTravelTranslations,
          ...trMedicalTranslations,
        },
      },
      fr: {
        translation: {
          ...frVisaTranslations,
          ...trTravelTranslations,
          ...trMedicalTranslations,
        },
      },
      ru: {
        translation: {
          ...ruVisaTranslations,
          ...trTravelTranslations,
          ...trMedicalTranslations,
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