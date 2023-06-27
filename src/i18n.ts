import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { DateTime } from 'luxon'

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
    })

i18n.services?.formatter?.add('DATE_LONG', (value, lng, _options) => {
    const validLng: string = lng ?? 'default';
    return DateTime.fromJSDate(value).setLocale(validLng).toLocaleString(DateTime.DATE_HUGE)
})

export default i18n