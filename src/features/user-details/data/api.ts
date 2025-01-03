import { createEffect, createStore } from 'effector'
import { z } from 'zod'
import { axiosInstance } from '@/common/axios'
import { apiRoutes } from '@/common/enums'
import { logEffectError, logZodError } from '@/common/formatters'
import { type User, UserSchema } from '@/features/users/data/types.ts'

export const $user = createStore<User | null>(null)

export const getUserFx = createEffect<
  {
    id?: string
  },
  User
>(async ({ id }) => {
  const res = await axiosInstance.get<User[]>(apiRoutes['/users'], {
    params: {
      id: id || undefined,
    },
  })

  try {
    z.array(UserSchema).parse(res.data)
  } catch (e) {
    logZodError(e, apiRoutes['/users'])
  }

  return res.data[0]
})

logEffectError(apiRoutes['/users'], getUserFx)

$user.on(getUserFx.doneData, (_, payload) => payload)
