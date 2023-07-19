import { $authHost, $host } from './index'

export const createItem = async ({
  fieldValues,
  fieldNames,
  collectionId,
  userId,
  tags
}: any) => {
  const { data } = await $authHost.post('api/item', {
    fieldValues,
    fieldNames,
    collectionId,
    userId,
    tags
  })
  return data
}

export const fetchItems = async ({collectionId, tagId}: any) => {
  const { data } = await $host.get('api/item', {
    params: {
      collectionId,
      tagId
    },
  })
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
