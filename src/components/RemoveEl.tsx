import { EventCallable, Store } from 'effector'
import { useUnit } from 'effector-react'
import DeleteSelectedItems from '@/components/DeleteSelectedItems'

export default function RemoveEl<T>({
  $selectedBulkActions,
  handleOpenConfirmDeleteEv,
}: {
  $selectedBulkActions: Store<boolean>
  handleOpenConfirmDeleteEv: EventCallable<T | null>
}) {
  const [selectedBulkActions, handleOpenConfirmDelete] = useUnit([
    $selectedBulkActions,
    handleOpenConfirmDeleteEv,
  ])

  return (
    <>
      {selectedBulkActions && (
        <DeleteSelectedItems onClick={() => handleOpenConfirmDelete(null)} />
      )}
    </>
  )
}
