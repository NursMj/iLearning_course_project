import { fetchTopics } from '../http/topicsApi'
import { fetchData } from '../store/collectionsReducer'
import { setTopics } from '../store/topicsReducer'

export function refreshCollections(dispatch: any) {
    dispatch(fetchData() as any)
}

export function refreshTopics(dispatch: any) {
  fetchTopics().then((data) => dispatch(setTopics(data)))
}
