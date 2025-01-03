import { useEffect } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { $user } from '@/features/user-details/data/api.ts'
import { userDetailedStarted } from '@/features/user-details/data/initializers.ts'

export default function UserDetails() {
  const [pageStarted] = useUnit([userDetailedStarted])
  const params = useParams()

  useEffect(() => {
    pageStarted(params.userId)
  }, [pageStarted, params.userId])

  return (
    <Box px={2} py={2}>
      <Details />
    </Box>
  )
}

const Details = () => {
  const [user] = useUnit([$user])
  const { t } = useTranslation()

  return (
    <>
      <Typography variant={'h4'} fontWeight={'bold'} mb={2}>
        {user?.name}
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          direction: 'row',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'flex-start',
        }}
      >
        {/*main*/}
        <Box
          display={'grid'}
          gridTemplateColumns={'7.5rem 1fr'}
          width={'30rem'}
        >
          <Typography variant={'h6'}>{t('userName')}:</Typography>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {user?.username}
          </Typography>
          <Typography variant={'h6'}>{t('Phone')}:</Typography>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {user?.phone}
          </Typography>
          <Typography variant={'h6'}>{t('Email')}:</Typography>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {user?.email}
          </Typography>
          <Typography variant={'h6'}>{t('Website')}:</Typography>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {user?.website}
          </Typography>
        </Box>
        {/*main*/}
        {/*address*/}
        <Box
          display={'grid'}
          gridTemplateColumns={'6.5rem 1fr'}
          width={'25rem'}
        >
          <Typography
            sx={{ gridColumn: 'span 2' }}
            variant={'h5'}
            fontWeight={'bold'}
          >
            {t('Address')}:
          </Typography>

          <Typography variant={'h6'}>{t('City')}:</Typography>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {user?.address.city}
          </Typography>
          <Typography variant={'h6'}>{t('Street')}:</Typography>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {user?.address.street}
          </Typography>
          <Typography variant={'h6'}>{t('Suite')}:</Typography>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {user?.address.suite}
          </Typography>
          <Typography variant={'h6'}>{t('ZipCode')}:</Typography>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {user?.address.zipcode}
          </Typography>
        </Box>
        {/*address*/}
        {/*company*/}
        <Box display={'grid'} gridTemplateColumns={'15rem 1fr'} width={'40rem'}>
          <Typography
            sx={{ gridColumn: 'span 2' }}
            variant={'h5'}
            fontWeight={'bold'}
          >
            {t('Company')}:
          </Typography>

          <Typography variant={'h6'}>{t('companyName')}:</Typography>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {user?.company.name}
          </Typography>
          <Typography variant={'h6'}>{t('catchPhrase')}:</Typography>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {user?.company.catchPhrase}
          </Typography>
          <Typography variant={'h6'}>{t('bs')}:</Typography>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {user?.company.bs}
          </Typography>
        </Box>
        {/*company*/}
      </Paper>
    </>
  )
}
