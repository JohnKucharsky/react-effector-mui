import {
  createEvent,
  createStore,
  StoreWritable,
  EventCallable,
} from 'effector'

export class QueryFactory {
  $query: StoreWritable<string>
  handleQueryChangeEv: EventCallable<string>

  constructor() {
    this.$query = createStore('')
    this.handleQueryChangeEv = createEvent<string>()

    this.$query.on(this.handleQueryChangeEv, (_, payload) => payload)
  }
}
