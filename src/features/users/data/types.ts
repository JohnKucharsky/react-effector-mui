import { z } from 'zod'

const CompanySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
})

const GeoSchema = z.object({
  lat: z.string(),
  lng: z.string(),
})

const AddressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: GeoSchema,
})

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  phone: z.string(),
  website: z.string(),
  address: AddressSchema,
  company: CompanySchema,
})

export type User = z.infer<typeof UserSchema>

export type Address = z.infer<typeof AddressSchema>
type Company = z.infer<typeof CompanySchema>
type Geo = z.infer<typeof GeoSchema>
export type PartialUser = {
  address?: { geo?: Partial<Geo> } & Omit<Address, 'geo'>
  company?: Partial<Company>
} & Omit<User, 'address' | 'company' | 'id'>
