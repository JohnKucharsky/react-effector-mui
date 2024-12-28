import { createEvent, sample } from 'effector'
import { getUsersFx } from '@/features/users/data/api'
import { usersStore } from '@/features/users/data/store'

export const usersStarted = createEvent()

sample({
  clock: [usersStore.handleQueryChangeEv, usersStarted],
  source: {
    name: usersStore.$query,
  },
  fn: (params) => params,
  target: getUsersFx,
})
