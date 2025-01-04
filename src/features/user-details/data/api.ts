import { createEffect, createStore } from 'effector'
import { z } from 'zod'
import { axiosInstance } from '@/common/axios'
import { apiRoutes } from '@/common/constants.ts'
import { groupBy } from '@/common/helpers.ts'
import { logEffectError, logZodError } from '@/common/loggers.ts'
import {
  CommentType,
  CommentSchema,
  Post,
  PostSchema,
} from '@/features/user-details/data/types.ts'
import { type User, UserSchema } from '@/features/users/data/types.ts'

export const $user = createStore<{
  user: User
  posts: Post[]
} | null>(null)
export const $comments = createStore<Record<string, CommentType[]> | null>(null)

export const getCommentsFx = createEffect<
  unknown,
  Record<string, CommentType[]>
>(async () => {
  const res = await axiosInstance.get<CommentType[]>(apiRoutes['/comments'])

  try {
    z.array(CommentSchema).parse(res.data)
  } catch (e) {
    logZodError(e, apiRoutes['/comments'])
  }

  return groupBy(res.data, (comment) => comment.postId)
})

logEffectError(apiRoutes['/comments'], getCommentsFx)

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
$comments.on(getCommentsFx.doneData, (_, payload) => payload)
