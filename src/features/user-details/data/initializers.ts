import { createEvent, sample } from 'effector'
import { getUserFx } from '@/features/user-details/data/api.ts'

export const userDetailedStarted = createEvent<string | undefined>()

sample({
  clock: [userDetailedStarted],
  fn: (id) => ({ id }),
  target: getUserFx,
})
