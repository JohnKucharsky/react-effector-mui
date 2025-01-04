import { type AxiosResponse } from 'axios'
import { createEffect, createStore } from 'effector'
import { z } from 'zod'
import { axiosInstance } from '@/common/axios'
import { apiRoutes } from '@/common/constants.ts'
import { logEffectError, logZodError } from '@/common/loggers.ts'
import {
  PartialUser,
  type User,
  UserSchema,
} from '@/features/users/data/types.ts'

export const $users = createStore<User[] | null>(null)

export const getUsersFx = createEffect<
  {
    id?: string
  },
  User[]
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

  return res.data
})

logEffectError(apiRoutes['/users'], getUsersFx)

export const addUserFx = createEffect<PartialUser, User>(async (data) => {
  const res = await axiosInstance.post<PartialUser, AxiosResponse<User>>(
    apiRoutes['/users'],
    data,
  )

  return res.data
})

export const editUserFx = createEffect<{ data: PartialUser; id: number }, User>(
  async (data) => {
    const res = await axiosInstance.put<PartialUser, AxiosResponse<User>>(
      `${apiRoutes['/users']}/${data.id}`,
      data.data,
    )

    return res.data
  },
)

export const deleteUserFx = createEffect<number, number>(async (id) => {
  await axiosInstance.delete<unknown, AxiosResponse<User>>(
    `${apiRoutes['/users']}/${id}`,
  )

  return id
})

$users
  .on(getUsersFx.doneData, (_, payload) => payload)
  .on(addUserFx.doneData, (state, payload) => {
    if (!state) return state
    return [payload, ...state]
  })
  .on(editUserFx.doneData, (state, payload) => {
    if (!state) return state
    return state.map((item) => (payload.id === item.id ? payload : item))
  })
  .on(deleteUserFx.doneData, (state, id) => {
    if (!state) return state
    return state.filter((item) => item.id !== id)
  })
