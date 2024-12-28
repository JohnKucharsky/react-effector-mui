import { useEffect } from 'react'
import {
  Box,
  Card,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import ConfirmDelete from '@/components/ConfirmDelete'
import CouldNotFindSearched from '@/components/CouldNotFindSearched'
import { GridSkeletons } from '@/components/GridSkeletons'
import RefreshButton from '@/components/RefreshButton.tsx'
import RemoveEl from '@/components/RemoveEl.tsx'
import FlexWrap from '@/components/StyledComponents/FlexWrap.tsx'
import TableCheckboxEl from '@/components/TableCheckboxEl'
import TableEmptyText from '@/components/TableEmptyText'
import TableSkeletons from '@/components/TableSkeletons'
import CardEl from '@/features/users/CardEl'
import Create from '@/features/users/Create.tsx'
import { $users, deleteUserFx, getUsersFx } from '@/features/users/data/api.ts'
import { usersStarted } from '@/features/users/data/initializers.ts'
import { usersStore } from '@/features/users/data/store.ts'
import TableRowEl from '@/features/users/TableRowEl.tsx'

export default function Users() {
  const [pageStarted] = useUnit([usersStarted])

  const { t } = useTranslation()
  const theme = useTheme()
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    pageStarted()
  }, [pageStarted])

  return (
    <>
      <Box px={{ xs: 1, sm: 2 }} pt={1} pb={2}>
        {isUpMd ? <TableView /> : <GridView />}
      </Box>
      <ConfirmDelete
        $confirmDeleteOpened={usersStore.$confirmDeleteOpened}
        $idToDelete={usersStore.$idToDelete}
        title={t('deleteWarningUsers')}
        $selectedItems={usersStore.$selectedItems}
        deleteItemFx={deleteUserFx}
        handleCloseConfirmDeleteEv={usersStore.handleCloseConfirmDelete}
      />
    </>
  )
}

const GridView = () => {
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

const TableView = () => {
  const [users, loading] = useUnit([$users, getUsersFx.pending])
  const [pageStarted] = useUnit([usersStarted])

  const { t } = useTranslation()

  return (
    <Card elevation={3}>
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

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <TableCheckboxEl
                  $selectedAll={usersStore.$selectedAll}
                  $selectedSome={usersStore.$selectedSome}
                  handleSelectAllEv={usersStore.handleSelectAllEv}
                />
              </TableCell>
              <TableCell>{t('Name')}</TableCell>
              <TableCell>{t('userName')}</TableCell>
              <TableCell>{t('Email')}</TableCell>
              <TableCell>{t('Phone')}</TableCell>
              <TableCell>{t('Website')}</TableCell>
              <TableCell>{t('Address')}</TableCell>
              <TableCell>{t('Company')}</TableCell>
            </TableRow>
          </TableHead>
          {users?.length === 0 && !loading ? (
            <TableEmptyText
              colSpan={8}
              title={t('couldNotFindSearchedUsers')}
            />
          ) : null}

          {loading ? (
            <TableBody>
              <TableSkeletons cellsCount={8} skeletonRowsCount={10} />
            </TableBody>
          ) : (
            <TableBody>
              {users?.map((item) => <TableRowEl key={item.id} user={item} />)}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Card>
  )
}
