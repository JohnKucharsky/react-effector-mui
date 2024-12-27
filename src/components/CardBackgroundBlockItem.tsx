import { ReactElement } from 'react'
import { Box, Typography } from '@mui/material'

export default function CardBackgroundBlockItem({
  title,
  text,
}: {
  title?: string | null
  text?: string | ReactElement | null | number
}) {
  if (!text) return null
  if (typeof text === 'string' && !text.trim()) return null

  return (
    <Box>
      <Typography fontSize={'12px'} variant={'subtitle2'}>
        {title || ''}
      </Typography>
      <Typography
        sx={{ whiteSpace: 'pre-line' }}
        fontSize={'1rem'}
        fontWeight={600}
      >
        {text}
      </Typography>
    </Box>
  )
}
