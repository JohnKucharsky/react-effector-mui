import { useTranslation } from 'react-i18next'
import { string } from 'yup'
import { Address } from '@/features/users/data/types.ts'

export const useYupSchemaUsers = () => {
  const { t } = useTranslation()
  return {
    name: string().min(3).max(64).required(t('fieldRequired')),
    userName: string().min(3).max(64).required(t('fieldRequired')),
    email: string().max(64, t('max64')),
    phone: string(),
    website: string().max(64, t('max64')),
    street: string().max(64, t('max64')),
    suite: string().max(64, t('max64')),
    city: string().max(64, t('max64')),
    zipcode: string().max(64, t('max64')),
    companyName: string().max(64, t('max64')),
  }
}

export const formatAddress = (address?: Address): string => {
  if (!address) return ''
  const { street, suite, city } = address

  const parts = [street, suite, city].filter(Boolean)

  return parts.join(', ')
}
