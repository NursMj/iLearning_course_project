import { fetchTopics } from '../http/topicsApi'
import { fetchCurrent, fetchData } from '../store/collectionsReducer'
import { fetchAllItems } from '../store/itemsReducer'
import { setTopics } from '../store/topicsReducer'

export function refreshCollections(dispatch: any) {
  dispatch(fetchData() as any)
}

export function refreshCurrentCollection(dispatch: any, id: number) {
  dispatch(fetchCurrent(id) as any)
}

export function refreshItems(dispatch: any) {
  dispatch(fetchAllItems() as any)
}

export function refreshTopics(dispatch: any) {
  fetchTopics().then((data) => dispatch(setTopics(data)))
}
