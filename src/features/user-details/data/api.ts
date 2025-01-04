import { createEffect, createStore } from 'effector'
import { z } from 'zod'
import { axiosInstance } from '@/common/axios'
import { apiRoutes } from '@/common/enums'
import { logEffectError, logZodError } from '@/common/formatters'
import { Post, PostSchema } from '@/features/posts/data/types.ts'
import { type User, UserSchema } from '@/features/users/data/types.ts'

export const $user = createStore<{
  user: User
  posts: Post[]
} | null>(null)

export const getUserFx = createEffect<
  {
    id?: string
  },
  { user: User; posts: Post[] }
>(async ({ id }) => {
  const resUser = await axiosInstance.get<User[]>(apiRoutes['/users'], {
    params: {
      id: id || undefined,
    },
  })

  try {
    z.array(UserSchema).parse(resUser.data)
  } catch (e) {
    logZodError(e, apiRoutes['/users'])
  }

  const resPosts = await axiosInstance.get<Post[]>(apiRoutes['/posts'], {
    params: {
      userId: resUser.data[0].id,
    },
  })

  try {
    z.array(PostSchema).parse(resPosts.data)
  } catch (e) {
    logZodError(e, apiRoutes['/posts'])
  }

  return {
    user: resUser.data[0],
    posts: resPosts.data,
  }
})

logEffectError(apiRoutes['/users'], getUserFx)

$user.on(getUserFx.doneData, (_, payload) => payload)
