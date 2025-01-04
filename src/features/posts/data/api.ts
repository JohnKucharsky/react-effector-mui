import { createEffect, createStore } from 'effector'
import { z } from 'zod'
import { axiosInstance } from '@/common/axios'
import { apiRoutes } from '@/common/enums'
import { logEffectError, logZodError } from '@/common/formatters'
import {
  Comment,
  CommentSchema,
  Post,
  PostSchema,
} from '@/features/posts/data/types.ts'

export const $posts = createStore<Post[] | null>(null)
export const $comments = createStore<Comment[] | null>(null)

export const getPostsFx = createEffect<
  {
    id?: string
    userId?: string
  },
  Post[]
>(async ({ id, userId }) => {
  const res = await axiosInstance.get<Post[]>(apiRoutes['/posts'], {
    params: {
      userId: userId || undefined,
      id: id || undefined,
    },
  })

  try {
    z.array(PostSchema).parse(res.data)
  } catch (e) {
    logZodError(e, apiRoutes['/posts'])
  }

  return res.data
})

logEffectError(apiRoutes['/posts'], getPostsFx)

export const getCommentsFx = createEffect<
  {
    postId?: string
  },
  Comment[]
>(async ({ postId }) => {
  const res = await axiosInstance.get<Comment[]>(apiRoutes['/comments'], {
    params: {
      postId: postId || undefined,
    },
  })

  try {
    z.array(CommentSchema).parse(res.data)
  } catch (e) {
    logZodError(e, apiRoutes['/comments'])
  }

  return res.data
})

logEffectError(apiRoutes['/comments'], getCommentsFx)

$posts.on(getPostsFx.doneData, (_, payload) => payload)
$comments.on(getCommentsFx.doneData, (_, payload) => payload)
