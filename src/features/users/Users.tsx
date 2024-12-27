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
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import ConfirmDelete from '@/components/ConfirmDelete'
import CouldNotFindSearched from '@/components/CouldNotFindSearched'
import CreateAndDelete from '@/components/CreateAndDelete'
import { GridSkeletons } from '@/components/GridSkeletons'
import TableCheckboxEl from '@/components/TableCheckboxEl'
import TableEmptyText from '@/components/TableEmptyText'
import TableSkeletons from '@/components/TableSkeletons'
import CardEl from '@/features/users/CardEl'
import Create from '@/features/users/Create.tsx'
import { $users, deleteUserFx, getUsersFx } from '@/features/users/data/api.ts'
import { usersStore } from '@/features/users/data/store.ts'
import Query from '@/features/users/Query'
import TableRowEl from '@/features/users/TableRowEl.tsx'

export default function Users() {
  const [getUsers] = useUnit([getUsersFx])

  const { t } = useTranslation()
  const theme = useTheme()
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    getUsers({}).catch(console.error)
  }, [getUsers])

  return (
    <>
      <Box px={{ xs: 1, sm: 2 }} pt={1}>
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
  const [users, loading] = useUnit([$users, getUsersFx.pending])

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
        <Stack direction={{ xs: 'column', s: 'row' }} spacing={1}>
          <Query />
          <CreateAndDelete
            title={t('Create')}
            $selectedBulkActions={usersStore.$selectedBulkActions}
            handleOpenConfirmDeleteEv={usersStore.handleOpenConfirmDelete}
            addItemEl={<Create />}
          />
        </Stack>
      </Card>

      <CouldNotFindSearched
        length={users?.length}
        title={t('couldNotFindSearchedUsers')}
        loading={loading}
      />

      {loading ? (
        <GridSkeletons skeletonNum={2} />
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

  const { t } = useTranslation()

  return (
    <Card>
      <Stack
        direction={'row'}
        p={2}
        spacing={1}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
      >
        <Query />
        <CreateAndDelete
          title={t('Create')}
          $selectedBulkActions={usersStore.$selectedBulkActions}
          handleOpenConfirmDeleteEv={usersStore.handleOpenConfirmDelete}
          addItemEl={<Create />}
        />
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
              <TableSkeletons cellsCount={8} skeletonRowsCount={4} />
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
