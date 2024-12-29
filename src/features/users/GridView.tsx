import { Card, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import CouldNotFindSearched from '@/components/CouldNotFindSearched.tsx'
import { GridSkeletons } from '@/components/GridSkeletons.tsx'
import RefreshButton from '@/components/RefreshButton.tsx'
import RemoveEl from '@/components/RemoveEl.tsx'
import FlexWrap from '@/components/StyledComponents/FlexWrap.tsx'
import CardEl from '@/features/users/CardEl.tsx'
import Create from '@/features/users/Create.tsx'
import { $users, getUsersFx } from '@/features/users/data/api.ts'
import { usersStarted } from '@/features/users/data/initializers.ts'
import { usersStore } from '@/features/users/data/store.ts'

export default function GridView() {
  const [users, loading, pageStarted] = useUnit([
    $users,
    getUsersFx.pending,
    usersStarted,
  ])

  const { t } = useTranslation()

  return (
    <>
      <Card
        elevation={2}
        sx={{
          p: { xs: 1, s: 1.5 },
          mb: 2,
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          p={2}
          spacing={1}
        >
          <FlexWrap gap={1} width={'100%'}>
            <Typography variant={'h5'} fontWeight={'bold'}>
              {t('Users')}
            </Typography>
            <RefreshButton onRefresh={pageStarted} loading={loading} />
          </FlexWrap>

          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <RemoveEl
              $selectedBulkActions={usersStore.$selectedBulkActions}
              handleOpenConfirmDeleteEv={usersStore.handleOpenConfirmDelete}
            />
            <Create />
          </Stack>
        </Stack>
      </Card>

      <CouldNotFindSearched
        length={users?.length}
        title={t('couldNotFindSearchedUsers')}
        loading={loading}
      />

      {loading ? (
        <GridSkeletons skeletonNum={4} />
      ) : (
        <Grid container spacing={1}>
          {users?.map((item) => <CardEl key={item.id} user={item} />)}
        </Grid>
      )}
    </>
  )
}