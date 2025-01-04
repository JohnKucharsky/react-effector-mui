import { useEffect } from 'react'
import { Box } from '@mui/material'
import { useUnit } from 'effector-react'
import { useParams } from 'react-router'
import { userDetailedStarted } from '@/features/user-details/data/initializers.ts'
import DetailsCard from '@/features/user-details/DetailsCard.tsx'
import Posts from '@/features/user-details/Posts.tsx'

export default function UserDetails() {
  const [pageStarted] = useUnit([userDetailedStarted])
  const params = useParams()

  useEffect(() => {
    pageStarted(params.userId)
  }, [pageStarted, params.userId])

  return (
    <Box px={{ xs: 1, md: 2 }} py={2}>
      <DetailsCard />
      <Posts mt={2} />
    </Box>
  )
}
