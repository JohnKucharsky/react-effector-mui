import { createEvent, createStore } from 'effector'
import { DeleteFactory } from '@/factories/deleteFactory'
import { QueryFactory } from '@/factories/filters'
import { SelectFactory } from '@/factories/select'
import { $users, deleteUserFx } from '@/features/users/data/api.ts'
import { Order, SortKeys, User } from '@/features/users/data/types.ts'

const {
  $selectedItems,
  handleSelectAllEv,
  handleSelectOneEv,
  $selectedBulkActions,
  $selectedSome,
  $selectedAll,
} = new SelectFactory<User[], number>($users, deleteUserFx)

const { $query, handleQueryChangeEv } = new QueryFactory()

const {
  $confirmDeleteOpened,
  $idToDelete,
  handleCloseConfirmDelete,
  handleOpenConfirmDelete,
} = new DeleteFactory<number>()

$confirmDeleteOpened
  .on(handleCloseConfirmDelete, () => false)
  .on(handleOpenConfirmDelete, () => true)
$idToDelete.on(handleOpenConfirmDelete, (_, value) => value)

export const $order = createStore<Order>('asc')
export const $orderBy = createStore<SortKeys>('name')

export const handleRequestSortEv = createEvent<{
  property: SortKeys
  orderBy: SortKeys
}>()
$order.on(handleRequestSortEv, (state, payload) => {
  const isAsc = payload.orderBy === payload.property && state === 'asc'
  return isAsc ? 'desc' : 'asc'
})
$orderBy.on(handleRequestSortEv, (_, payload) => payload.property)

export const usersStore = {
  $selectedItems,
  handleSelectAllEv,
  handleSelectOneEv,
  $selectedBulkActions,
  $selectedSome,
  $selectedAll,
  $query,
  handleQueryChangeEv,
  handleCloseConfirmDelete,
  handleOpenConfirmDelete,
  $confirmDeleteOpened,
  $idToDelete,
  handleRequestSortEv,
  $order,
  $orderBy,
}
