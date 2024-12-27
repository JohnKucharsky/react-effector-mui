import {
  createEvent,
  createStore,
  StoreWritable,
  EventCallable,
} from 'effector'

export class DeleteFactory<T> {
  $confirmDeleteOpened: StoreWritable<boolean>
  $idToDelete: StoreWritable<T | null>
  handleCloseConfirmDelete: EventCallable<void>
  handleOpenConfirmDelete: EventCallable<T | null>

  constructor() {
    this.$confirmDeleteOpened = createStore(false)
    this.$idToDelete = createStore<T | null>(null)

    this.handleCloseConfirmDelete = createEvent()
    this.handleOpenConfirmDelete = createEvent<T | null>()

    this.$confirmDeleteOpened
      .on(this.handleCloseConfirmDelete, () => false)
      .on(this.handleOpenConfirmDelete, () => true)
    this.$idToDelete.on(this.handleOpenConfirmDelete, (_, value) => value)
  }
}
