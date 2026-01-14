import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import trTranslations from './locales/tr.json'
import enTranslations from './locales/en.json'

// SSR-safe language detection
const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    // Server-side: always use fallback
    return 'tr'
  }
  
  // Client-side: check localStorage first, then navigator
  try {
    const storedLang = localStorage.getItem('i18nextLng')
    if (storedLang === 'en' || storedLang === 'tr') {
      return storedLang
    }
  } catch (e) {
    // localStorage not available
  }
  
  // Fallback to navigator language
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language.startsWith('en') ? 'en' : 'tr'
  }
  
  return 'tr'
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: {
        translation: trTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'tr',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      checkWhitelist: true,
    },
  })

export default i18n
