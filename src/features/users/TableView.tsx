import {
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
} from '@mui/material'
import { useStoreMap, useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import RefreshButton from '@/components/RefreshButton.tsx'
import RemoveEl from '@/components/RemoveEl.tsx'
import FlexWrap from '@/components/StyledComponents/FlexWrap.tsx'
import TableCheckboxEl from '@/components/TableCheckboxEl.tsx'
import TableEmptyText from '@/components/TableEmptyText.tsx'
import TableSkeletons from '@/components/TableSkeletons.tsx'
import Create from '@/features/users/Create.tsx'
import { $users, getUsersFx } from '@/features/users/data/api.ts'
import { usersStarted } from '@/features/users/data/initializers.ts'
import { getComparator } from '@/features/users/data/service.tsx'
import { usersStore } from '@/features/users/data/store.ts'
import SortCell from '@/features/users/SortCell.tsx'
import TableRowEl from '@/features/users/TableRowEl.tsx'

export default function TableView() {
  const [loading, pageStarted] = useUnit([getUsersFx.pending, usersStarted])
  const [orderBy, order] = useUnit([usersStore.$orderBy, usersStore.$order])

  const users = useStoreMap({
    store: $users,
    keys: [order, orderBy],
    fn: (users, [order, orderBy]) => {
      const copyUsers = structuredClone(users)
      if (!copyUsers) return copyUsers
      copyUsers.sort(getComparator(order, orderBy))
      return copyUsers
    },
  })

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
              <SortCell property={'name'}>{t('Name')}</SortCell>
              <SortCell property={'username'}>{t('userName')}</SortCell>
              <SortCell property={'email'}>{t('Email')}</SortCell>
              <SortCell property={'phone'}>{t('Phone')}</SortCell>
              <SortCell property={'website'}>{t('Website')}</SortCell>
              <TableCell>{t('Address')}</TableCell>
              <TableCell>{t('Company')}</TableCell>
              <TableCell></TableCell>
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