import { $authHost, $host } from './index'

export const createItem = async ({
  fieldValues,
  fieldNames,
  collectionId,
  userId,
}: any) => {
  const { data } = await $authHost.post('api/item', {
    fieldValues,
    fieldNames,
    collectionId,
    userId,
  })
  return data
}

export const fetchItems = async () => {
  const { data } = await $host.get('api/item')
  return data
}

export const fetchCollectionItems = async (id: number) => {
  const { data } = await $host.get('api/item', {
    params: {
      collectionId: id,
    },
  })
  console.log(data)
  return data
}

export const fetchOneItem = async (id: number) => {
  const { data } = await $host.get(`api/item/${id}`)
  return data
}

export const fetchLatestItems = async () => {
  const { data } = await $host.get(`api/item/latest`)
  return data
}

export const deleteItem = async ({ id, userId }: any) => {
  const { data } = await $authHost.delete(`api/item/${id}`, {
    data: { userId },
  })
  return data
}