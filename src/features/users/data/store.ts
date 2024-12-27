import { DeleteFactory } from '@/factories/deleteFactory'
import { QueryFactory } from '@/factories/filters'
import { SelectFactory } from '@/factories/select'
import { $users, deleteUserFx } from '@/features/users/data/api.ts'
import { User } from '@/features/users/data/types.ts'

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
}
