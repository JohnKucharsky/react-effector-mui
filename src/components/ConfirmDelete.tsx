import { Effect, EventCallable, Store } from 'effector'
import { useUnit } from 'effector-react'
import ConfirmDeleteUI from '@/components/ConfirmDeleteUI'

export default function ConfirmDelete<T>({
  $confirmDeleteOpened,
  $idToDelete,
  handleCloseConfirmDeleteEv,
  deleteItemFx,
  $selectedItems,
  title,
}: {
  $confirmDeleteOpened: Store<boolean>
  $idToDelete: Store<T | null>
  handleCloseConfirmDeleteEv: EventCallable<void>
  deleteItemFx: Effect<T, any>
  $selectedItems: Store<Set<T>>
  title: string
}) {
  const [
    confirmDeleteOpened,
    id,
    handleCloseConfirmDelete,
    deleteItem,
    selectedItems,
  ] = useUnit([
    $confirmDeleteOpened,
    $idToDelete,
    handleCloseConfirmDeleteEv,
    deleteItemFx,
    $selectedItems,
  ])

  const handleDeleteCompleted = async () => {
    handleCloseConfirmDelete()
    try {
      if (id) {
        await deleteItem(id)
      } else {
        for await (const id of selectedItems) {
          await deleteItem(id)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <ConfirmDeleteUI
      openConfirmDelete={confirmDeleteOpened}
      closeConfirmDelete={handleCloseConfirmDelete}
      handleDeleteCompleted={handleDeleteCompleted}
      deleteWarningText={title}
    />
  )
}
