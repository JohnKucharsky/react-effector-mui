import { useMemo } from 'react'
import { avataaars } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { Avatar, ListItemAvatar } from '@mui/material'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { generateRandomString } from '@/features/user-details/data/service.tsx'
import { CommentType } from '@/features/user-details/data/types.ts'

export default function Comment({
  comment,
  last,
}: {
  comment: CommentType
  last: boolean
}) {
  const avatar = useMemo(() => {
    return createAvatar(avataaars, {
      seed: generateRandomString(),
      size: 128,
    }).toDataUri()
  }, [])

  return (
    <>
      <ListItem disablePadding alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={comment.email} src={avatar} />
        </ListItemAvatar>
        <ListItemText primary={comment.name} secondary={comment.body} />
      </ListItem>
      {!last && <Divider variant="inset" component="li" />}
    </>
  )
}
