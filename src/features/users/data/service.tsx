import { Address } from '@/features/users/data/types.ts'

export const useYupSchemaUsers = () => {
  return {}
}

export const formatAddress = (address: Address) => {
  return `${address.street}, ${address.suite}, ${address.city}`
}
