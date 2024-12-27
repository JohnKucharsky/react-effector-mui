import { Box, Card, Skeleton, Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { BackgroundBox } from '@/components/StyledComponents/FormsBackgroundAndLine'

export const GridSkeletons = ({ skeletonNum }: { skeletonNum: number }) => {
  return (
    <Grid spacing={1}>
      {Array(Math.abs(skeletonNum - 2))
        .fill(null)
        .map((_, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6 }}>
            <CardElement />
          </Grid>
        ))}
    </Grid>
  )
}

const CardElement = () => {
  return (
    <Card>
      <Box
        px={1.5}
        pt={1}
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems={'center'} spacing={1}>
          <Skeleton variant={'rounded'} height={'0.75rem'} width={'10rem'} />
        </Stack>
      </Box>
      <Box pt={0.5} px={2} pb={0.5}>
        <Box px={1} py={0.5}>
          <Skeleton variant={'rounded'} height={'1rem'} width={'8rem'} />
        </Box>
        <BackgroundBox mt={1} mb={1.5} gap={'0.75rem'}>
          <Skeleton variant={'rounded'} height={'0.8rem'} width={'9rem'} />
          <Skeleton variant={'rounded'} height={'1rem'} width={'10rem'} />
          <Skeleton variant={'rounded'} height={'1rem'} width={'10rem'} />
          <Skeleton variant={'rounded'} height={'1rem'} width={'8rem'} />
          <Skeleton variant={'rounded'} height={'0.75rem'} width={'10rem'} />
          <Skeleton variant={'rounded'} height={'1rem'} width={'8rem'} />
        </BackgroundBox>
      </Box>
    </Card>
  )
}
