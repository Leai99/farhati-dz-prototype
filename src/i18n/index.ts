import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ar from '../locales/ar.json'
import fr from '../locales/fr.json'
import en from '../locales/en.json'

export type AppLanguage = 'ar' | 'fr' | 'en'

export const SUPPORTED_LANGUAGES: AppLanguage[] = ['ar', 'fr', 'en']
const DEFAULT_LANGUAGE: AppLanguage = 'ar'
const STORAGE_KEY = 'farhati-dz:lang'

const RTL_LANGUAGES: AppLanguage[] = ['ar']

/**
 * Each locale JSON's top-level keys (common, home, explore, mockData, …)
 * double as i18next namespaces — one screen/concern per key, per the
 * "organized by namespace, not one giant flat file" requirement — while
 * still shipping as a single resource file per language, matching the
 * literal src/locales/{ar,fr,en}.json layout that was asked for.
 */
const resources = { ar, fr, en }
const namespaces = Object.keys(ar)

function readStoredLanguage(): AppLanguage {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && (SUPPORTED_LANGUAGES as string[]).includes(stored)) {
      return stored as AppLanguage
    }
  } catch {
    // localStorage unavailable (private browsing, etc.) — fall back silently.
  }
  return DEFAULT_LANGUAGE
}

/** Applies the `<html dir lang>` attributes for the given language. Kept as
 * its own function so both the initial (pre-render) load and every later
 * switch go through the exact same logic — no drift between the two. */
function applyDocumentDirection(lng: AppLanguage) {
  document.documentElement.dir = RTL_LANGUAGES.includes(lng) ? 'rtl' : 'ltr'
  document.documentElement.lang = lng
}

const initialLanguage = readStoredLanguage()
// Set direction synchronously, before the first React render, so a reload
// on French/English never flashes the Arabic RTL layout first.
applyDocumentDirection(initialLanguage)

i18n.use(initReactI18next).init({
  resources,
  ns: namespaces,
  defaultNS: 'common',
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false }, // React already escapes.
  returnEmptyString: false,
})

/** Switches the active language app-wide, persists the choice (consistent
 * with how Favorites already persists to localStorage), and updates the
 * document direction/lang attributes. This is the one place all three steps
 * happen together, so a caller can never update one without the others. */
export function setLanguage(lng: AppLanguage) {
  i18n.changeLanguage(lng)
  applyDocumentDirection(lng)
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    // Best-effort persistence only — a failed write shouldn't block switching.
  }
}

export default i18n
