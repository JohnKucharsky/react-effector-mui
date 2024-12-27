import { Box, Typography } from '@mui/material'

export default function CardItem({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <Box>
      <Typography variant={'caption'} lineHeight={'normal'}>
        {title}
      </Typography>
      <Typography sx={{ whiteSpace: 'pre-line' }} variant={'h6'}>
        {text}
      </Typography>
    </Box>
  )
}
