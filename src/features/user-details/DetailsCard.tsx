import { useMemo } from 'react'
import {
  Box,
  BoxProps,
  Paper,
  Typography,
  TypographyProps,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import TypographySkeleton from '@/components/TypographySkeleton.tsx'
import { $user } from '@/features/user-details/data/api.ts'
import {
  boxPropsObj,
  typographyPropsObj,
} from '@/features/user-details/data/service.tsx'

export default function DetailsCard() {
  const [user] = useUnit([$user])
  const { t } = useTranslation()

  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  const typographyProps = useMemo(
    (): Record<'title' | 'paragraph' | 'paragraphTitle', TypographyProps> =>
      isDownMd ? typographyPropsObj.mobile : typographyPropsObj.desktop,
    [isDownMd],
  )

  const boxProps = useMemo(
    (): Record<'main' | 'address' | 'company', BoxProps> =>
      isDownMd ? boxPropsObj.mobile : boxPropsObj.desktop,
    [isDownMd],
  )

  return (
    <>
      <TypographySkeleton {...typographyProps.title} fontWeight={'bold'} mb={2}>
        {user?.user.name}
      </TypographySkeleton>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          direction: 'row',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'flex-start',
          overflow: 'auto',
        }}
      >
        {/*main*/}
        <Box display={'grid'} {...boxProps.main}>
          <Typography {...typographyProps.paragraphTitle}>
            {t('userName')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.user.username}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('Phone')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.user.phone}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('Email')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.user.email}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('Website')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.user.website}
          </TypographySkeleton>
        </Box>
        {/*main*/}
        {/*address*/}
        <Box display={'grid'} {...boxProps.address}>
          <Typography
            sx={{ gridColumn: 'span 2' }}
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {t('Address')}:
          </Typography>

          <Typography {...typographyProps.paragraphTitle}>
            {t('City')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.user.address.city}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('Street')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.user.address.street}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('Suite')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.user.address.suite}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('ZipCode')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.user.address.zipcode}
          </TypographySkeleton>
        </Box>
        {/*address*/}
        {/*company*/}
        <Box display={'grid'} {...boxProps.company}>
          <Typography
            sx={{ gridColumn: 'span 2' }}
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {t('Company')}:
          </Typography>

          <Typography {...typographyProps.paragraphTitle}>
            {t('companyName')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.user.company.name}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('catchPhrase')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.user.company.catchPhrase}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('bs')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.user.company.bs}
          </TypographySkeleton>
        </Box>
        {/*company*/}
      </Paper>
    </>
  )
}
