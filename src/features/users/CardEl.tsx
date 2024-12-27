import { useState } from 'react'
import {
  Card,
  Dialog,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import CardControls from '@/components/Card/CardControls'
import CardBackgroundBlockItem from '@/components/CardBackgroundBlockItem'
import { BackgroundBox } from '@/components/StyledComponents/FormsBackgroundAndLine'
import { usersStore } from '@/features/users/data/store.ts'
import { type User } from '@/features/users/data/types.ts'
import Edit from '@/features/users/Edit'

export default function CardEl({ user }: { user: User }) {
  const [open, setOpen] = useState(false)

  const [handleOpenConfirmDelete] = useUnit([
    usersStore.handleOpenConfirmDelete,
  ])

  const theme = useTheme()
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation()

  return (
    <>
      <Dialog
        fullScreen={isDownSm}
        fullWidth
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Edit handleEditClose={() => setOpen(false)} initialValues={user} />
      </Dialog>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card>
          <Stack
            px={1.5}
            pt={1.5}
            direction={'row'}
            justifyContent={'space-between'}
          >
            <Typography variant="h4">{user.name}</Typography>

            <CardControls
              handleEditOpen={() => setOpen(true)}
              handleOpenConfirmDelete={() => handleOpenConfirmDelete(user.id)}
              square
            />
          </Stack>

          <BackgroundBox m={1}>
            <CardBackgroundBlockItem title={t('Name')} text={user.name} />
            <CardBackgroundBlockItem
              title={t('userName')}
              text={user.username}
            />

            <Stack direction={'row'} spacing={3}>
              <CardBackgroundBlockItem title={t('Email')} text={user.email} />

              <CardBackgroundBlockItem title={t('Phone')} text={user.phone} />
              <CardBackgroundBlockItem
                title={t('Website')}
                text={user.website}
              />
            </Stack>
          </BackgroundBox>
        </Card>
      </Grid>
    </>
  )
}
