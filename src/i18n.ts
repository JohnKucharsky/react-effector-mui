import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

export const defaultNS = 'en'

i18next.use(initReactI18next).init({ fallbackLng: 'en', defaultNS })

export default i18next
