import { $host } from './index'

export const fetchSearchResults = async (searchText: string) => {
  const {data} = await $host.get('api/search', {
    params: {
      searchText
    },
  })
  return data
}
