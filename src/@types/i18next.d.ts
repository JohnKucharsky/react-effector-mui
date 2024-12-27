import Resources from '@/@types/resources.d.ts'
import { defaultNS } from '@/i18n.ts'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: Resources
  }
}
