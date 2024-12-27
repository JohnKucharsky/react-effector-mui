import { Effect } from 'effector'
import { ZodError } from 'zod'
import { ApiRouteType } from '@/common/enums'

export const logZodError = (error: unknown, route: ApiRouteType) => {
  console.error(route, (error as ZodError).message)
}

export const logEffectError = (
  route: ApiRouteType,
  effect: Effect<any, any, Error>,
) => {
  effect.failData.map((err) => console.error('effect', route, err))
}
