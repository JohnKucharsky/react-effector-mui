import { useTranslation } from 'react-i18next'
import { string } from 'yup'

export const useYupSchemaUsers = () => {
  const { t } = useTranslation()

  return {
    country: string().max(64, t('max64')).required(t('fieldRequired')),
    city: string().max(64, t('max64')).required(t('fieldRequired')),
    street: string().max(64, t('max64')),
    houseNumber: string().max(10, t('max10')),
    apartmentNumber: string().max(64, t('max64')),
    postalCode: string().max(64, t('max64')),
  }
}
