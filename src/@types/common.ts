import { type AxiosError } from 'axios'
import { z } from 'zod'

export type AxiosErrorType = AxiosError<{
  message: string
  error: string
  statusCode: number
}>

export const TimeStampsAndIdSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
})

export const PaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total_count: z.number(),
  total_pages: z.number(),
})
