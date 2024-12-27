import {
  Effect,
  combine,
  createEvent,
  createStore,
  sample,
  StoreWritable,
  EventCallable,
  Store,
} from 'effector'

export class SelectFactory<T, PayloadT extends string | number> {
  $selectedItems: StoreWritable<Set<PayloadT>>
  handleSelectAllEv: EventCallable<boolean>
  handleSelectOneEv: EventCallable<PayloadT>
  $selectedBulkActions: Store<boolean>
  $selectedSome: Store<boolean>
  $selectedAll: Store<boolean>

  constructor(
    $itemsArray: StoreWritable<(T & Array<{ id: PayloadT }>) | null>,
    deleteOneFx: Effect<any, any>,
    deleteManyFx?: Effect<any, any>,
    resetEvent?: EventCallable<void>,
  ) {
    this.$selectedItems = createStore<Set<PayloadT>>(new Set())
    this.handleSelectAllEv = createEvent<boolean>()
    this.handleSelectOneEv = createEvent<PayloadT>()

    if (resetEvent) {
      this.$selectedItems.reset(resetEvent)
    }

    this.$selectedBulkActions = combine(
      this.$selectedItems,
      (selectedItems) => selectedItems.size > 0,
    )

    this.$selectedSome = combine(
      this.$selectedItems,
      $itemsArray,
      (selectedItems, items) => {
        if (!items?.length) return false
        return selectedItems.size > 0 && selectedItems.size < items.length
      },
    )

    this.$selectedAll = combine(
      this.$selectedItems,
      $itemsArray,
      (selectedItems, items) => {
        if (!items?.length) return false
        return selectedItems.size === items.length
      },
    )

    sample({
      clock: this.handleSelectAllEv,
      source: [$itemsArray],
      fn: ([items], payload) => {
        if (!items) return new Set<PayloadT>()
        return payload
          ? new Set<PayloadT>([...items.map((item) => item.id)])
          : new Set<PayloadT>()
      },
      target: this.$selectedItems,
    })

    sample({
      clock: deleteOneFx.done,
      fn: (): Set<PayloadT> => new Set<PayloadT>(),
      target: this.$selectedItems,
    })

    if (deleteManyFx) {
      sample({
        clock: deleteManyFx.done,
        fn: (): Set<PayloadT> => new Set<PayloadT>(),
        target: this.$selectedItems,
      })
    }

    sample({
      clock: this.handleSelectOneEv,
      source: { selectedItems: this.$selectedItems },
      fn: ({ selectedItems }, payload) => {
        const copyState = new Set<PayloadT>(selectedItems)
        if (!copyState.has(payload)) {
          copyState.add(payload)
        } else {
          copyState.delete(payload)
        }
        return copyState
      },
      target: this.$selectedItems,
    })
  }
}
