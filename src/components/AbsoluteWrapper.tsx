import { PropsWithChildren } from 'react'
import { Box } from '@mui/material'

export default function AbsoluteWrapper({
  children,
  topInHalfRem,
  rightInHalfRem,
}: PropsWithChildren<{ topInHalfRem: number; rightInHalfRem: number }>) {
  return (
    <Box
      position={'absolute'}
      zIndex={999}
      top={topInHalfRem * 8}
      right={rightInHalfRem * 8}
    >
      {children}
    </Box>
  )
}
